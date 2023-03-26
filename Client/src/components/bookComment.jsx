import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import {
  addComment,
  updateCommentCounter,
  updateCommentReplies,
} from "../redux/comments";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {getCommentDate,resizeCommentText} from "../services/comments-utils"

function BookComment(props) {
  BookComment.prototype = {
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,

    addComment: PropTypes.func.isRequired,
    updateCommentCounter: PropTypes.func.isRequired,
    updateCommentReplies: PropTypes.func.isRequired,
  };

  const [newComment, setNewComment] = useState("");

  const [showReplies, setShowReplies] = useState([]);
  const [reply, setReply] = useState("");
  const [isReply, setIsReply] = useState([]);
   const [innerWidth, setInnerWidth] = useState(
     window.innerWidth
    );

  const { isAuthenticated, username, bookId, userId, comments, users } = props;

// Resize event listner
    window.addEventListener("resize", function () {
        setInnerWidth(window.innerWidth);
        return window.innerWidth;
      });


   // Textarea overflow event
    var tx = document.getElementsByTagName("textarea");
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
  

  function OnInput(e) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  //

  const getBookComments = (id, comments) => {
    const bookComments = comments.filter((comment) => comment.book?._id === id);
    // setBookComments(bookComments);
    return bookComments;
  };

  const mapToUserName = (userId, users) => {
    const user = users.filter((user) => user._id === userId);
    return user[0]?.username;
  };


  const handleSendCommentButton = (comment) => {
    if (!isAuthenticated)
      return toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    if (!newComment) return toast.error("The comment field is empty.");
    else {
      let commentObject = {};
      commentObject.comment = comment;
      commentObject.userId = userId;
      commentObject.bookId = bookId;
      props.addComment(commentObject);
    }

     // clear textarea
        const commentTextarea = document.getElementById("commentInput");
        commentTextarea.value = "";
  };

  const handleReplyButton = (index) => {
    if (!isAuthenticated)
      toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    else {
      let array = [...isReply];
      array[index] = true;
      setIsReply(array);
    }
  };

  const handleCancelButton = (index) => {
    if (!isAuthenticated)
      toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    else {
      let array = [...isReply];
      array[index] = false;
      setIsReply(array);
    }
  };

  const handleCounter = async (comment, id, type) => {
    if (!isAuthenticated)
      toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    else {
      // Copy from comment Object with spread operator
      let tempComment = { ...comment };

      let submitter_like_list = [...tempComment.like_submitter];
      let submitter_dislike_list = [...tempComment.dislike_submitter];

      // get like and dislike submitter index
      const likeIndex = submitter_like_list.findIndex(
        (element) => element === username
      );
      const dislikeIndex = submitter_dislike_list.findIndex(
        (element) => element === username
      );
      // Logic for increment/decrement like/dislike counter
      if (type === "increment") {
        if (likeIndex === -1) {
          submitter_like_list.push(username);
          tempComment.like_counter++;

          if (dislikeIndex !== -1) {
            submitter_dislike_list.splice(dislikeIndex, 1);
            tempComment.dislike_counter--;
            if (tempComment.dislike_counter === 0) {
              window.location.reload();
            }
          }
        } else {
          submitter_like_list.splice(likeIndex, 1);
          tempComment.like_counter--;
          if (tempComment.like_counter === 0) {
            window.location.reload();
          }
        }
      }
      if (type === "decrement") {
        if (dislikeIndex === -1) {
          submitter_dislike_list.push(username);
          tempComment.dislike_counter++;

          if (likeIndex !== -1) {
            submitter_like_list.splice(likeIndex, 1);
            tempComment.like_counter--;
            if (tempComment.like_counter === 0) {
              window.location.reload();
            }
          }
        } else {
          submitter_dislike_list.splice(dislikeIndex, 1);
          tempComment.dislike_counter--;
          if (tempComment.dislike_counter === 0) {
            window.location.reload();
          }
        }
      }

      // Execution part
      tempComment.like_submitter = submitter_like_list;
      tempComment.dislike_submitter = submitter_dislike_list;
      await props.updateCommentCounter(tempComment, id);
    }
    // window.location.reload();
  };

  const handleSendButton = async (comment, id, submitter, index) => {
    if (!reply) toast.error("The reply field is empty.");
    else {
      let tempComment = { ...comment };
      let replyObject = { submitter, body: reply };
      let replies = [...tempComment.comment_replies];

      replies.push(replyObject);
      tempComment.comment_replies = replies;
      await props.updateCommentReplies(tempComment, id);
      // Hide reply input

      let array = [...isReply];
      array[index] = false;
      setIsReply(array);
    }
    // window.location.reload();
  };

  const handleShowReplies = (index) => {
    let array = [...showReplies];
    array[index] = !array[index];
    setShowReplies(array);
  };

  const onChangeComment = (e) => {
    setNewComment(e.currentTarget.value.replace(".", ".\n"));
  };

  const onChangeReply = (e) => {
    setReply(e.currentTarget.value.replace(".", ".\n"));
  };

  const handleCounterButtonColor = (list) => {
    const found = list?.findIndex((element) => element === username);
    if (found === -1) return "like";
    else return "selectedLike";
  };

  useEffect(() => {
    getBookComments(bookId, comments);
  }, [comments]);

  return (
    <React.Fragment>
      <div className="book__comments">
        <InputGroup className="comment__add">
          <FormControl
            id="commentInput"
            as="textarea"
            rows={4}
            placeholder="Add your comment..."
            aria-label="Add your reply"
            aria-describedby="basic-addon2"
            onChange={onChangeComment}
          />
        </InputGroup>
        <Button
          className="comment__button"
          variant="outline-secondary"
          onClick={() => handleSendCommentButton(newComment)}
        >
          Send
        </Button>
        <div className="bookComments">
          {getBookComments(bookId, comments).map((comment, index) => (
            <div key={comment._id} className="book__comment">
              <div className="comment__header">
                <strong className="comment__submitter">
                  {mapToUserName(comment.user?._id, users)}
                </strong>
                <p className="comment__date">
                  {getCommentDate(comment.created_at)}
                </p>
              </div>
              <p style={{ whiteSpace: "pre" }}>{resizeCommentText(comment.comment, innerWidth)}</p>
              <div className="comment__reactions">
                <i
                  className={`fa fa-thumbs-up ${handleCounterButtonColor(
                    comment.like_submitter
                  )}`}
                  onClick={() =>
                    handleCounter(comment, comment._id, "increment")
                  }
                >
                  {comment.like_counter}
                </i>
                <i
                  className={`fa fa-thumbs-down ${handleCounterButtonColor(
                    comment.dislike_submitter
                  )}`}
                  onClick={() =>
                    handleCounter(comment, comment._id, "decrement")
                  }
                >
                  {comment.dislike_counter}
                </i>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => handleReplyButton(index)}
                >
                  Reply
                </Button>
              </div>
              {isReply[index] && (
                <div className="comment__reply">
                  <input
                    className="comment__reply__input"
                    placeholder="Add your reply"
                    aria-label="Add your reply"
                    aria-describedby="basic-addon2"
                    onChange={onChangeReply}
                  />

                  <div className="comment__reply_buttons">
                    <Button
                      variant="outline-dark"
                      onClick={() => handleCancelButton(index)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        handleSendButton(comment, comment._id, username, index)
                      }
                    >
                      Send
                    </Button>
                  </div>
                </div>
              )}
              <div
                className="comment__showReplies"
                onClick={() => handleShowReplies(index)}
              >
                {showReplies[index] ? (
                  <React.Fragment>
                    <i className="fa fa-sort-up"></i>
                    <p>Hide replies</p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i className="fa fa-sort-down"></i>
                    <p>Show replies</p>
                  </React.Fragment>
                )}
              </div>

              <div className="comment__replies">
                {showReplies[index] &&
                  comment.comment_replies?.map((reply, index) => (
                    <div key={index} className="comment__reply">
                      <strong>{reply.submitter}</strong>
                      <p
                        className="comment__reply__p"
                        style={{ whiteSpace: "pre" }}
                      >
                       {resizeCommentText(
                                reply.body,
                                innerWidth
                              )}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  users: state.users.users,
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  userId: state.auth.user?._id,
});

export default connect(mapStateToProps, {
  addComment,
  updateCommentCounter,
  updateCommentReplies,
})(BookComment);

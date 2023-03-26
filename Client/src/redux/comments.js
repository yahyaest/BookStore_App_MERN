import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { tokenConfig } from "./auth";

const apiEndpoint = "/comments";

const slice = createSlice({
  name: "comments",
  initialState: { comments: [] },
  reducers: {
    commentsloaded: (comments, action) => {
      comments.comments = action.payload;
    },
    // commentloaded: (comments, action) => {
    //   const index = comments.findIndex((comment) => comment.id === action.id);
    //   comments[index] = action.payload;
    // },
    commentAdded: (comments, action) => {
      comments.comments.push(action.payload);
    },
    // commentRemoved: (comments, action) => {
    //   const index = comments.findIndex((comment) => comment.id === action.id);
    //   comments.splice(index, 1);
    // },
    commentUpdated: (comments, action) => {
      const index = comments.comments.findIndex(
        (comment) => comment._id === action.id
      );
      let comment = { ...comments.comments[index] };

      // For like_counter and dislike_counter, the value check with typeof to avoid getting false if the counter is 0
      comment.like_counter =
        typeof action.payload.$set.like_counter === "number"
          ? action.payload.$set.like_counter
          : comment.like_counter;

      comment.like_submitter = action.payload.$set.like_submitter
        ? action.payload.$set.like_submitter
        : comment.like_submitter;

      comment.dislike_counter =
        typeof action.payload.$set.dislike_counter === "number"
          ? action.payload.$set.dislike_counter
          : comment.dislike_counter;

      comment.dislike_submitter = action.payload.$set.dislike_submitter
        ? action.payload.$set.dislike_submitter
        : comment.dislike_submitter;

      comment.comment_replies = action.payload.$set.comment_replies
        ? action.payload.$set.comment_replies
        : comment.comment_replies;

      comments.comments[index] = comment;
    },
  },
});

console.log(slice);

export const { commentAdded, commentloaded, commentRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadComments = () => (dispatch) => {
  http
    .get(apiEndpoint)
    .then((res) => {
      dispatch({
        type: slice.actions.commentsloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addComment = (comment) => (dispatch, getState) => {
  http
    .post(apiEndpoint, comment, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.commentAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateCommentCounter = (comment, id) => (dispatch, getState) => {
  const { like_counter, like_submitter, dislike_counter, dislike_submitter } =
    comment;

  http
    .patch(
      `${apiEndpoint}/${id}/`,
      {
        like_counter,
        like_submitter,
        dislike_counter,
        dislike_submitter,
      },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: slice.actions.commentUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const updateCommentReplies = (comment, id) => (dispatch, getState) => {
  const { comment_replies } = comment;

  http
    .patch(
      `${apiEndpoint}/${id}/`,
      {
        comment_replies,
      },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: slice.actions.commentUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

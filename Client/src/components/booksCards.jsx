import React from "react";
import Card from "react-bootstrap/Card";

function booksCards(props) {
  const { booksList, user } = props;
  return (
    <div className="books__cards">
      {booksList?.map((book, index) => (
        <Card key={book._id} className="book__card" >
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_ROOT_URL}/${book.image}`}
            alt={book.name}
            onClick={() => props.goToBookPage(book._id)}
          />
          <Card.Body>
            <Card.Title>{book.name}</Card.Title>

            <Card.Text>{book.author}</Card.Text>
            <Card.Text>Rate : {book.rate} </Card.Text>
            <Card.Text>
              <strong>{book.price} $</strong>
            </Card.Text>
            <i
              className={
                props.CheckBookIsLiked(book) ? "fa fa-heart" : "fa fa-heart-o"
              }
              onClick={() => {
                props.handleFavouriteIcon(user?._id, index, book);
              }}
            ></i>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default booksCards;

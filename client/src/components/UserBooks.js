import React from 'react';
import { useLocation } from 'react-router-dom';

function UserBooks() {
  const {state} = useLocation();
  console.log(state);

  return (
    <div className="container">
      <h2>Welcome, {state.username}!</h2>
      <div className="row">
        { state.books.length>0 ? state.books.map(book => (
          <div key={book.bookId} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.bookname}</h5>
                <p className="card-text">Quantity: {book.quantity}</p>
                <p className="card-text">Date of Issue: {book.dateOfIssue}</p>
                <a href={book.link} className="btn btn-primary mt-auto" target="_blank" rel="noreferrer">Read</a>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        )):(<h2>no books !!!</h2>)}
      </div>
    </div>
  );
}

export default UserBooks;

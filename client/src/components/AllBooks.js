import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin-api/all-books');
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const addDelete = async (formData) => {
    try {
      const { username, action, book } = formData;
      console.log("FORM DATA : ",formData)
      const parsedBook = JSON.parse(book);
      delete parsedBook._id;

      let res;
      if (action === "add") {
        res = await axios.post('http://localhost:4000/admin-api/assign-book', { ...parsedBook, username });
      } else if (action === "delete") {
        res = await axios.post('http://localhost:4000/admin-api/retrieve-book', parsedBook);
      }
      alert(res.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Books</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">


        {books.length > 0 ? books.map(book => (
          <div key={book._id} className="col">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{book.bookname}</h5>
                <p className="card-text">Book ID: {book.bookId}</p>
                <p className="card-text">Quantity: {book.quantity}</p>
              </div>

              <div>
                <form onSubmit={handleSubmit(addDelete)} className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" {...register('username', { required: true })} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label me-3">Action:</label>
                    <div className="form-check form-check-inline">
                      <input type="radio" className="form-check-input" id="addOption" value="add" {...register("action")} />
                      <label htmlFor="addOption" className="form-check-label">Add</label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input type="radio" className="form-check-input" id="deleteOption" value="delete" {...register("action")} />
                      <label htmlFor="deleteOption" className="form-check-label">Delete</label>
                    </div>
                  </div>

                  <input type="hidden" {...register('book')} value={JSON.stringify(book)} />

                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>

            </div>
          </div>
        )) : (<h2>No books available!</h2>)}
      </div>
    </div>
  );
}

export default AllBooks;

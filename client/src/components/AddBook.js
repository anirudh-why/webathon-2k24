import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

function AddBook() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.dateOfIssue = new Date();
    console.log(data);
    let res=await axios.post('http://localhost:4000/admin-api/new-book',data);
    alert(res.data.message);
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Add Book</h2>
      <form className='w-50 m-auto' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="bookId" className="form-label">Book ID:</label>
          <input type="text" className="form-control" {...register('bookId', { required: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="bookname" className="form-label">Book Name:</label>
          <input type="text" className="form-control" {...register('bookname', { required: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input type="number" className="form-control" {...register('quantity', { required: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Link:</label>
          <input type="text" className="form-control" {...register('link', { required: true })} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  );
}

export default AddBook;

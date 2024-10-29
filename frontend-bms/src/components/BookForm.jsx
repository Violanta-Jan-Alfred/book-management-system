import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const BookForm = ({ bookData, onChange }) => {
  return (
    <div>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Published Year</label>
        <input
          type="number"
          name="published_year"
          value={bookData.published_year}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Genre</label>
        <input
          type="text"
          name="genre"
          value={bookData.genre}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <textarea
          name="description"
          value={bookData.description}
          onChange={onChange}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default BookForm;

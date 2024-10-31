import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const BookForm = ({ bookData, onChange }) => {
  const [errors, setErrors] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: !value.trim() ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '',
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: '',  // Clear error on focus
    }));
  };

  return (
    <div>
      {['title', 'author', 'published_year', 'genre', 'description'].map((field) => (
        <div className="mb-3" key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          {field === 'description' ? (
            <textarea
              name={field}
              value={bookData[field] || ''}
              onChange={onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            />
          ) : (
            <input
              type={field === 'published_year' ? 'number' : 'text'}
              name={field}
              value={bookData[field] || ''}
              onChange={onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            />
          )}
          {errors[field] && (
            <div className="invalid-feedback" style={{ fontSize: '0.7em', transition: 'opacity 0.3s', opacity: errors[field] ? 1 : 0 }}>
              {errors[field]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookForm;

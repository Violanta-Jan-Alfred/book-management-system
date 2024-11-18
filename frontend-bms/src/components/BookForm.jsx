import React, { useState } from 'react';

const BookForm = ({ bookData, onChange, onCancel }) => {
  const [errors, setErrors] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  const handleBlur = (e) => { // handles the loosing of focus on the field
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: !value.trim() ? `${name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')} is required` : '',
    }));
  };

  const handleFocus = (e) => { // if it gains focus
    const { name } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: '', // Clear error on focus
    }));
  };

  return (
    <div>
      {['title', 'author', 'published_year', 'genre', 'description'].map((field) => ( //map creates the fields for each name here dynamically
        <div className="mb-3" key={field}>
          <label>
            {field
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </label>
          {field === 'description' ? ( // if its a description make it a textarea
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
              type={field === 'published_year' ? 'number' : 'text'} // if its a published year make it a number else just make it a text
              name={field}
              value={bookData[field] || ''}
              onChange={onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            />
          )}
          {errors[field] && ( //if a field loose focus it shows that it is required below the field
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

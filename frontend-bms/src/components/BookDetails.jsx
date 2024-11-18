import React from 'react';
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const BookDetails = ({ book, onEdit, onDelete }) => {
  if (!book) return null;

  return (
    <div>
      <h5>Title</h5>
      <p>{book.title}</p>
      <h5>Author</h5>
      <p>{book.author}</p>
      <h5>Published Year</h5>
      <p>{book.published_year}</p>
      <h5>Genre</h5>
      <p>{book.genre}</p>
      <h5>Description</h5>
      <p>{book.description}</p>
      
      {/* Action Buttons EDIT and DELETE passed the edit and delete props*/}
      <MDBBtn color="primary" onClick={onEdit} className="me-2">
        <MDBIcon fas icon="edit" /> Edit
      </MDBBtn>
      <MDBBtn color="danger" onClick={onDelete}> 
        <MDBIcon fas icon="trash-alt" /> Delete
      </MDBBtn>
    </div>
  );
};

export default BookDetails;

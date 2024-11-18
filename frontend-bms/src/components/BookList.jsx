import React, { useState, useEffect } from 'react';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import BookForm from './BookForm';
import ConfirmationModal from './ConfirmationModal';
import BookDetails from './BookDetails';
import ToastMessage from './ToastMessage';
import FAB from './Fab';

const BookList = ({ searchTerm }) => {
  // States
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [originalBook, setOriginalBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books');
        if (!response.ok) throw new Error('Database not set up');
        const data = await response.json();
        setBooks(data); //sets the book data
      } catch (error) {
        console.error('Error fetching books:', error);
        setToastMessage('Error fetching books: Database is not yet set up or not running.');
        setToastVariant('danger');
        setShowToast(true); //show the toast component with the error and variant
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.published_year.toString().includes(searchTerm) ||
          book.id.toString().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ); // this one filters the book base on the search term given from the navbar
    } else {
      setFilteredBooks(books); // default, meaning no filter and loads all the books from the books state
    }
  }, [books, searchTerm]);

  // Event Handlers
  // When a book is clicked backup the original book and open the modal of the selected book
  const handleRowClick = (book) => {
    setSelectedBook(book);
    setOriginalBook(book);
    setModalOpen(true);
    setIsEditMode(false); //not yet editing because its just the view
  };

  // closing the modal and setting back the original book
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(originalBook);
    setIsEditMode(false);
  };

  // for handling the changes made on the form of the book
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };

  const handleSaveChanges = () => {
    const requiredFields = ['title', 'author', 'published_year', 'genre', 'description'];
    const emptyFields = requiredFields.filter((field) => !selectedBook[field]);

    // shows a toast message with the required fields if trying to save a book with empty fields
    if (emptyFields.length > 0) {
      setToastMessage(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    setLoading(true); //changes the button to saving...
    if (!selectedBook.id) {
      confirmSaveChanges(); //if for adding a book
    } else {
      setSaveConfirmationOpen(true); //if for saving changes/edit
    }
  };

  // for communicating EDIT OR ADD in the backend
  const confirmSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/books/${selectedBook.id || ''}`, // if there is a book id include it, else just make it blank
        {
          method: selectedBook.id ? 'PUT' : 'POST', // PUT for updating, POST for adding
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedBook),
        }
      );

      if (response.ok) {
        const updatedBook = await response.json();
        if (!selectedBook.id) { //if there is no id, update the books state to include the latest book
          setBooks((prevBooks) => [...prevBooks, updatedBook]);
          setToastMessage('Book added successfully!');
        } else {
          setBooks((prevBooks) => //if there is an id, update the specific book in the books state to include the updated book
            prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
          );
          setToastMessage('Book saved successfully!');
        }
        setToastVariant('success');
        setShowToast(true);
        setModalOpen(false);
        setSaveConfirmationOpen(false);
        setIsEditMode(false);
      } else {
        throw new Error('Failed to save book');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      setToastMessage('Error saving book.');
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setLoading(false); // return the button to save | re-enable the button
    }
  };

  const handleDeleteBook = () => {
    setDeleteConfirmationOpen(true); //show the modal for delete confirmation
  };

  const confirmDeleteBook = async () => { // for deleting the book and removing it from the book state
    try {
      const response = await fetch(`http://localhost:8000/api/books/${selectedBook.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id));
        setToastMessage('Book deleted successfully!');
        setToastVariant('success');
        setShowToast(true);
        setModalOpen(false);
        setDeleteConfirmationOpen(false);
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      setToastMessage('Error deleting book.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  //for handling adding a book
  const handleAddBook = () => {
    setSelectedBook({ title: '', author: '', published_year: '', genre: '' });
    setOriginalBook({ title: '', author: '', published_year: '', genre: '' });
    setModalOpen(true);
    setIsEditMode(true);
  };

  // Rendering
  return (
    <>
      {/* Books Table */}
      <MDBTable responsive>
        <MDBTableHead style={{ backgroundColor: '#4b2e83', color: '#ffffff' }}>
          <tr>
            <th>ID</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Genre</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {/* What displays here depends on the filtered books state | */}
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <tr
                key={book.id}
                onClick={() => handleRowClick(book)} // make a row clickable
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d3d3d3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
              >
                {/* show the books information */}
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published_year}</td>
                <td>{book.genre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6c757d' }}>
                No Books Record Found
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      {/* Modals */}
      {selectedBook && (
        <MDBModal tabIndex="-1" open={modalOpen} onClose={handleCloseModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  <MDBIcon fas icon="book" className="me-2" />
                  {isEditMode ? (selectedBook.id ? 'Edit Book Details' : 'Add New Book') : 'Book Details'} {/* Change the modal title based on the isEditMode state and selectedBook.id */}
                </MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModal}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {isEditMode ? ( // for edtting and adding a book
                  <BookForm
                    bookData={selectedBook} // if selected book is empty in data it means all the fields will not have a value
                    onChange={handleInputChange}
                    onCancel={handleCloseModal}
                  />
                ) : (
                  <BookDetails
                    book={selectedBook}
                    onEdit={() => setIsEditMode(true)}
                    onDelete={handleDeleteBook}
                  />
                )}
              </MDBModalBody>
              {isEditMode && (
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={handleCloseModal}>
                    Cancel
                  </MDBBtn>
                  <MDBBtn color="success" onClick={handleSaveChanges} disabled={loading}>
                    {loading ? 'Saving...' : selectedBook.id ? 'Save Changes' : 'Add Book'} {/* If the buttons is disabled it turns into Saving... else if there is a id it says save changes else it says add book */}
                  </MDBBtn>
                </MDBModalFooter>
              )}
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}

      {/* SAVE CONFIRMATION MODAL */}
      <ConfirmationModal
        open={saveConfirmationOpen}
        onConfirm={confirmSaveChanges}
        onClose={() => { setSaveConfirmationOpen(false); setLoading(false); }}
        message="Are you sure you want to save changes to this book?"
      />

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmationModal
        open={deleteConfirmationOpen}
        onConfirm={confirmDeleteBook}
        onClose={() => setDeleteConfirmationOpen(false)}
        message="Are you sure you want to delete this book?"
      />

      {/* Toast Messages */}
      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
      />

      {/* Add Book Button | starts the add book process */}
      <FAB onClick={handleAddBook} /> 
    </>
  );
};

export default BookList;

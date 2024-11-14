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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books');
        if (!response.ok) {
          throw new Error('Database not set up');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setToastMessage('Error fetching books: Database is not yet set up.');
        setToastVariant('danger');
        setShowToast(true);
      }
    };
    fetchBooks();
  }, []);

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
      );
    } else {
      setFilteredBooks(books); 
    }
  }, [books, searchTerm]);
  

  const handleRowClick = (book) => {
    setSelectedBook(book);
    setOriginalBook(book); 
    setModalOpen(true);
    setIsEditMode(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(originalBook); 
    setIsEditMode(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };

  const handleSaveChanges = () => {
    const requiredFields = ['title', 'author', 'published_year', 'genre'];
    const emptyFields = requiredFields.filter((field) => !selectedBook[field]);

    if (emptyFields.length > 0) {
      setToastMessage(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    setLoading(true); 
    if (!selectedBook.id) {
      confirmSaveChanges();
    } else {
      setSaveConfirmationOpen(true);
    }
  };

  const confirmSaveChanges = async () => {
    try {
      let response;
      if (isEditMode && selectedBook.id) {
        response = await fetch(`http://localhost:8000/api/books/${selectedBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedBook),
        });
      } else {
        response = await fetch('http://localhost:8000/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedBook),
        });
      }

      if (response.ok) {
        const updatedBook = await response.json();
        if (!selectedBook.id) {
          setBooks((prevBooks) => [...prevBooks, updatedBook]);
          setToastMessage('Book added successfully!');
        } else {
          setBooks((prevBooks) =>
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
        console.error('Failed to save book');
        setToastMessage('Failed to save book.');
        setToastVariant('danger');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      setToastMessage('Error saving book.');
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setLoading(false); 
    }
  };

  const handleDeleteBook = () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteBook = async () => {
    if (!selectedBook) return;
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
        console.error('Failed to delete book');
        setToastMessage('Failed to delete book.');
        setToastVariant('danger');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      setToastMessage('Error deleting book.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleAddBook = () => {
    setSelectedBook({ title: '', author: '', published_year: '', genre: '' });
    setOriginalBook({ title: '', author: '', published_year: '', genre: '' }); 
    setModalOpen(true);
    setIsEditMode(true);
  };

  return (
    <>
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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <tr
                key={book.id}
                onClick={() => handleRowClick(book)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d3d3d3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
              >
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

      {/* Opens the BookForm component and changes it depends if Adding or Editing */}
      {selectedBook && (
        <MDBModal tabIndex="-1" open={modalOpen} onClose={handleCloseModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  <MDBIcon fas icon="book" className="me-2" />
                  {isEditMode ? (selectedBook.id ? 'Edit Book Details' : 'Add New Book') : 'Book Details'}
                </MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModal}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {isEditMode ? (
                  <BookForm
                    bookData={selectedBook}
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
                    {loading ? 'Saving...' : selectedBook.id ? 'Save Changes' : 'Add Book'}
                  </MDBBtn>
                </MDBModalFooter>
              )}
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        open={saveConfirmationOpen}
        onConfirm={confirmSaveChanges}
        onClose={() => { setSaveConfirmationOpen(false); setLoading(false); }}  
        message="Are you sure you want to save changes to this book?"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={deleteConfirmationOpen}
        onConfirm={confirmDeleteBook}
        onClose={() => setDeleteConfirmationOpen(false)}
        message="Are you sure you want to delete this book?"
      />

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
      />

      <FAB onClick={handleAddBook} />
    </>
  );
};

export default BookList;

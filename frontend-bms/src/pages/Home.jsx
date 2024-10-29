import React, { useState } from 'react';
import NavBar from '../components/NavBar'; 
import BookList from '../components/BookList'; 

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <BookList searchTerm={searchTerm} /> {/* Pass searchTerm to BookList */}
    </div>
  );
};

export default Home;

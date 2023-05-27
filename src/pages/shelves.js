import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Search from '../components/Search'
import BookShowCard from '../components/BookShowCard';
import BookDetailCard from '../components/BookDetailCard';
import { useBooksContext } from '../hooks/useBooksContext';
import { ReviewsContextProvider } from '../context/ReviewsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { getProxyURL } from '../helpers/proxy';

export default function Shelves() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const {books, dispatch} = useBooksContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(getProxyURL() + '/api/books')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BOOKS', payload: json})
      }
    }

    fetchBooks()
  }, [dispatch])

  const handleAddBookClick = () => {
    setShowSearch(true);
  };

  const handleShowDetail = (book) => {
    setSelectedBook(book);
    setShowDetail(true);
  };

  return (
    <div className="shelves-page">
      <Navbar />
      <h1 className="heading">CHECK OUT OUR READS</h1>
        <div style={{display: "flex", justifyContent: "center"}}>
        {user && (user.user.email==='lmn28@duke.edu') && (
                  <button className="add-book-btn btn btn-light" onClick={handleAddBookClick}><b>add a book</b></button>
        )}
      </div>
      <div className="shelves-container">
        {books && books.map((book) => (
          <BookShowCard
          key = {book._id}
          bookKey={book._id}
          title={book.title}
          author={book.author}
          coverURL={book.coverURL}
          reads = {book.reads}
          description = {book.description}
          onClick={() => handleShowDetail(book)}
        />        
        ))}
      </div>
      <Footer />
      <ReviewsContextProvider>
      {showSearch && <Search onClose={() => setShowSearch(false)} />}
      {showDetail && (
        <BookDetailCard
            key = {selectedBook._id}
            bookID = {selectedBook._id}
            onClose= {() => setShowDetail(false)}
            title={selectedBook.title}
            description={selectedBook.description}
            author={selectedBook.author}
            coverURL={selectedBook.coverURL}
            reads = {selectedBook.reads}
          />
      )}
      </ReviewsContextProvider>
    </div>
  );
}

  

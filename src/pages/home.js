import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import MonthDetailCard from '../components/MonthDetailCard';
import MonthShowCard from '../components/MonthShowCard';


const HomePage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/month')
      const json = await response.json()

      if (response.ok) {
        setBooks(json);
      }
    }

    fetchBooks();
  }, [])

  const handleShowDetail = (book) => {
    setSelectedBook(book);
    setShowDetail(true);
  };

  return (
    <div className = "index-page">
      <NavBar />
      <div className = "welcome">
        <div className = "welcome-message">
        WHO THE HELL EVEN READS ANYMORE?
          </div>
          {/* <div className = "name-message">
            DUKE AMATEUR'S BOOK CLUB
          </div> */}
      </div>
      <div className = "current-reads">
        <div className = "current-message">
        <div style = {{color: "white"}}><i>WE DO.</i></div>
        <div>& THIS MONTH, WE'RE READING</div>
      </div>
      <div className="shelves-page">
      <div className="books-container">
        {books && books.map((book) => (
          <MonthShowCard
          key = {book._id}
          bookKey={book._id}
          title={book.title}
          author={book.author}
          coverURL={book.coverURL}
          reads = {book.reads}
          onClick={() => handleShowDetail(book)}
        />        
        ))}
      </div>
      {showDetail && (
        <MonthDetailCard
            key = {selectedBook._id}
            bookID = {selectedBook._id}
            onClose= {() => setShowDetail(false)}
            title={selectedBook.title}
            description={selectedBook.description}
            author={selectedBook.author}
            coverURL={selectedBook.coverURL}
          />
      )}
    </div>
      </div>
        <Footer/>
    </div>
  );
}

export default HomePage;
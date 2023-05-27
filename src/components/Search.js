import React, { useState } from "react";
import axios from 'axios';
import BookSearchCard from './BookSearchCard';


export default function Search({ onClose }) {

    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const apiKey = "AIzaSyARA9UeOW6tuMzkETmtsraSK-fo7APJn6A";

    function handleChange(event){
        const book = event.target.value;
        setBook(book);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=20")
        .then(data => {
            const filteredItems = data.data.items.filter(item => 
                item.volumeInfo.imageLinks &&
                item.volumeInfo.authors &&
                item.volumeInfo.title
            );
            console.log(filteredItems);
            setResult(filteredItems);
        });
        
    }
    

  return (
    <div className = "overlay">
    <div className="search-container">
        <button className = "close-button btn-close btn-light" type="button" onClick = {onClose}></button>
      <div className="search-header">
        <h1 className="search-message">Search for a book to add to our shelves!</h1>
      </div>
      <form className="search-div" onSubmit = {handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a book"
            autoComplete="on"
            onChange = {handleChange}
          />
        </div>
        <button type="submit" className="btn btn-light">
          Search
        </button>
      </form>
      <div className = "search-results">
      {result.map(book => (
        <BookSearchCard
        bookID={book.id}
        key = {book._id}
        thisBook={book.volumeInfo}
        />
      ))}
      </div>
    </div>
    </div>
  );
}

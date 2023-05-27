import React from "react";
import { Card } from 'antd';
import { useBooksContext } from "../hooks/useBooksContext";
import { useLoansContext } from "../hooks/useLoansContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router";
import { useState } from "react";

const {Meta} = Card;

function BookSearchCard(props) {
  const { dispatch: booksDispatch } = useBooksContext();
  const { dispatch: loansDispatch } = useLoansContext();
  const {user} = useAuthContext();
  const location = useLocation();
  const [error, setError] = useState(null);

  const handleClick = () => {
    // Determine the current page and execute the corresponding function
    if (location.pathname === '/loaning') {
      addLoan();
    } else if (location.pathname === '/shelves') {
      addBook();
    }
  };

  const addBook = async () => {
    setError(null);
    const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          uniqueBook: `${props.bookID}`,
          title: `${props.thisBook.title}`,
          description: `${props.thisBook.description}`,
          author: `${props.thisBook.authors[0]}`,
          coverURL: `${props.thisBook.imageLinks.thumbnail}`,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error)
      }
      else if(response.ok){
        console.log('new loan added', data)
        booksDispatch({type: 'CREATE_BOOK', payload: data})
      }
  };

  const addLoan = async() => {
    // e.preventDefault();
    const response = await fetch('/api/bookLoans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          title: `${props.thisBook.title}`,
          description: `${props.thisBook.description}`,
          author: `${props.thisBook.authors[0]}`,
          coverURL: `${props.thisBook.imageLinks.thumbnail}`,
          userID: user.user._id,
          available: true
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
      }
      else if(response.ok){
        console.log('new loan added', data)
        loansDispatch({type: 'CREATE_LOAN', payload: data.bookLoan})
  };
}


  return(
    <Card className="book-search-card"
      hoverable
      cover={<img className="book-card-img" src={props.thisBook.imageLinks.thumbnail} alt = 'search-cover'/>}
      onClick = {handleClick}
    >
      <Meta
        description={<p><b>{props.thisBook.title}</b> by {props.thisBook.authors[0]}</p>}
      />
      {error && <div className="error">{error}</div>}
    </Card>
  );
};

export default BookSearchCard;

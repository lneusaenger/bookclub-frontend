import React from "react";
import { Card } from 'antd';
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { getProxyURL } from "../helpers/proxy";

const {Meta} = Card;

function BookShowCard(props) {
  const { dispatch } = useBooksContext();
  const {user} = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch(getProxyURL() + '/api/books/' + props.bookKey, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: data });
    }
  };

  const handleAddMonth = async() => {
    const response = await fetch('/api/month', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        title: `${props.title}`,
        description: `${props.description}`,
        author: `${props.author}`,
        coverURL: `${props.coverURL}`,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
    }
    else if(response.ok){
      console.log('new book month added', data)
    }
  }

  const handleCardClick = (event) => {
    // Call props.onClick only if it is defined and not triggered by the delete button
    if (props.onClick && !event.target.matches('.delete-button')) {
      props.onClick();
    }
  };

  return (
    <Card className="book-search-card" hoverable cover={<img className="book-card-img" src={props.coverURL} alt = ''/>} onClick={handleCardClick}>
      <Meta description={<p><b>{props.title}</b> by {props.author}</p>} />
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      {user && user.user.email==='lmn28@duke.edu' && (
        <button className='btn btn-primary delete-button' onClick={handleDelete}>
        delete
      </button>)}
      {user && user.user.email==='lmn28@duke.edu' && (<>
        <button className = 'btn btn-success delete-button' onClick={handleAddMonth}>
          + month
        </button>
      </>
      )}
    </Card>
  );
};

export default BookShowCard;

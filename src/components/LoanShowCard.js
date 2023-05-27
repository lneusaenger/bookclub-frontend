import React from "react";
import { Card } from 'antd';
import { useLoansContext } from "../hooks/useLoansContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const {Meta} = Card;

function LoanShowCard(props) {
  const { dispatch } = useLoansContext();
  const {user} = useAuthContext();
  const [availability, setAvailability] = useState(props.availability)

  const handleDelete = async () => {
    const response = await fetch('/api/bookLoans/' + props.loanKey, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_LOAN', payload: data.bookLoan });
    }
  };

  const handleCardClick = (event) => {
    // Call props.onClick only if it is defined and not triggered by the delete button
    if (props.onClick && !event.target.matches('.delete-button') && !event.target.matches('.available-button')) {
      props.onClick();
    }
  };

  const changeAvailability = async () => {
    const id = props.loanKey;
    const response = await fetch('/api/bookLoans', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id: id
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
      }
      else if(response.ok){
        setAvailability(!availability);
        console.log('changed availability', data);
      }
  };

  return (
    <Card className="book-search-card" hoverable cover={<img className="book-card-img" src={props.coverURL} alt = ''/>} onClick={handleCardClick}>
      <Meta description={<p><b>{props.title}</b> by {props.author}</p>} />
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      {user && (user.user._id===props.userID) && (
        <button className='btn btn-primary delete-button' onClick={handleDelete}>
        delete
      </button>)}
      {user && (user.user._id === props.userID) && (
          <button className={`btn ${availability ? 'btn-success' : 'btn-danger'} available-button`} onClick={changeAvailability} disabled={false}>
          {availability ? 'Available' : 'Not Available'}
        </button>
          )}

      {user && (user.user._id !== props.userID) && (
          <button className={`btn ${availability ? 'btn-success' : 'btn-danger'} available-button`} onClick={changeAvailability} disabled={true}>
          {availability ? 'Available' : 'Not Available'}
        </button>
          )}
    </Card>
  );
};

export default LoanShowCard;
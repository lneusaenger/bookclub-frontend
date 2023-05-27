import React from "react";
import { Card } from 'antd';
import { useAuthContext } from "../hooks/useAuthContext";

const {Meta} = Card;

function MonthShowCard(props) {
  const {user} = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch('/api/month/' + props.bookKey, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await response.json();

    if (response.ok) {
      console.log("successfully deleted month");
    }
    else{
        console.log(data.error);
    }
  };

  const handleCardClick = (event) => {
    // Call props.onClick only if it is defined and not triggered by the delete button
    if (props.onClick && !event.target.matches('.delete-button')) {
      props.onClick();
    }
  };

  return (
    <Card className="month-card" hoverable cover={<img className="book-card-img" src={props.coverURL} alt = ''/>} onClick={handleCardClick}>
      <Meta description={<p><b>{props.title}</b> by {props.author}</p>} />
      {user && user.user.email==='lmn28@duke.edu' && (
        <button className='btn btn-primary delete-button' onClick={handleDelete}>
        delete
      </button>)}
    </Card>
  );
};

export default MonthShowCard;

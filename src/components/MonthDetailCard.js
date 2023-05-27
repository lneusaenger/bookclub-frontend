import { React } from "react";
import { CloseButton } from "react-bootstrap";

export default function MonthDetailCard(props) {

    return (
      <div className = "overlay">
    <div className="detail-container">
        <div className = "detail-header">
            <CloseButton onClick = {props.onClose} />
        </div>
        <div className = "detail-top">
            <img className = "detail-cover" src = {props.coverURL} alt = 'cover'/>
                <span className = "detail-defining">
                <h1 className = "detail-card-title"><b>{props.title}</b></h1>
                <h2 className = "detail-card-author">by <i>{props.author}</i></h2>
                </span>
        </div>
            <p className = "detail-card-description">{props.description}</p>
        </div>
        </div>
  );
};
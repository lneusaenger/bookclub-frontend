import { React, useState } from "react";
import { useEffect } from "react";
import { CloseButton } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";

export default function LoanDetailCard(props) {
    const [name, setName] = useState('Please sign in first');
    const [email, setEmail] = useState('');
    const {user} = useAuthContext();

    useEffect(() => {
      const getLoaner = async () => {
        if (!user) {
          return; // If user.token is null, exit the function
        }
    
        const response = await fetch('/api/user/' + props.userID, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
    
        if (response.ok) {
          setName(json.name);
          setEmail(json.email);
        } else {
          console.log(json.error);
        }
      };
    
      getLoaner();
    }, [props.userID, user]);
    

  
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
            <p className = "detail-card-description"><b>On the shelf of:</b> {name}</p>
            {user && (
                <button className="btn btn-success" onClick={() => window.location.href = `mailto:${email}`}>
                  Contact owner of <i>{props.title}</i>
                </button>
            )}
        </div>
        </div>
  );
};

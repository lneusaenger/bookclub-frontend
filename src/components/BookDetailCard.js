import { React, useState } from "react";
import ReviewCard from './ReviewCard';
import ReadForm from './ReadForm';
import { useReviewsContext } from "../hooks/useReviewsContext";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { CloseButton } from "react-bootstrap";

export default function BookDetailCard(props) {
    const [showReadForm, setShowReadForm] = useState(false);
    const toggleReadForm = () => {
      setShowReadForm(!showReadForm);
    };
  
    const { reviews, dispatch } = useReviewsContext();
    const { user } = useAuthContext();
  
    useEffect(() => {
      const fetchReviews = async () => {
        const response = await fetch(`/api/books/reviews/` + props.bookID);
        const json = await response.json();
  
        if (response.ok) {
          console.log(json);
          dispatch({ type: 'SET_REVIEWS', payload: json });
        }
      };
  
      fetchReviews();
    }, [dispatch, props.bookID]);

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
            <div className="reviews" style={{ width: "100%" }}>
                <h2 style={{ textAlign: "center" }}>Our Reviews</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <ReviewCard
                            email={review.email}
                            name={review.name}
                            review={review.review}
                            rating={review.rating}
                            finished={review.finished}
                            />
                        ))
                    ) : (
                <h3 style={{ textAlign: "center" }}><i>No reviews yet.</i></h3>
                )}
            {}
            </div>
            <div className="new-read">
            {!showReadForm && user && <button className="add-book-btn btn btn-light" onClick={toggleReadForm}><b>Add a review</b></button>}
            {showReadForm && <ReadForm bookID = {props.bookID}/>}
            </div>
        </div>
        </div>
  );
};

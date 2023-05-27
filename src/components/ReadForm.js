import { useState } from 'react';
import { useReviewsContext } from '../hooks/useReviewsContext';
import { useAuthContext } from '../hooks/useAuthContext';


export default function ReadForm(props) {
    const {user} = useAuthContext();
    const name = user.user.name;
    const email = user.user.email;
    const [review, setReview] = useState('');
    const [finished, setFinished] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);

    const {dispatch} = useReviewsContext();

    const addRead = async (readData) => {
    const { id, finished, name, review, rating } = readData;
    const response = await fetch('/api/books/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          id,
          email,
          finished,
          name,
          review,
          rating,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        
      }
      else if(response.ok){
        console.log('new review added', data)
        setError(null)
        dispatch({type: 'CREATE_REVIEW', payload: data})
      }
  };   
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const readData = {
        id: props.bookID,
        email,
        name,
        review,
        finished: finished || null,
        rating,
      };
      addRead(readData);
      setReview('');
      setFinished('');
      setRating(0);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
  <div className="form-group">
    <label htmlFor="review"></label>
    <textarea
      className="form-control"
      id="review"
      placeholder="Enter your review"
      value={review}
      onChange={(event) => setReview(event.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="finished"></label>
    <input
      type="date"
      className="form-control"
      id="finished"
      placeholder="Enter date finished"
      value={finished}
      onChange={(event) => setFinished(event.target.value)}
    />
  </div>

  <div className="form-group">
    <label htmlFor="rating"></label>
    <input
      type="number"
      step="0.1"
      className="form-control"
      id="rating"
      placeholder="Enter rating out of 5"
      value={rating}
      onChange={(event) => setRating(parseFloat(event.target.value))}
      required
    />

  </div>
  <div style={{display: "flex", justifyContent: "center"}}>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  </div>
  </form>
    );
  }
  
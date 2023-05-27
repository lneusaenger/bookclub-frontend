import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Search from '../components/Search';
import LoanShowCard from '../components/LoanShowCard';
import LoanDetailCard from '../components/LoanDetailCard';
import { useLoansContext } from '../hooks/useLoansContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Loaning() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const {loans, dispatch} = useLoansContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch('/api/bookLoans')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LOANS', payload: json})
      }
    }

    fetchLoans()
  }, [dispatch])

  const handleAddLoanClick = () => {
    setShowSearch(true);
  };

  const handleShowDetail = (loan) => {
    setSelectedLoan(loan);
    setShowDetail(true);
  };

  return (
    <div className="shelves-page">
      <Navbar />
      <h1 className="heading">LENDING LIBRARY</h1>
      <div className = "book-page-desc"><span style = {{width: "90%"}}><b>Here, members can add physical books that they have that they would be willing to lend to other book club members. If you have a book, add it to our library! If you're looking to borrow, look through our selection and see what you like. If you are the loaner of a book, you can toggle the 'Available/Not Available' button to indicate whether or not the book is available for someone to borrow. If you are looking to loan a book, please add a new book using the 'add book' button below.</b></span></div>
        <div style={{display: "flex", justifyContent: "center"}}>
            {user && (
                  <button className="add-book-btn btn btn-light" onClick={handleAddLoanClick}><b>add a book</b></button>
        )}
      </div>
      <div className="shelves-container">
        {loans && loans.map((loan) => (
          <LoanShowCard
          key = {loan._id}
          loanKey = {loan._id}
          title={loan.title}
          author={loan.author}
          coverURL={loan.coverURL}
          userID = {loan.userID}
          availability = {loan.available}
          onClick={() => handleShowDetail(loan)}
        />        
        ))}
      </div>
      <Footer />
      {showSearch && <Search onClose={() => setShowSearch(false)} />}
      {showDetail && (
        <LoanDetailCard
            key = {selectedLoan._id}
            loanKey = {selectedLoan._id}
            onClose= {() => setShowDetail(false)}
            title={selectedLoan.title}
            description={selectedLoan.description}
            author={selectedLoan.author}
            coverURL={selectedLoan.coverURL}
            userID = {selectedLoan.userID}
            availability = {selectedLoan.available}
          />
      )}
    </div>
  );
}

  

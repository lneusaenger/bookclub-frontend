import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Search from '../components/Search';
import LoanShowCard from '../components/LoanShowCard';
import LoanDetailCard from '../components/LoanDetailCard';
import { useLoansContext } from '../hooks/useLoansContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Account() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const {loans, dispatch} = useLoansContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch('/api/user/loans/' + user.user._id)
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LOANS', payload: json})
      }
    }

    fetchLoans()
  }, [dispatch, user.user._id])

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
      <h1 className="heading">Hello {user.user.name}!</h1>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div><b>VIEW AND MANAGE YOUR LOANS HERE</b></div>
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
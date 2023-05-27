import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
    return (
      <div className = "about-page">
        <NavBar />
          <div className = "about">
            <h1 className = "heading">ABOUT US</h1>
            <div className = "content">
                <div className = "who side-by-side">
                    <span className = "question"><h1>WHO ARE WE?</h1></span>
                    <span className = "answer"><p>We are a club at Duke University dedicated to creating an inclusive, fun, and casual community for book-lovers. Whether your favorite book is Crime and Punishment or Fifty Shades of Grey, you and your tastes are always welcome.</p></span>
                </div>
                <div className = "google-form" style = {{marginTop: "30"}}>
                    <h2>Fill out the form below to get involved!</h2>
                <iframe title = 'google-link' src="https://docs.google.com/forms/d/e/1FAIpQLSffMgT83azoLHtkz50MzHoreXfw3bTsNSaBgbgA6OMqMhPgng/viewform?embedded=true" width="640" height="1281" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </div>
            </div>
          </div>
        <Footer/>
      </div>
    );
  }
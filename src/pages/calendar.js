import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Calendar() {
    return (
      <div className = "calendar-page">
        <NavBar />
        <div className = "about">
            <h1 className = "heading">CALENDAR</h1>
            <div className = "calendar">
            <iframe className = "google-calendar" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&title=Duke%20Amateurs%20Book%20Club&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=ZHVrZWFtYXRldXJzYm9va2NsdWJAZ21haWwuY29t&color=%23039BE5"></iframe>
            </div>
          </div>
          <Footer/>
      </div>
    );
  }
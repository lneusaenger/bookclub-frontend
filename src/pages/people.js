import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import OfficerCard from "../components/OfficerCard";

export default function People() {
    const officers = require("../data/officers.json")

    return (
      <div className = "officer-page">
      <NavBar />
      <div className = "heading">
        <b>LEADERSHIP</b>
      </div>
      <div className = "officers">
        {officers.map((officer)=>(
            <OfficerCard
                key={officer.First + officer.Last}
                title={officer.Title}
                img = {"https://dukeabc2.s3.amazonaws.com/images/officers/" + officer.First + officer.Last + ".webp"}
                name={officer.First + " " + officer.Last}
                bio = {officer.Bio}
                goodreads={officer.Goodreads}
                favs = {officer.FavPath}
                reviews = {officer.Reviews}
                />
            ))}
      </div>
        <Footer />
      </div>
    );
}
function FavCard(props){
    return(
    <>
    <div className = "fav-card-container">
            <img className = "fav-card-img" src = {props.cover} alt = 'cover' />
            <span className = "fav-card-content">
                <h1 className = "fav-card-title">{props.title}</h1>
                <p className = "fav-card-review"><b>My review</b>: {props.review}</p>
            </span>
    </div>
    </>
    );
};

export default FavCard;

import './Rating.css';

function Rating(props) {
  return (
    <>
        <div className="product-rating">
          <p><b>Rating: </b></p>
            <div className="star-rating" >
              <Star rating={props.rating} index="1"/>
              <Star rating={props.rating} index="2"/>
              <Star rating={props.rating} index="3"/>
              <Star rating={props.rating} index="4"/>
              <Star rating={props.rating} index="5"/>
            </div>
          <p>{props.rating}/5</p>
        </div>
    </>
    
  );
}
function Star(props) {
  const rating = parseInt(props.rating, 10); // base 10
  const index = parseInt(props.index, 10); // base 10
  if(rating<=index-1)
  {
    return (
      <span className="no-star" >&#9733;</span>
    );
  }
  else if(rating>index)
  {
    return (
      <span className="full-star" >&#9733;</span>
    );
  }
  else
  {
    return (
      <span className="half-star" >&#9733;</span>
    );
  }
}

export default Rating;

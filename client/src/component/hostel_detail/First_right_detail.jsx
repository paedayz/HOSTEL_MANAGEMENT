import React from 'react'
import StarRatings from "react-star-ratings";

/**
* @author
* @function First_right_detail
**/

const First_right_detail = ({owner, price, hostel_rating, hostel_visiting}) => {
  return(
    <div>
        <div style={{ fontSize: "20px" }}>
                  <div>
                    <b>Owner :</b> {owner}
                  </div>
                  <br />
                  <div>
                    <b>Price :</b>{" "}
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Baht/Day
                  </div>
                  <br />
                </div>

                <StarRatings
                  rating={parseInt(hostel_rating, 10)}
                  starRatedColor="#ECD700"
                  numberOfStars={5}
                />

                <div style={{ marginTop: "10px" }}>
                  Review by {hostel_visiting}{" "}
                  {hostel_visiting > 1 ? "users" : "user"}
                </div>
                <br />
                <hr />
    </div>
   )
  }


export default First_right_detail
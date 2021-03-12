import React from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import StarRatings from 'react-star-ratings'

/**
* @author
* @function HostelCardShow
**/



const HostelCardShow = (props) => {
    const history = useHistory()
  return(
    <div class="card">
        {props.is_booking &&
            <div className="bookingBadge">
                <svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#77DFCC" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                    <path  fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                </svg>
                <div style={{position:'absolute', top: '0%'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                </div>
                
          </div>
        }
        {/* eslint-disable-next-line */}
        <img src={`${props.image}`} class="card-img-top" alt="image"/>
        <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <StarRatings
                rating={parseInt(props.hostel_rating, 10)}
                starRatedColor="#ECD700"
                numberOfStars={5}
                starDimension="20px"
            />
            <p class="card-text">{props.detail}</p>
            <SecondDetail>
                <div>owner: {props.owner}</div>
                <div>Price: {(props.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Baht/Day</div>
                <div>Visiting by {props.hostel_visiting > 1 ?` ${props.hostel_visiting} users` : ` ${props.hostel_visiting} user`}</div>
            </SecondDetail>
            {/* eslint-disable-next-line */}
            <a onClick={() => history.push(`/hostel_detail/${props._id}`)} class="btn btn-primary">View Detail</a>
        </div>
    </div>
   )
}

const SecondDetail = styled.div`
    text-align: left;
    margin-bottom: 20px;
`


export default HostelCardShow
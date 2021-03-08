import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

// Redux
import {useDispatch, useSelector} from 'react-redux'
import {getHostelDetail, booking, cancelBooking} from '../redux/actions/dataAction'

// Component
import HostelMap from '../component/hostel/HostelMap'

/**
* @author
* @function HostelDetail
**/

const HostelDetail = (props) => {
    const loading = useSelector(state => state.data.loading)
    const single_hostel_detail = useSelector(state => state.data.single_hostel_detail)
    // eslint-disable-next-line
    const {location, is_booking, image, name, price, detail, owner, _id, booking_id} = single_hostel_detail

    const {hostelId} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHostelDetail(hostelId))
        // eslint-disable-next-line
    },[])

    const onBookingClick = () => {
        if (window.confirm("Confirm Booking")) {
            dispatch(booking(_id))
          }
    }

    const onCancelBookingClick = () => {
        if (window.confirm("Cancel Booking")) {
            dispatch(cancelBooking(booking_id))
          }
    }

    if(!loading && location) {
        return(
            <div className="content">
                <h1>{name}</h1>
                <img src={`${image}`} alt="image"/>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8">
                            <p>{detail}</p>
                        </div>
                        <div class="col-sm-4">
                            <div>Owner : {owner}</div>
                            <br/>
                            <div>Price : {price} baht/day</div>
                            <br/>
                            {is_booking
                            ?
                            <button type="button" onClick={() => onCancelBookingClick()} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Cancel Booking
                            </button>
                            :
                            <button type="button" onClick={() => onBookingClick()} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Booking
                            </button>
                            }
                        </div>
                        <div class="col-sm-12">
                            <HostelMap latitude={location.latitude} longitude={location.longitude}/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
                
                
            </div>
           )
    } else {
        return(
            <div>loading</div>
           )
    }
  
  }


export default HostelDetail
import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'

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
    const {location, is_booking, image, name, price, detail, owner, _id, booking_id, admin_approve, status} = single_hostel_detail

    const {hostelId} = useParams()

    const dispatch = useDispatch()
    console.log(admin_approve)

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
                <div class="container">
                    <div class="row">
                    
                        <div class="col-sm-8">
                            <Image src={`${image}`} alt="image"/>
                        </div>
                        <div class="col-sm-4">
                            <BookingSide>
                            <div>Owner : {owner}</div>
                            <br/>
                            <div>Price : {price} baht/day</div>
                            <br/>
                            {status === 'available' && admin_approve
                                ?
                                <div>
                                    {
                                        is_booking
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
                                :
                                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Not Open Yet
                                </button>
                                }
                                
                            </BookingSide>
                        </div>
                        <div class="col-sm-6">
                        <Description><b>Description:</b> {detail}</Description>
                            <HostelMap latitude={location.latitude} longitude={location.longitude}/>
                            
                        </div>
                            
                        <div class="col-sm-6">
                                
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

const BookingSide = styled.div`
  text-align: left;
  margin-top: 30px
`

const Image = styled.img`
  max-width: 700px;
  max-height: 500px;
  min-width: 500px;
  min-height: 300px;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  float: left;
`

const Description = styled.p`
  text-align: left;
  margin-top: 20px;
`

export default HostelDetail
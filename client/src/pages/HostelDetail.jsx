import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

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
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const loading = useSelector(state => state.data.loading)
    const single_hostel_detail = useSelector(state => state.data.single_hostel_detail)
    const {location, is_booking, image, name, price, detail, owner, _id, booking_id, admin_approve, status, check_in, check_out ,hostel_rating} = single_hostel_detail

    const {hostelId} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHostelDetail(hostelId))
        // eslint-disable-next-line
    },[])

    const onBookingClick = () => {
        const today = new Date()
        const checkInDate = new Date(checkIn)

        if(!checkIn || !checkOut) {
            window.alert('Please Select Check in and Check out Date')
        } else if(checkInDate <= today) {
            window.alert('Your Check in date is late now')
        } else if(checkOut <= checkIn){
            window.alert('Check In Date must before Check Out Date')
        }  else {
            if (window.confirm("Confirm Booking")) {
                dispatch(booking(_id, checkIn, checkOut))
            }
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
                            <StarRatings
                                rating={parseInt(hostel_rating, 10)}
                                starRatedColor="#ECD700"
                                numberOfStars={5}
                            />
                            {status === 'available' && admin_approve
                                ?
                                <div>
                                    {
                                        is_booking
                                        ?
                                        <CancelBookingForm>
                                            <h4>Booking</h4>
                                            <div>Check In : {check_in}</div>
                                            <div>Check Out : {check_out}</div>
                                            <button style={{marginTop:'20px'}} type="button" onClick={() => onCancelBookingClick()} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Cancel Booking
                                            </button>
                                        </CancelBookingForm>
                                        
                                        :
                                        <BookingForm>
                                            <h4>Booking</h4>
                                            <DateBox>
                                                <label for="example-date-input" >Check in</label>
                                                <div>
                                                    <input class="form-control" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} id="example-date-input"/>
                                                </div>
                                            </DateBox>
                                            <DateBox>
                                                <label for="example-date-input" >Check out</label>
                                                <div>
                                                    <input class="form-control" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} id="example-date-input"/>
                                                </div>
                                            </DateBox>
                                            
                                            <button style={{marginTop:'20px'}} type="button" onClick={() => onBookingClick()} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Booking
                                            </button>
                                        </BookingForm>
                                        
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

const DateBox = styled.div`
    margin-top: 20px;
`

const CancelBookingForm = styled.div`
  margin-top: 50px;
`

const BookingForm = styled.div`
  margin-top: 50px;
`

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
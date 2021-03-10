import React, {useEffect, useState} from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useHistory} from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {getBookingList, cancelBooking} from '../redux/actions/dataAction'

// Component
import ReviewModal from '../component/hostel/ReviewModal'

/**
* @author
* @function Booking
**/

const Booking = (props) => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewData, setReviewData] = useState({
    booking_id: '',
    hostel_id: ''
  })
  const booking_list = useSelector(state => state.data.booking_list)
  const dispatch = useDispatch()
  dayjs.extend(relativeTime);
  const history = useHistory()

  useEffect(() => {
    dispatch(getBookingList())
  }, [])

  const openReviewModal = (hostel_id, booking_id) => {
    setReviewData({booking_id, hostel_id})
    setShowReviewModal(prev => !prev);
  };

  const onCancelBookingClick = (booking_id) => {
    if (window.confirm("Cancel Booking")) {
        dispatch(cancelBooking(booking_id))
      }
}

  const show_booking_list = booking_list.sort((a,b) => {
    if ( a.check_in < b.check_in ){
      return -1;
    }
    if ( a.check_in > b.check_in ){
      return 1;
    }
    return 0;
  }).map((book) => {
    if(book.hostel_id.status === 'available') {
      return (
        <tr className="pointTR">
              <th scope="row" onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>{book._id}</th>
              <td onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>{book.hostel_id.name}</td>
              <td onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>{book.hostel_id.owner}</td>
              <td onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>{book.check_in}</td>
              <td onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>{book.check_out}</td>
              <td onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>{dayjs(book.created_at).fromNow()}</td>
              <td>
                <button type="button" class="btn btn-success" onClick={() => openReviewModal(book.hostel_id._id, book._id)} style={{marginRight:10}}>
                    Review
                </button>
                <button type="button" class="btn btn-danger" onClick={() => onCancelBookingClick(book._id)} style={{marginRight:10}}>
                    Cancle
                </button>
              </td>
        </tr>
      )
    } else {
      return (
        <>
        </>
        )
    }
    
  })
  
  return(
    <div className="content">
      <ReviewModal showModal={showReviewModal} booking_id={reviewData.booking_id} hostel_id={reviewData.hostel_id} setShowModal={setShowReviewModal} />
      
      <div className="Header">
        <h1>My Booking List</h1>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Booking ID</th>
            <th scope="col">Hostel Name</th>
            <th scope="col">Owner</th>
            <th scope="col">Check In</th>
            <th scope="col">Check Out</th>
            <th scope="col">Booking Time</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {show_booking_list}
        </tbody>
      </table>
    </div>
   )
  }


export default Booking
import React, {useEffect} from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useHistory} from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {getBookingList} from '../redux/actions/dataAction'

/**
* @author
* @function Booking
**/

const Booking = (props) => {
  const booking_list = useSelector(state => state.data.booking_list)
  const dispatch = useDispatch()
  dayjs.extend(relativeTime);
  const history = useHistory()

  useEffect(() => {
    dispatch(getBookingList())
  }, [])

  const show_booking_list = booking_list.map((book) => {
    return (
      <tr className="pointTR" onClick={() => history.push(`/hostel_detail/${book.hostel_id._id}`)}>
            <th scope="row">{book._id}</th>
            <td>{book.hostel_id.name}</td>
            <td>{book.hostel_id.owner}</td>
            <td>{dayjs(book.created_at).fromNow()}</td>
      </tr>
    )
  })
  return(
    <div className="content">
      <h1>My Booking List</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Booking ID</th>
            <th scope="col">Hostel Name</th>
            <th scope="col">Owner</th>
            <th scope="col">Booking Time</th>
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
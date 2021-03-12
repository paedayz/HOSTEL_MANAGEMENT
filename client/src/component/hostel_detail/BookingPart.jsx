import React, {useState} from 'react'
import styled from 'styled-components'

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getHostelDetail,
  booking,
  cancelBooking,
} from "../../redux/actions/dataAction";

/**
* @author
* @function BookingPart
**/

const BookingPart = ({status, admin_approve, is_booking, check_in, check_out, booking_id, setShowReviewModal, _id}) => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const dispatch = useDispatch();

    const onCancelBookingClick = () => {
        if (window.confirm("Cancel Booking")) {
          dispatch(cancelBooking(booking_id));
        }
      };
    
      const openReviewModal = () => {
        setShowReviewModal((prev) => !prev);
      };

      const onBookingClick = () => {
        const today = new Date();
        const checkInDate = new Date(checkIn);
    
        if (!checkIn || !checkOut) {
          window.alert("Please Select Check in and Check out Date");
        } else if (checkInDate <= today) {
          window.alert("Your Check in date is late now");
        } else if (checkOut <= checkIn) {
          window.alert("Check In Date must before Check Out Date");
        } else {
          if (window.confirm("Confirm Booking")) {
            dispatch(booking(_id, checkIn, checkOut));
          }
        }
      };

  return(
    <div>
        {status === "Open" && admin_approve && (
                  <div>
                    {is_booking ? (
                      <CancelBookingForm>
                        <h4>Booking</h4>
                        <div>Check In : {check_in}</div>
                        <div>Check Out : {check_out}</div>
                        <button
                          style={{ marginTop: "20px", marginRight: "20px" }}
                          type="button"
                          onClick={() => onCancelBookingClick()}
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Cancel Booking
                        </button>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => openReviewModal()}
                          style={{ marginTop: "20px" }}
                        >
                          Review
                        </button>
                      </CancelBookingForm>
                    ) : (
                      <BookingForm>
                        <h4>Booking</h4>
                        <DateBox>
                          <label for="example-date-input">Check in</label>
                          <div>
                            <input
                              class="form-control"
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              id="example-date-input"
                            />
                          </div>
                        </DateBox>
                        <DateBox>
                          <label for="example-date-input">Check out</label>
                          <div>
                            <input
                              class="form-control"
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              id="example-date-input"
                            />
                          </div>
                        </DateBox>

                        <button
                          style={{ marginTop: "20px" }}
                          type="button"
                          onClick={() => onBookingClick()}
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Booking
                        </button>
                      </BookingForm>
                    )}
                  </div>
                )}
    </div>
   )
  }

const DateBox = styled.div`
  margin-top: 20px;
`;

const CancelBookingForm = styled.div`
  margin-top: 50px;
`;

const BookingForm = styled.div`
  margin-top: 50px;
`;

export default BookingPart
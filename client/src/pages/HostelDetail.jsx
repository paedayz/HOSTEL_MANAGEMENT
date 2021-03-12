import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getHostelDetail,
  booking,
  cancelBooking,
} from "../redux/actions/dataAction";

// Component
import HostelMap from "../component/hostel/HostelMap";
import ReviewModal from "../component/hostel/ReviewModal";

/**
 * @author
 * @function HostelDetail
 **/

const HostelDetail = (props) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const loading = useSelector((state) => state.data.loading);
  const single_hostel_detail = useSelector(
    (state) => state.data.single_hostel_detail
  );
  const username = useSelector((state) => state.user.credentials.username);
  const {
    location,
    is_booking,
    image,
    name,
    price,
    detail,
    owner,
    _id,
    booking_id,
    admin_approve,
    status,
    check_in,
    check_out,
    hostel_rating,
    hostel_visiting,
    owner_data,
    user_booking,
  } = single_hostel_detail;

  const { hostelId } = useParams();

  const dispatch = useDispatch();

  dayjs.extend(relativeTime);

  useEffect(() => {
    dispatch(getHostelDetail(hostelId));
    // eslint-disable-next-line
  }, []);

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

  const onCancelBookingClick = () => {
    if (window.confirm("Cancel Booking")) {
      dispatch(cancelBooking(booking_id));
    }
  };

  const openReviewModal = () => {
    setShowReviewModal((prev) => !prev);
  };

  const show_booking_list = user_booking ? (
    user_booking
      .sort((a, b) => {
        if (a.check_in < b.check_in) {
          return -1;
        }
        if (a.check_in > b.check_in) {
          return 1;
        }
        return 0;
      })
      .map((book) => {
        return (
          <tr className="pointTR">
            <th scope="row">{book._id}</th>
            <td>{book.booker.username}</td>
            <td>{book.booker.email}</td>
            <td>{book.booker.phone}</td>
            <td>{book.check_in}</td>
            <td>{book.check_out}</td>
            <td>{dayjs(book.created_at).fromNow()}</td>
          </tr>
        );
      })
  ) : (
    <div>No user booking now</div>
  );

  if (!loading && location) {
    return (
      <div className="content">
        <ReviewModal
          showModal={showReviewModal}
          setShowModal={setShowReviewModal}
          booking_id={booking_id}
          hostel_id={_id}
        />
        <h1 style={{ marginTop: "20px" }}>{name}</h1>
        <div class="container">
          <div class="row">
            <div class="col-sm-8">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Image src={`${image}`} alt="image" />

                <Description>
                  <b>Description:</b> {detail}
                </Description>
              </div>
              <div style={{ textAlign: "left", marginTop: "40px" }}>
                <h2>Locations : </h2>
              </div>
              <HostelMap
                latitude={location.latitude}
                longitude={location.longitude}
              />
            </div>
            <div class="col-sm-4">
              <BookingSide>
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
                <h4>Owner Detail</h4>
                <OwnerDataWraper>
                  <OwnerImage src={owner_data.image} />
                  <OwnerDescription>
                    <div>
                      <b>Username : </b>
                      {owner_data.username}
                    </div>
                    <div>
                      <b>Name : </b>
                      {owner_data.first_name} {owner_data.last_name}
                    </div>
                    <div>
                      <b>Email : </b>
                      {owner_data.email}
                    </div>
                    <div>
                      <b>Phone : </b>
                      {owner_data.phone}
                    </div>
                  </OwnerDescription>
                </OwnerDataWraper>
                <br />
                <hr />
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
              </BookingSide>
            </div>
            {username === owner && (
              <div className="col-sm-12">
                <br />
                <br />
                <br />
                <h2>User Booking List</h2>
                {user_booking.length != 0 ? (
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Booker</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Check In</th>
                        <th scope="col">Check Out</th>
                        <th scope="col">Booking Time</th>
                      </tr>
                    </thead>
                    <tbody>{show_booking_list}</tbody>
                  </table>
                ) : (
                  <div>No user booking now</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

const OwnerDescription = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const OwnerImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

const OwnerDataWraper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
`;

const DateBox = styled.div`
  margin-top: 20px;
`;

const CancelBookingForm = styled.div`
  margin-top: 50px;
`;

const BookingForm = styled.div`
  margin-top: 50px;
`;

const BookingSide = styled.div`
  text-align: left;
  margin-top: 30px;
`;

const Image = styled.img`
  max-width: 700px;
  max-height: 500px;
  min-width: 500px;
  min-height: 300px;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  float: left;
`;

const Description = styled.div`
  text-align: left;
  margin-top: 20px;
  width: 82%;
`;

export default HostelDetail;

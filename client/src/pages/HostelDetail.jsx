import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {getHostelDetail} from "../redux/actions/dataAction";

// Component
import ReviewModal from "../component/hostel/ReviewModal";
import UserBookingList from '../component/hostel_detail/User_booking_list'
import FirstRightDetail from '../component/hostel_detail/First_right_detail'
import OwnerDetail from '../component/hostel_detail/Owner_detail'
import BookingPart from '../component/hostel_detail/BookingPart'
import RightSide from '../component/hostel_detail/RightSide'

/**
 * @author
 * @function HostelDetail
 **/

const HostelDetail = (props) => {
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
              <RightSide image={image} detail={detail} location={location} />
            </div>

            <div class="col-sm-4">
              <RightSideDetail>

                <FirstRightDetail 
                  owner={owner} 
                  price={price} 
                  hostel_rating={hostel_rating} 
                  hostel_visiting={hostel_visiting} 
                  />

                <OwnerDetail 
                  owner_data={owner_data} 
                />

                <BookingPart 
                  status={status} 
                  admin_approve={admin_approve} 
                  is_booking={is_booking} 
                  check_in={check_in} 
                  check_out={check_out} 
                  booking_id={booking_id} 
                  setShowReviewModal={setShowReviewModal} 
                  _id={_id} 
                />

              </RightSideDetail>
            </div>

            <UserBookingList 
              username={username} 
              owner={owner} 
              user_booking={user_booking}
            />
            
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

const RightSideDetail = styled.div`
  text-align: left;
  margin-top: 30px;
`;

export default HostelDetail;

import React from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

/**
* @author
* @function User_booking_list
**/

const User_booking_list = ({username, owner, user_booking}) => {
    dayjs.extend(relativeTime);
    
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

  return(
    <div>
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
   )
  }


export default User_booking_list
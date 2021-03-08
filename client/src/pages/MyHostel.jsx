import React, {useEffect} from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useHistory} from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {getOwnerUserHostel} from '../redux/actions/dataAction'

/**
* @author
* @function MyHostel
**/

const MyHostel = (props) => {
  const own_hostel = useSelector(state => state.data.own_hostel)
  const dispatch = useDispatch()
  dayjs.extend(relativeTime);
  const history = useHistory()

  useEffect(() => {
    dispatch(getOwnerUserHostel())
  }, [])

  const show_own_hostel = own_hostel.map((hostel) => {
    return (
      <tr className="pointTR" onClick={() => history.push(`/hostel_detail/${hostel._id}`)}>
            <th scope="row">{hostel._id}</th>
            <td>{hostel.name}</td>
            <td>{hostel.status}</td>
            {hostel.admin_approve
            ?
            <td style={{color: 'blue'}}>{`${hostel.admin_approve}`}</td>
            :
            <td style={{color: 'red'}}>{`${hostel.admin_approve}`}</td>
            }
            
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{marginRight:10}}>
                    Close
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete
                </button>
            </td>
      </tr>
    )
  })
  return(
    <div className="content">
      <h1>My Hostel List</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Hostel ID</th>
            <th scope="col">Hostel Name</th>
            <th scope="col">Status</th>
            <th scope="col">Approve</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {show_own_hostel}
        </tbody>
      </table>
    </div>
   )
  }


export default MyHostel
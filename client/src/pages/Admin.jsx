import React, {useEffect, useState} from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useHistory} from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {getAllHostelList, adminApproveHostelRequest, deleteHostel} from '../redux/actions/dataAction'

/**
* @author
* @function Admin
**/

const Admin = (props) => {

  const all_hostel_list = useSelector(state => state.data.all_hostel_list)
  const loading = useSelector(state => state.data.loading)

  const dispatch = useDispatch()

  dayjs.extend(relativeTime);

  const history = useHistory()

  useEffect(() => {
    dispatch(getAllHostelList())
  }, [])

  const onClickApprove = (admin_approve, _id) => {
    const approve_data = {
        admin_approve,
        _id
    }
    if(admin_approve) {
        if(window.confirm('Confirm Approve Hostel')) {
            dispatch(adminApproveHostelRequest(approve_data))
        }
    } else {
        if(window.confirm('Confirm Not Approve Hostel')) {
            dispatch(adminApproveHostelRequest(approve_data))
        }
    }
    
  }

  const onClickDelete = (hostelId) => {
    if(window.confirm('Confirm Delete Hostel')) {
      dispatch(deleteHostel(hostelId))
    }
  }

  const show_all_hostel = all_hostel_list
    .sort((x,y) => {return (x.admin_approve === y.admin_approve)? 0 : y.admin_approve? -1 : 1})
    .map((hostel) => {
        return (
        <tr className="pointTR" >
                <th onClick={() => history.push(`/hostel_detail/${hostel._id}`)} scope="row">{hostel._id}</th>
                <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)}>{hostel.name}</td>
                <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)}>{hostel.status}</td>
                <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)}>{hostel.owner}</td>

                {hostel.admin_approve
                ?
                <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)} style={{color: 'blue'}}>{`${hostel.admin_approve}`}</td>
                :
                <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)} style={{color: 'red'}}>{`${hostel.admin_approve}`}</td>
                }

                <td>
                    {hostel.admin_approve
                    ?
                    <button onClick={() => onClickApprove(false, hostel._id)} type="button" class="btn btn-secondary" style={{marginRight:10}}>
                        Not Approve
                    </button>
                    :
                    <button onClick={() => onClickApprove(true, hostel._id)} type="button" class="btn btn-success" style={{marginRight:10}}>
                        Approve
                    </button>
                    }
                    
                    
                    <button onClick={() => onClickDelete(hostel._id)} type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Delete
                    </button>
                </td>
        </tr>
        )
  })

  if(loading) {
      return (
          <div>
              Loading
          </div>
      )
  }

  
  return(
    <div className="content">
      <div className="Header">
        <h1>Admin Page</h1>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Hostel ID</th>
            <th scope="col">Hostel Name</th>
            <th scope="col">Status</th>
            <th scope="col">Owner</th>
            <th scope="col">Approve</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {show_all_hostel}
        </tbody>
      </table>
    </div>
   )
  }


export default Admin
import React, {useEffect, useState} from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useHistory} from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {getOwnerUserHostel, deleteHostel, setHostelStatus} from '../redux/actions/dataAction'

// Compoent
import EditModal from '../component/hostel/EditModal'
import AddModal from '../component/hostel/AddModal'

/**
* @author
* @function MyHostel
**/

const MyHostel = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [defaultEditData, setDefaultEditData] = useState({
    admin_approve: false,
    detail: "This is a ghost hotel !!",
    image: "https://image.freepik.com/free-vector/house-building-vector-icon-illustration_138676-208.jpg",
    location: {latitude: 46.766666, longitude: 23.583332},
    name: "Transylvania",
    owner: "pae",
    price: 3000,
    status: "unavailable",
    __v: 0,
    _id: "604692cb6928fe400c00586a"
  });

  const own_hostel = useSelector(state => state.data.own_hostel)
  const loading = useSelector(state => state.data.loading)

  const dispatch = useDispatch()

  dayjs.extend(relativeTime);

  const history = useHistory()

  useEffect(() => {
    dispatch(getOwnerUserHostel())
  }, [])

  const onClickDelete = (hostelId) => {
      if(window.confirm('Confirm Delete Hostel')) {
        dispatch(deleteHostel(hostelId))
      }
  }

  const onClickSetStatus = (hostelId, status) => {
    if(window.confirm(`Confirm change status to  "${status}"`)) {
      dispatch(setHostelStatus(hostelId, status))
    }
  }
  
  const openAddModal = () => {
    setShowAddModal(prev => !prev);
  };

  const openEditModal = (data) => {
    setDefaultEditData(data)
    setShowEditModal(prev => !prev);
  }

  const show_own_hostel = own_hostel.map((hostel) => {
    return (
      <tr className="pointTR" >
            <th onClick={() => history.push(`/hostel_detail/${hostel._id}`)} scope="row">{hostel._id}</th>
            <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)}>{hostel.name}</td>
            <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)}>{hostel.status === 'available' ? <span style={{color: 'blue'}}>open</span> : <span style={{color: 'red'}}>close</span> }</td>
            {hostel.admin_approve
            ?
            <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)} style={{color: 'blue'}}>{`${hostel.admin_approve}`}</td>
            :
            <td onClick={() => history.push(`/hostel_detail/${hostel._id}`)} style={{color: 'red'}}>{`${hostel.admin_approve}`}</td>
            }
            
            <td>
                {hostel.status === 'available'
                ?
                <button type="button" onClick={() => onClickSetStatus(hostel._id, 'unavailable')} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{marginRight:10}}>
                    Close
                </button>
                :
                <button type="button" onClick={() => onClickSetStatus(hostel._id, 'available')} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{marginRight:10}}>
                    Open
                </button>
                }

                
                <button onClick={() => onClickDelete(hostel._id)} type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete
                </button>
                <button onClick={() => openEditModal(hostel)} type="button" class="btn btn-warning" style={{marginLeft:10}}>Edit</button>
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
      <AddModal showModal={showAddModal} setShowModal={setShowAddModal} />
      <EditModal defaultData={defaultEditData} showModal={showEditModal} setShowModal={setShowEditModal} />
      
      <div className="TabHeader">
        <h1>My Hostel List</h1>
      </div>
      
      {/* <Button onClick={openAddModal}>Add hostel</Button> */}
      <button id="myBtn" class="btn btn-success" onClick={openAddModal} style={{float:'right', marginRight: '50px'}}>Add Hostel</button>
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
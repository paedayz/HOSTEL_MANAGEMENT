import React, {useEffect} from 'react'

// Redux
import {useDispatch, useSelector} from 'react-redux'
import {getAllAvailableHostelList} from '../redux/actions/dataAction'

// Component
import HostelCardShow from '../component/hostel/hostelCardShow'

/**
* @author Pdayz
* @function Home
**/

const Home = (props) => {
  const dispatch = useDispatch()

  const available_hostel_list = useSelector(state => state.data.available_hostels)
  
  useEffect(() => {
    dispatch(getAllAvailableHostelList())
    // eslint-disable-next-line
  },[])

  const mapAvailableHostel = available_hostel_list.map((hostel) => {
    return (
      <div class="col-sm-4">
        <HostelCardShow {...hostel} />
      </div>
    )
  })

  return(
    <div className="content">
      <h1>Homepage</h1>
      <div class="container">
        <div class="row">
          {mapAvailableHostel}
        </div>
      </div>
    </div>
   )
  }


export default Home
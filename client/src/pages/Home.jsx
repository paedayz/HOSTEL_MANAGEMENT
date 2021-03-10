import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

// Redux
import {useDispatch, useSelector} from 'react-redux'
import {getAllAvailableHostelList, searchAPI} from '../redux/actions/dataAction'

// Component
import HostelCardShow from '../component/hostel/hostelCardShow'

/**
* @author Pdayz
* @function Home
**/

const Home = (props) => {
  const [search_term, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const available_hostel_list = useSelector(state => state.data.available_hostels)
  const search_data = useSelector(state => state.data.search_data)

  console.log(search_data)
  
  useEffect(() => {
    dispatch(getAllAvailableHostelList())
    if(search_term) {
      dispatch(searchAPI(search_term))
    }
    
    // eslint-disable-next-line
  },[search_term])
  
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
      <SearchBox>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">@</span>
          <input value={search_term} onChange={(e) => setSearchTerm(e.target.value)} type="text" class="form-control" placeholder="search" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>
      </SearchBox>
      
      <div class="container">
        <div class="row">
          {search_term === '' ? mapAvailableHostel : search_data ? search_data.map((hostel) => {
        return (
          <div class="col-sm-4">
            <HostelCardShow {...hostel} />
          </div>
        )
      }) : <div>loading</div>}
        </div>
      </div>
    </div>
   )
  }

const SearchBox = styled.div`
  max-width: 300px;
`


export default Home
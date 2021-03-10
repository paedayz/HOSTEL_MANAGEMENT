import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

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
          <SearchIcon>
            <span class="input-group-text" id="addon-wrapping">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </span>
          </SearchIcon>
          <input value={search_term} onChange={(e) => setSearchTerm(e.target.value)} type="text" class="form-control" placeholder="Search" aria-label="Username" aria-describedby="addon-wrapping"/>
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
  position: absolute;
  left: 82%;
  
`

const SearchIcon = styled.div`

`


export default Home
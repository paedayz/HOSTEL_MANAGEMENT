import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

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
  const [filter_star, setFilter_star] = useState(0)
  const [filter_sort, setFilter_sort] = useState('Star')
  const [price_rate_max, setPrice_rate_max] = useState(null)
  const [price_rate_min, setPrice_rate_min] = useState(null)
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

  // .sort((x, y) => {return parseInt(y.hostel_rating, 10) - parseInt(x.hostel_rating, 10)})

  const sortData = (sort_by, data) => {
    let return_data
    if(sort_by === 'Star') {
      return_data = data.sort((x, y) => {return parseInt(y.hostel_rating, 10) - parseInt(x.hostel_rating, 10)})
    } else if(sort_by === 'Price') {
      return_data = data.sort((x, y) => {return y.price - x.price})
    }

    return return_data
  }

  const showAvailableHostel = () => {
    if(search_term === '') {
      let sort_data = sortData(filter_sort, available_hostel_list)

      let final_data = sort_data

      if(price_rate_max && price_rate_min && parseInt(price_rate_max, 10) > parseInt(price_rate_min, 10)) {
        final_data = sort_data.filter((hostel) => {return hostel.price <= price_rate_max && hostel.price >= price_rate_min})
      }

      return (
        <>
          {
            final_data.map((hostel) => {
              return (
                <div class="col-sm-4">
                  <HostelCardShow {...hostel} />
                </div>
              )
            })
          }
        </>
      )
      
    } else if(search_data) {
      let sort_data = sortData(filter_sort, search_data)
      return(
        <>
          {
            sort_data.map((hostel) => {
              return (
                <div class="col-sm-4">
                  <HostelCardShow {...hostel} />
                </div>
              )
            })
          }
        </>
      )
      
    } else {
      return (
        <div>Loading</div>
      )
    }
    
  }

  const resetPriceRate = () => {
    setPrice_rate_min(0)
    setPrice_rate_max(0)
  }

  return(
    <div className="content">
      <div className="Header">
        <h1 style={{fontSize:'80px'}}>AGODEN</h1>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="container">
        <div className="row gx-5 justify-content-start">

          <div class="col-sm-9">
            <div class="row">
              {showAvailableHostel()}
            </div>
          </div>

          <div class="col-sm-3" >
            <h2>filter</h2>

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

            <FormGroup>
              Sort by
              
              <div class="form-check">
                <input class="form-check-input" type="radio" checked={filter_sort==='Star' ? true : false} onClick={() => setFilter_sort('Star')}/>
                <label class="form-check-label" for="flexRadioDefault1">
                  Star
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" checked={filter_sort==='Price' ? true : false} onClick={() => setFilter_sort('Price')}/>
                <label class="form-check-label" for="flexRadioDefault2">
                  Price
                </label>
              </div>
            </FormGroup>
                
            <FormGroup>
              Price rate
              <div class="input-group" style={{marginBottom:'10px'}}>
                <span class="input-group-text">min / max</span>
                <input type="number" aria-label="First name" class="form-control" value={price_rate_min} onChange={(e) => setPrice_rate_min(e.target.value)}/>
                <input type="number" aria-label="Last name" class="form-control" value={price_rate_max} onChange={(e) => setPrice_rate_max(e.target.value)}/>
              </div>
              <button type="button" class="btn btn-outline-primary" onClick={() => resetPriceRate()}>reset</button>
            </FormGroup>

            <FormGroup>
              <div>
                Star rate
              </div>
              
              <div class="input-group" style={{marginBottom:'10px'}}>
                <StarRatings
                  rating={filter_star}
                  starRatedColor="#ECD700"
                  numberOfStars={5}
                  starHoverColor="#ECD700"
                  changeRating={(newRating) => setFilter_star(newRating)}
                  starDimension="40px"
                />
              </div>
              <button type="button" class="btn btn-outline-primary" onClick={() => setFilter_star(0)}>reset</button>
            </FormGroup>

          </div>

        </div>
        
      </div>
    </div>
   )
  }

const SearchBox = styled.div`
  
`

const FormGroup = styled.div`
 margin-top: 40px;
 text-align: left;
`

const SearchIcon = styled.div`

`


export default Home
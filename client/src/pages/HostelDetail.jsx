import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

// Redux
import {useDispatch, useSelector} from 'react-redux'
import {getHostelDetail} from '../redux/actions/dataAction'

/**
* @author
* @function HostelDetail
**/

const HostelDetail = (props) => {
    const loading = useSelector(state => state.data.loading)
    const single_hostel_detail = useSelector(state => state.data.single_hostel_detail)
    // eslint-disable-next-line
    const {location, status, image, name, price, detail, owner} = single_hostel_detail

    const {hostelId} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHostelDetail(hostelId))
        // eslint-disable-next-line
    },[])

    if(!loading) {
        return(
            <div className="content">{name}</div>
           )
    } else {
        return(
            <div>loading</div>
           )
    }
  
  }


export default HostelDetail
import React from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

/**
* @author
* @function HostelCardShow
**/

const HostelCardShow = (props) => {
    const history = useHistory()
  return(
    <div class="card">
        {/* eslint-disable-next-line */}
        <img src={`${props.image}`} class="card-img-top" alt="image"/>
        <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">{props.detail}</p>
            <SecondDetail>
                <div>owner: {props.owner}</div>
                <div>Price: {props.price} Baht/Day</div>
            </SecondDetail>
            {/* eslint-disable-next-line */}
            <a onClick={() => history.push(`/hostel_detail/${props._id}`)} class="btn btn-primary">View Detail</a>
        </div>
    </div>
   )
}

const SecondDetail = styled.div`
    text-align: left;
    margin-bottom: 20px;
`


export default HostelCardShow
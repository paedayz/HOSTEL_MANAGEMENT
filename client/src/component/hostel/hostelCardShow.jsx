import React from 'react'
import styled from 'styled-components'

/**
* @author
* @function HostelCardShow
**/

const HostelCardShow = (props) => {
  return(
    <div class="card">
        <img src={`${props.image}`} class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <p class="card-text">{props.detail}</p>
            <SecondDetail>
                <div>owner: {props.owner}</div>
                <div>Price: {props.price} Baht/Day</div>
            </SecondDetail>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
   )
}

const SecondDetail = styled.div`
    text-align: left;
    margin-bottom: 20px;
`


export default HostelCardShow
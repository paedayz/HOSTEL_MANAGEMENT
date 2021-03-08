import React from 'react'

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
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
   )
  }


export default HostelCardShow
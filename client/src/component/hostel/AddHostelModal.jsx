import React, {useState} from 'react'

// Redux
import {useDispatch} from 'react-redux'
import {addHostel} from '../../redux/actions/dataAction'

/**
* @author
* @function Modal
**/

const Modal = (props) => {
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [price, setPrice] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const dispatch = useDispatch()

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    if(btn){
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    if(span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }
    
    var add = document.getElementById("addSubmit");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal || (event.target == add && name && detail && price && latitude && longitude)) {
            modal.style.display = "none";
            setName('')
            setDetail('')
            setPrice('')
            setLatitude('')
            setLongitude('')
        }
    }

    


    const onClickSumbit = () => {
        const add_data = {
            name,
            detail,
            price,
            latitude,
            longitude
        }

        if(name && detail && price && latitude && longitude) dispatch(addHostel(add_data))
        else window.alert('Have some data missing !')

        setName('')
        setDetail('')
        setPrice('')
        setLatitude('')
        setLongitude('')
    }

  return(
    <div className="addHostelModal">
        <button id="myBtn" class="btn btn-success">{props.word}</button>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Hostel name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Hostel detail</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Price per day</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Location latitude</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Location longitude</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                    </div>
                    <button id="addSubmit" class="btn btn-success addHostelSubmit" onClick={() => onClickSumbit()}>Submit</button>
            </div>
        </div>
    </div>
   )
  }


export default Modal
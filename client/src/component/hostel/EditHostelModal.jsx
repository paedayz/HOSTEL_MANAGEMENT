import React, {useState} from 'react'

// Redux
import {useDispatch} from 'react-redux'
import {addHostel} from '../../redux/actions/dataAction'

/**
* @author
* @function EditHostelModal
**/

const EditHostelModal = (props) => {
    const [name, setName] = useState(props.name)
    const [detail, setDetail] = useState(props.detail)
    const [price, setPrice] = useState(props.price)
    const [latitude, setLatitude] = useState(props.latitude)
    const [longitude, setLongitude] = useState(props.longitude)

    const dispatch = useDispatch()

    // Get the modal
    var editModal = document.getElementById("myEditModal");

    // Get the button that opens the modal
    var editBtn = document.getElementById("myEditBtn");

    // Get the <span> element that closes the modal
    var editSpan = document.getElementsByClassName("editClose")[0];

    // When the user clicks the button, open the editModal 
    if(editBtn){
        editBtn.onclick = function() {
            editModal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), editClose the modal
    if(editSpan) {
        editSpan.onclick = function() {
            editModal.style.display = "none";
        }
    }
    
    var edit = document.getElementById("editSubmit");

    // When the user clicks anywhere outside of the modal, editClose it
    window.onclick = function(event) {
        if (event.target == editModal || (event.target == edit && name && detail && price && latitude && longitude)) {
            editModal.style.display = "none";
            setName('')
            setDetail('')
            setPrice('')
            setLatitude('')
            setLongitude('')
        }
    }

    


    const onClickSumbit = () => {
        const edit_data = {
            name,
            detail,
            price,
            latitude,
            longitude
        }

        if(name && detail && price && latitude && longitude) dispatch(addHostel(edit_data))
        else window.alert('Have some data missing !')

        setName('')
        setDetail('')
        setPrice('')
        setLatitude('')
        setLongitude('')
    }

  return(
    <div className="addHostelModal">
        <button id="myEditBtn" class="btn btn-warning">Edit</button>
        <div id="myEditModal" class="modal">
            <div class="modal-content">
                <span class="editClose">&times;</span>
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
                    <button id="editSubmit" class="btn btn-success addHostelSubmit" onClick={() => onClickSumbit()}>Submit</button>
            </div>
        </div>
    </div>
   )
  }


export default EditHostelModal
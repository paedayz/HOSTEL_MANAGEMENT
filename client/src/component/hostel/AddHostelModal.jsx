import React from 'react'

/**
* @author
* @function Modal
**/

const Modal = (props) => {
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

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

  return(
    <div className="addHostelModal">
        <button id="myBtn" class="btn btn-success">{props.word}</button>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Hostel name</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Hostel detail</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Price per day</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Location latitude</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Location latitude</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1"/>
                    </div>
            </div>
        </div>
    </div>
   )
  }


export default Modal
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import axios from 'axios'

// Redux
import {useDispatch} from 'react-redux'
import {addHostel} from '../../redux/actions/dataAction'

const Modal = ({ showModal, setShowModal }) => {
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [price, setPrice] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [image, setImage] = useState('')

    // const formData = new FormData()

    const dispatch = useDispatch()
    const modalRef = useRef();

    const animation = useSpring({
      config: {
        duration: 250
      },
      opacity: showModal ? 1 : 0,
      transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };

    const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showModal) {
          setShowModal(false);
          console.log('I pressed');
        }
      },
      [setShowModal, showModal]
    );

    useEffect(
      () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
      },
      [keyPress]
    );

    const onClickSumbit = () => {
      const add_data = {
          name,
          detail,
          price,
          latitude,
          longitude,
          image
      }
      setShowModal(false)
      if(name && detail && price && latitude && longitude) dispatch(addHostel(add_data))
      else window.alert('Have some data missing !')

      setName('')
      setDetail('')
      setPrice('')
      setLatitude('')
      setLongitude('')
  }

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                  <div class="mb-3">
                        <Label for="exampleFormControlInput1" class="form-label" style={{marginTop:'30px'}}>Hostel name</Label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Hostel detail</Label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Price per day</Label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Location latitude</Label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Location longitude</Label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Image (URL)</Label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <button id="addSubmit" class="btn btn-success addHostelSubmit" onClick={() => onClickSumbit()}>Submit</button>
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Label = styled.label`
  float: left;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 650px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  width: 700px;
  margin-left: 50px;
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;


export default Modal
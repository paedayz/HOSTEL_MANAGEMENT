import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

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
    const [tagArray, setTagArray] = useState([])
    const [tagBuffer, setTagBuffer] = useState('')

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

    const mapTagArray = tagArray && tagArray.map((tag, index) => {
      return (
        <Tag>
          <CloseIcon onClick={() => onClickDeleteTag(index)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </CloseIcon>
          {tag}
        </Tag>
      )
    })

    const onClickDeleteTag = (index) => {
      let new_tag_array = tagArray.filter((tag, tag_index) => {return tag_index !== index})
      setTagArray(new_tag_array)
    }

    const onClickAddTag = () => {
      setTagArray(oldArray => [...oldArray, tagBuffer])
      setTagBuffer('')
    }

    const onClickSumbit = () => {
      const add_data = {
          name,
          detail,
          price,
          latitude,
          longitude,
          image,
          tag: tagArray
      }
      
      if(name && detail && price && latitude && longitude) {
        dispatch(addHostel(add_data))
        setShowModal(false)
        setName('')
        setDetail('')
        setPrice('')
        setLatitude('')
        setLongitude('')
        setTagBuffer('')
        setTagArray([])
      }
      else window.alert('Have some data missing !')

  }

  const onChangeAddPrice = (e) => {
    console.log(e.target.value)
    if(e.target.value >= 0) {
      setPrice(e.target.value)
    }
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
                        <input type="text" class="form-control" id="nameExample" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Hostel detail</Label>
                        <textarea class="form-control" id="detailExample" rows="3" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Price per day</Label>
                        <input type="number" class="form-control" id="priceExample" value={price} onChange={(e) => onChangeAddPrice(e)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Location latitude</Label>
                        <input type="number" class="form-control" id="latExample" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Location longitude</Label>
                        <input type="number" class="form-control" id="longExample" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <Label for="exampleFormControlTextarea1" class="form-label">Image (URL)</Label>
                        <input type="text" class="form-control" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div class="mb-3" style={{marginTop: '40px'}}>
                        <Label for="exampleFormControlTextarea1" class="form-label" style={{display:'inherit', float:'left', marginTop:'3px'}}>Tag</Label>
                        <TagInputBox>
                          <input type="text" class="form-control" placeholder='e.g. sea, mountain, resort' id="tagExample" value={tagBuffer} onChange={(e) => setTagBuffer(e.target.value)}/>
                          <button onClick={() => onClickAddTag()} class="input-group-text" id="addon-wrapping">Add</button>
                        </TagInputBox>
                        
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    {mapTagArray}
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

const CloseIcon = styled.svg`
  margin-right: 5px;
`

const Tag = styled.div`
  background-color: #D8D8D8;
  margin-right: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
`

const TagInputBox = styled.div`
  display: flex;
  flex-direction: row;
`

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
  height: 750px;
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
  .addHostelSubmit{
    margin-top:10px;
  }
`;


export default Modal
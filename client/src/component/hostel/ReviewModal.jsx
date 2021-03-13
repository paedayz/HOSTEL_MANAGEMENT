import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings'

// Redux
import {useDispatch} from 'react-redux'
import {ratingHostel} from '../../redux/actions/dataAction'

const Modal = ({ showModal, setShowModal, booking_id, hostel_id }) => {
  const [rating, setRating] = useState(0)

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

    const onClickSubmit = () => {
      const rating_data = {
        rating,
        booking_id,
        hostel_id
      }

      dispatch(ratingHostel(rating_data))
      setRating(0)
      setShowModal(false)
    }

    const onClickCancel = () => {
      setShowModal(false)
      setRating(0)
    }

  return (
    <>
      {showModal ? (
        <div>
          <Background>
          </Background>
          <animated.div style={animation} onClick={closeModal} ref={modalRef}>
              <ModalWrapper showModal={showModal}>
                <ModalContent>
                  <br/>
                  <br/>
                  <br/>
                  <h3>Give we some STAR</h3>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ECD700"
                    numberOfStars={5}
                    starHoverColor="#ECD700"
                    changeRating={(newRating) => setRating(newRating)}
                    name='rating'
                  />
                  <br/>
                  <div style={{marginTop:'50px'}}>
                    <button onClick={() => onClickSubmit()} id="addSubmit" class="btn btn-success addHostelSubmit">Submit</button>
                    <button onClick={() => onClickCancel()} id="addSubmit" class="btn btn-success addHostelSubmit">Cancel</button>
                  </div>
                  </ModalContent>
              </ModalWrapper>
            </animated.div>
        </div>
        
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(222, 222, 222, 0.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 350px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  border-radius: 10px;
  position: absolute;
  left: 25%;
  top: 350px;
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
    margin-right: 15px;
  }
`;


export default Modal
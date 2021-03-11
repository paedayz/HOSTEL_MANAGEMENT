import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings'

// Redux
import {useDispatch} from 'react-redux'
import {ratingHostel} from '../../redux/actions/dataAction'

const Modal = ({ showModal, setShowModal, message }) => {
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

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <br/>
                <br/>
                <br/>
                <h3>{message}</h3>
                <div style={{marginTop:'50px'}}>
                  <button onClick={() => setShowModal(false)} id="addSubmit" class="btn btn-success addHostelSubmit">Ok</button>
                </div>
                </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

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
  height: 350px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
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
    margin-right: 15px;
  }
`;


export default Modal
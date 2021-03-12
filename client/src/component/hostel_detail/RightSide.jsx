import React from 'react'
import styled from 'styled-components'

// Component
import HostelMap from '../hostel/HostelMap'

/**
* @author
* @function RightSide
**/

const RightSide = ({image, detail, location}) => {
  return(
    <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
                <Image src={`${image}`} alt="image" />

                <Description>
                  <b>Description:</b> {detail}
                </Description>
              </div>
              <div style={{ textAlign: "left", marginTop: "40px" }}>
                <h2>Locations : </h2>
              </div>
              <HostelMap
                latitude={location.latitude}
                longitude={location.longitude}
              />
    </div>
   )
  }

  const Image = styled.img`
  max-width: 700px;
  max-height: 500px;
  min-width: 500px;
  min-height: 300px;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  float: left;
`;

const Description = styled.div`
  text-align: left;
  margin-top: 20px;
  width: 82%;
`;

export default RightSide
import React from 'react'
import styled from 'styled-components'

/**
* @author
* @function Owner_detail
**/

const Owner_detail = ({owner_data}) => {
  return(
    <div>
        <h4>Owner Detail</h4>
                <OwnerDataWraper>
                  <OwnerImage src={owner_data.image} />
                  <OwnerDescription>
                    <div>
                      <b>Username : </b>
                      {owner_data.username}
                    </div>
                    <div>
                      <b>Name : </b>
                      {owner_data.first_name} {owner_data.last_name}
                    </div>
                    <div>
                      <b>Email : </b>
                      {owner_data.email}
                    </div>
                    <div>
                      <b>Phone : </b>
                      {owner_data.phone}
                    </div>
                  </OwnerDescription>
                </OwnerDataWraper>
                <br />
    </div>
   )
  }

const OwnerDescription = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const OwnerImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

const OwnerDataWraper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
`;


export default Owner_detail
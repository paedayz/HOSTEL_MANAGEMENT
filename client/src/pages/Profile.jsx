import React, {useState} from 'react'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {editProfile} from '../redux/actions/userAction'
import {CLEAR_ERRORS} from '../redux/types'

/**
* @author
* @function Auth
**/

const Auth = (props) => {
    const oldFirst_name = useSelector(state => state.user.credentials.first_name)
    const oldLast_name = useSelector(state => state.user.credentials.last_name)
    const oldDate_of_birth = useSelector(state => state.user.credentials.date_of_birth)
    const oldImage = useSelector(state => state.user.credentials.image)
    const oldPhone = useSelector(state => state.user.credentials.phone)

    const [first_name, setFirstname] = useState(oldFirst_name)
    const [last_name, setLastname] = useState(oldLast_name)
    const [date_of_birth, setDate_of_birth] = useState(oldDate_of_birth)
    const [image, setImage] = useState(oldImage)
    const [phone, setPhone] = useState(oldPhone)

    
    
    const error = useSelector(state => state.user.error)

    const dispatch = useDispatch()

    const onSubmitEdit = (e) => {
        e.preventDefault()
        if(first_name 
            && last_name 
            && date_of_birth
            && image
            && phone
        ) {
            let flag = 0
            let edit_profile_data = {
                first_name,
                last_name,
                date_of_birth,
                image,
                phone
            }

            if(flag === 0) {
                dispatch(editProfile(edit_profile_data))
            }

        } else {
            dispatch({type:'SET_ERRORS',payload:'Some data are missing'})
        }
        
    }

    return(
        <div className="box">
            <h1>Edit Profile</h1>
            <div className="editProfile" >
                <div className="input-group" style={{marginBottom: '40px'}}>
                    <span className="input-group-text">First and last name <span style={{color:'red'}}>*</span></span>
                    <input type="text" aria-label="First name" className="form-control" value={first_name} onChange={e => setFirstname(e.target.value)}/>
                    <input type="text" aria-label="Last name" className="form-control" value={last_name} onChange={e => setLastname(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Phone Number <span style={{color:'red'}}>*</span></label>
                    <input type="number" className="form-control editInput" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Image (URL) <span style={{color:'red'}}>*</span></label>
                    <input type="text" className="form-control editInput" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label >Date of birth <span style={{color:'red'}}>*</span></label>
                    <input className="form-control editInput" type="date" id="example-date-input" value={date_of_birth.toString().split('T')[0]} onChange={e => setDate_of_birth(e.target.value)}/>
                </div>
                <input type="submit" className="btn" value="EDIT" onClick={(e) => onSubmitEdit(e)}/>
                {error && <div className="textError">{error}</div>}
                </div>
        </div>
    )
}




export default Auth
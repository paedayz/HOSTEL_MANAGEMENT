import React, {useState} from 'react'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {login, register} from '../redux/actions/userAction'
import {CLEAR_ERRORS} from '../redux/types'

/**
* @author
* @function Auth
**/

const Auth = (props) => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [date_of_birth, setDate_of_birth] = useState('')
    const [email_username, setEmail_username] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    
    const error = useSelector(state => state.user.error)

    const dispatch = useDispatch()

    const changeMode = (e) => {
        dispatch({type:CLEAR_ERRORS})
        setEmail('')
        setPassword('')
        setUsername('')
        setFirstname('')
        setLastname('')
        setDate_of_birth('')
        setEmail_username('')
        setConfirmPassword('')
        setPhone('')
        setIsLogin(!isLogin)
        
        e.preventDefault()
        
    }

    const onSubmitLogin = (e) => {
        let login_data = {
            email_username: email_username,
            password: password
        }
        e.preventDefault()
        dispatch(login(login_data))
    }

    const onSubmitRegister = (e) => {
        e.preventDefault()
        if(username 
            && email 
            && password 
            && confirmPassword 
            && username 
            && first_name 
            && last_name 
            && date_of_birth
            && image
            && phone
        ) {
            let flag = 0
            let register_data = {
                email,
                password,
                username,
                first_name,
                last_name,
                date_of_birth,
                image,
                phone
            }
            if(password !== confirmPassword) {
                flag = 1
                dispatch({type:'SET_ERRORS',payload:'Password not match'})
            }

            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                // some code
            } else {
                flag = 1
                dispatch({type:'SET_ERRORS',payload:'Wrong Email format'})
            }

            if(flag === 0) {
                dispatch(register(register_data))
            }

        } else {
            dispatch({type:'SET_ERRORS',payload:'Some data are missing'})
        }
        
    }

    if(isLogin) {
        return(
            <form className="box" >
                <h1>Login</h1>
                <div className="loginForm">
                <input 
                    type="text" 
                    className="" 
                    placeholder="Username or Email" 
                    defaultValue={email_username} 
                    value={email_username}
                    onChange={e => setEmail_username(e.target.value)}
                />
                <input 
                    type="password" 
                    className="" 
                    placeholder="Password" 
                    defaultValue={password}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="submit" 
                    className="btn" 
                    value="Login"
                    onClick={(e) => onSubmitLogin(e)}
                />
                {error && <div className="textError">{error}</div>}
                <input 
                    type="submit" 
                    className="changeModeBtn" 
                    onClick={(e) => changeMode(e)} 
                    value="Change to Register"/>
                </div>
                
            </form>
        )
    } else {
        return(
            <div className="box">
                <h1>Register</h1>
                <div className="regisForm">
                    <div class="input-group" style={{marginBottom: '20px'}}>
                        <span class="input-group-text">First and last name <span style={{color:'red'}}>*</span></span>
                        <input type="text" aria-label="First name" class="form-control" value={first_name} onChange={e => setFirstname(e.target.value)}/>
                        <input type="text" aria-label="Last name" class="form-control"value={last_name} onChange={e => setLastname(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Phone Number <span style={{color:'red'}}>*</span></label>
                        <input type="number" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Username <span style={{color:'red'}}>*</span></label>
                        <input type="text" class="form-control" id="exampleUsername" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Email <span style={{color:'red'}}>*</span></label>
                        <input type="email" class="form-control" id="exampleEmail" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Password <span style={{color:'red'}}>*</span></label>
                        <input type="password" class="form-control" id="examplePassword" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label">Confirm Password <span style={{color:'red'}}>*</span></label>
                        <input type="password" class="form-control" id="exampleConfirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Image (URL) <span style={{color:'red'}}>*</span></label>
                        <input type="text" class="form-control" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label >Date of birth <span style={{color:'red'}}>*</span></label>
                        <input class="form-control" type="date" id="example-date-input" value={date_of_birth} onChange={e => setDate_of_birth(e.target.value)}/>
                    </div>
                    <input type="submit" className="btn" value="Register" onClick={(e) => onSubmitRegister(e)}/>
                    {error && <div className="textError">{error}</div>}
                    <input type="submit" className="changeModeBtn" onClick={(e) => changeMode(e)} value="Change to Login"/>
                    </div>
                
                

                
            </div>
        )
    }
}




export default Auth
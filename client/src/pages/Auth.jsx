import React, {useState} from 'react'

// redux
import {useSelector, useDispatch} from 'react-redux'
import {login, register} from '../redux/actions/userAction'

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
    
    const error = useSelector(state => state.user.error)

    const dispatch = useDispatch()

    const changeMode = (e) => {
        setEmail('')
        setPassword('')
        setUsername('')
        setFirstname('')
        setLastname('')
        setDate_of_birth('')
        setEmail_username('')
        setConfirmPassword('')
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
        if(password == confirmPassword) {
            let register_data = {
                email,
                password,
                username,
                first_name,
                last_name,
                date_of_birth
            }
            dispatch(register(register_data))
        } else {
            dispatch({type:'SET_ERRORS',payload:'Password not match'})
        }
        
    }

    if(isLogin) {
        return(
            <form className="box" >
                <h1>Login</h1>
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
            </form>
        )
    } else {
        return(
            <div className="box">
                <h1>Register</h1>
                <input 
                    type="text" 
                    placeholder="Email" 
                    defaultValue={email}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    defaultValue={password}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    defaultValue={confirmPassword}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Username" 
                    defaultValue={username}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="First name" 
                    defaultValue={first_name}
                    value={first_name}
                    onChange={e => setFirstname(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Last name" 
                    defaultValue={last_name}
                    value={last_name}
                    onChange={e => setLastname(e.target.value)}
                />
                
                <label >Birthday</label>
                <input type="date" value={date_of_birth} onChange={(e) => setDate_of_birth(e.target.value)}/>

                <input type="submit" className="btn" value="Register" onClick={(e) => onSubmitRegister(e)}/>
                {error && <div className="textError">{error}</div>}
                <input type="submit" className="changeModeBtn" onClick={(e) => setIsLogin(e)} value="Change to Login"/>
            </div>
        )
    }
}




export default Auth
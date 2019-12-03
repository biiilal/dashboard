import React, {useState} from 'react';
import {
    useHistory,
    useLocation
  } from "react-router-dom";
import styled from 'styled-components'
import '../style.css'

const Animation = styled.img`
  height: 300px;
`
const LoginButton = styled.button`
    height: 30px;
    border-style: none; 
    width: 150px; 
    background-color: black; 
    color: white
`
function LoginForm() {
    
    const [animation1, setAnimation1] = useState('http://octodex.github.com/images/daftpunktocat-thomas.gif')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [animationClassName, setAnimationClassName] = useState(null)
    let location = useLocation()
    let history = useHistory()
    let { from } = location.state || { from: { pathname: "/" } }
    let login = () => {
        if(username === "admin@sygo.com" && password === "D!n!Ch@n") {
            setAnimation1('https://thumbs.gfycat.com/WhisperedSomeIberianmidwifetoad-size_restricted.gif')
            setTimeout(()=>{
                localStorage.setItem('auth','admin')
                history.replace(from);
            }, '2000')
        }
        else {
            setUsername('')
            setPassword('')
        }   
    };
    
    return (
        <div className="loginForm">
            <div className="container" style={{padding: '5rem', display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '50%', height: '50vh', display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center'}}>
                        <div style={{display: 'flex'}}>
                            <h2 style={{color: 'rgba(141, 151, 156, 0.91)'}}>We are <span style={{color: 'black'}}>Synergo</span> </h2>
                        </div>
                        <p style={{fontWeight: 'bold', color: 'rgba(141, 151, 156, 0.91)'}}>Welcome Back, Please login to your account</p>
                        <div id="containerInput" style={{display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                            <input 
                              value={username}
                              type="email"
                              onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
                              placeholder="username"
                              style={{height: '25px', padding: '5px'}}/>
                            <input
                              value={password}
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="password"
                              style={{height: '25px', padding: '5px'}}/>
                        </div>
                        <LoginButton 
                          onClick={login}
                        > Login </LoginButton>
                    </div>
                </div>
                <div style={{width: '50%', height: '50vh'}}>
                    <Animation
                        className={animationClassName}
                        src={animation1}
                    /> 
                </div>
            </div>
        </div>
    );
  }
  
  export default LoginForm;
//   https://thumbs.gfycat.com/WhisperedSomeIberianmidwifetoad-size_restricted.gif
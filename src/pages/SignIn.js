import React, { useState } from 'react'
import '../styles/SignIn.css'
import {Link} from 'react-router-dom'
import {TextField, Button} from '@mui/material'
import {signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
export default function Main() {

  const [login,setLogin] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState()
  const loginIn = async () =>{
    try{
      const user = await signInWithEmailAndPassword(auth,login,password) 
      setError('')   
    } catch (error) {
      console.log(error)
      setError('Неверный логин или пароль')
    }
  }
  const KeyPressEnter = (event) =>{
    if(event.key === 'Enter'){
      loginIn()
    }
  }
  return (
    <div className='Main'>
      <form>
      <div className ='Enter'>
      <TextField id="standard-basic" label="Введите почту" variant="standard" placeholder='Почта' onKeyPress={KeyPressEnter} onChange ={(e)=>{setLogin(e.target.value)}} ></TextField>
      <br/>
      <TextField id="standard-basic" label="Введите пароль" variant="standard"input type='password' placeholder='Пароль' onKeyPress={KeyPressEnter} onChange = {(e)=>{setPassword(e.target.value)}}></TextField>
      <br/>
      <div className='SignInButton'><Button variant="contained" color="success"  onClick={loginIn}>Войти</Button></div>
      <br/>
      <p style={{color:'red',fontSize:'14px'}}>{error}</p>
      <Link to ='/Registration'>У меня нет аккаунта</Link>
      </div>
      </form>
    </div>
  )
}

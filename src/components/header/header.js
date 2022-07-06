import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import {auth} from '../firebase/firebase-config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {AppBar,Grid,Toolbar,IconButton,Button,Avatar} from '@mui/material'
import './header.css'
export default function Header() {
  const [user,setUser] = useState({})
  const [hideButtonExit,setHideButtonExit] = useState(true)
  const [hideUserLoginAndRegister,setHideUserLoginAndRegister] = useState(false)
  const logout = async () => {
    await signOut(auth);
  }
  
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
    if(user){
      setHideButtonExit(false)
     } else{
      setHideButtonExit(true)
     }
     if(!user){
      setHideUserLoginAndRegister(false)
     } else{
      setHideUserLoginAndRegister(true)
     }
  });
 
  return (
  <div className='header'>
  <AppBar position="static">
  <Toolbar variant="dense">
  <Grid container style={{justifyContent:'center'}}>
  <IconButton  edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>{auth.currentUser ? <Button><Link style={{textDecoration:'none',color:'white'}} to ='/Chat' >Чат</Link></Button>  : <Button><Link style={{textDecoration:'none',color:'white'}} to = '/Registration' >Регистрация</Link></Button>}</IconButton> 
  <IconButton  edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>{auth.currentUser ? <Button variant='contained' ><Link style={{textDecoration:'none',color:'white'}} to ='/PersonalArea' >Личный кабинет</Link></Button> : <Button><Link style={{textDecoration:'none',color:'white'}} to ='/SignIn' >Вход</Link></Button> }</IconButton>
  </Grid>
  <label hidden={hideButtonExit}>Привет {user?.displayName}</label>
  <div>{auth.currentUser ? <Avatar src={user?.photoURL} style={{marginRight:'14px'}}/> : ''} </div>
  {auth.currentUser ? <Button variant='contained' color='error' style={{color:'white',borderRadius:'44px',fontSize:'12px'}} hidden={hideButtonExit} onClick={logout} >Выйти</Button> : ''}
  </Toolbar>
</AppBar>
    </div>
  )
}

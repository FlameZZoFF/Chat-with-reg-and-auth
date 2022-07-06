import React, { useEffect, useState } from 'react'
import './RegistrationForm.css'
import {createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import {auth} from '../firebase/firebase-config'
import { Link } from 'react-router-dom'
import { Button,TextField,Checkbox } from '@mui/material'
import { updateProfile } from 'firebase/auth'
export default function RegistrationForm() {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [repetPassword,setRepetPassword] = useState()
    const [emailDirty,setEmailDirty] = useState(false)
    const [passwordDirty,setPasswordDirty] = useState(false)
    const [emailError,setEmailError] = useState('Email не может быть пустым')
    const [passwordError,setPasswordError] = useState('Пароль не может быть пустым')
    const [repetPasswordError,setRepetPasswordError] = useState('Поле не должно быть пустым')
    const [repetPasswordDirty,setRepetPasswordDirty] = useState(false)
    const [validForm,setValidForm] = useState(false)
    const [name,setName] = useState()
    const [surname,setSurname] = useState()
    const [patronymic,setPatronymic] = useState()
    const [nameError,setNameError] = useState('Имя обязательно для регистрации')
    const [surnameError,setSurnameError] = useState('Фамилия обязательная для регистрации')
    const [nameDirty,setNameDirty] = useState(false)
    const [surnameDirty,setSurnameDirty] = useState(false)
    const [blockRepeatPass,setBlockRepeatPass] = useState(true)
    const [login,setLogin] = useState()
    const [loginDirty,setLoginDirty] = useState (false)
    const [loginError,setLoginError] = useState ('Введите Ник')
    const [checkboxError,setCheckBoxError] = useState('Чека нет')
    const [succesRegister,setSuccesRegister] = useState('')
    const register = async () => {
        try {
        const user = await createUserWithEmailAndPassword(auth, email , password)
        updateProfile(auth.currentUser,{
            displayName:login
        })
        signOut(auth)
        setSuccesRegister('Аккаунт успешно создан')
        } catch (error) {
            setEmailError('Данная почта уже зарегестрирована')
            setSuccesRegister('')
        }

    }
    const EmailHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный Email')
        if(!e.target.value){
            setEmailError('Email не должен быть пустым')
        }
        } else{
            setEmailError('')
        }
    }
    const PassRepeatChecker = (e) =>{
        setRepetPassword(e.target.value)
        if (e.target.value !== password){
            setRepetPasswordError('Пароли не совпадают')
        }
           else{
            setRepetPasswordError('')
        }

    }

    useEffect(()=>{
    if (emailError || passwordError || repetPasswordError || nameError || surnameError || loginError || checkboxError) {
        setValidForm(false)
    }else {
        setValidForm(true)
    }
    },[emailError,passwordError,repetPasswordError,nameError,surnameError,loginError,checkboxError])


    const PasswordHandler = (e) =>{
        setPassword(e.target.value)
        if(e.target.value.length < 6 || e.target.value.length > 20){
            setBlockRepeatPass(true)
            setPasswordError('Пароль не должен быть длиннее 13 и меньше 3 символов')
        if(!e.target.value){
            setPasswordError('Пароль не должен быть пустым')
        }
        
        } else{
            setPasswordError('')
            setBlockRepeatPass(false)
        }
    }
    const BluerHandler = (e) =>{
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'repeatpassword':
                setRepetPasswordDirty(true)
                break
            case 'FirstName':
                setNameDirty(true)
                break
            case 'surname':
                setSurnameDirty(true)
                break
            case 'login':
                setLoginDirty(true)
        }
    }
    const NameHandler = (e) =>{
        setName(e.target.value)
        if(e.target.value.length > 15){
           setNameError('Имя слишком длинное')
        } 
        
        if(!e.target.value){
            setSurnameError('Имя обязательна для регистрации')
        }
        
        else{
            setNameError('')
        }
    }
    const SurnameHandler = (e) =>{
        setSurname(e.target.value)
        if(e.target.value.length > 15){
            setSurnameError('Фамилия слишком длинная')
    }   
         if(!e.target.value){
            setSurnameError('Фамилия обязательная для регистрации')
         }
     else{
        setSurnameError('')
    }

    
}
    const PatronymicHandler = (e) =>{
        setPatronymic(e.target.value)
    }
    
    const LoginHandler = (e) =>{
        setLogin(e.target.value)
        if(e.target.value.length < 6 && e.target.value.length > 14){
            setLoginError('Ник должен содержать минимум 6 и максимум 14 символов')
        }
        if(!e.target.value){
            setLoginError('Введите Ник')
        }else {
            setLoginError('')
        }
    }
        
   const checkboxcheck = (e) =>{
    if(e.target.checked == true){
     setCheckBoxError('')
    } else{
        setCheckBoxError('Чек не нажат')
    }
   }
  return (
    <div className='RegMain'>
       <div className='RegMainInputs'>
      {(nameDirty && nameError) && <div style={{color:'red',fontSize:'15px'}}>{nameError}</div>}
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Введите имя' name='FirstName' placeholder='Введите имя' onChange={NameHandler} onBlur={BluerHandler} value={name}></TextField><label style={{color:'red'}}>*</label>
      <br/>
      
      {(surnameDirty && surnameError) && <div style={{color:'red',fontSize:'15px'}}>{surnameError}</div>}
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Введите фамилию' name='surname' placeholder='Введите фамилию' onChange={SurnameHandler} onBlur={BluerHandler} value={surname}></TextField><label style={{color:'red'}}>*</label>
      <br/>
     
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Введите отчество' placeholder='Введите отчество' onChange={PatronymicHandler} value={patronymic}></TextField>
      <br/>

      {(loginDirty && loginError) && <div style={{color:'red',fontSize:'15px'}}>{loginError}</div>}
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Введите Ник' name ='login' placeholder='Введите никнейм' onChange={LoginHandler} onBlur={BluerHandler} value={login}></TextField><label style={{color:'red'}}>*</label>
      <br/>

      {(emailDirty && emailError) && <div style={{color:'red',fontSize:'15px'}}>{emailError}</div>}
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Введите email' onChange={EmailHandler} value={email} onBlur={BluerHandler} name='email' placeholder='Введите Email'></TextField><label style={{color:'red'}}>*</label>
      <br/>

      {(passwordDirty && passwordError) && <div style={{color:'red',fontSize:'15px'}}>{passwordError}</div>}
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Введите пароль' onChange={PasswordHandler} value={password} onBlur={BluerHandler} name='password' type ='password' ></TextField><label style={{color:'red'}}>*</label>
      <br/>

      {(repetPasswordDirty && repetPasswordError) && <div style={{color:'red',fontSize:'15px'}}>{repetPasswordError}</div>}
      <TextField style={{marginTop:15}} id='outlined-basic' variant='outlined' label='Повторите пароль' disabled={blockRepeatPass} value={repetPassword} name='repeatpassword' placeholder='Повторите пароль' type='password' onChange={PassRepeatChecker} onBlur={BluerHandler}></TextField><label style={{color:'red'}}>*</label>
      <br/>
       <Checkbox onChange={checkboxcheck}></Checkbox><label style={{fontSize:'15px'}}>Я согласен ...</label>
       <br/>
      <Button variant='contained' onClick={register} disabled={!validForm} type='submit'>Регистрация</Button>
      <p style={{color:'green'}}>{succesRegister}</p>
      <br/>
      <Link to='/SignIn'>У меня уже есть аккаунт</Link>
      <h1 ></h1>
      </div> 
    </div>
  )
}

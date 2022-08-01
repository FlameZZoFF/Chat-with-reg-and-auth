import React, { useEffect, useState } from 'react'
import '../styles/RegistrationForm.css'
import {createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import {auth} from '../firebase/firebase-config'
import { Button,TextField,Checkbox} from '@mui/material'
import { updateProfile } from 'firebase/auth'
import { Formik } from 'formik'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
export default function RegistrationForm() {
   const [succesRegister,setSuccesRegister] = useState()
   const validationsSchema = yup.object().shape({
    nick: yup.string().typeError('Должно быть строкой').required('Введите Ник'),
    email: yup.string().email('Введите верный email').required('Введите email'),
    password:yup.string().typeError('Должно быть строкой').matches(
        "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$",
        "Должен содержать 8 символов, один символ верхнего регистра, один символ нижнего регистра, одну цифру и один символ специального регистра."
      ).required('Введите пароль'),
    repeatpassword:yup.string().oneOf([yup.ref('password')],'Пароли не совподают').required('Повторите пароль'),
    checkbox:yup.boolean().oneOf([true],'Нажмите чек')
   })
  
  return (
    <div className='RegMain'>
       <Formik
       initialValues={{
        nick:'',
        email:'',
        password:'',
        repeatpassword:'',
        checkbox:false,
        RegCheck:''
       }}
       validateOnBlur
       onSubmit={async (values)=>{ 
        try {
        await createUserWithEmailAndPassword(auth, values.email , values.password)
        updateProfile(auth.currentUser,{
            displayName:values.nick
        })
        values.RegCheck = <p style ={{color:'green'}}>Аккаунт создан</p>
        signOut(auth)
        } catch (error) {
            values.RegCheck = <p style ={{color:'red'}}>Данная почта уже зарегестрирована</p>
        } }
    }

       validationSchema={validationsSchema}
       
    >
        {({values,errors,touched,handleChange,handleBlur,isValid,handleSubmit,dirty})=>(
        <div>
            <TextField id="outlined-basic" label="Никнейм" variant="outlined" placeholder='Ник' type ={'text'} name={'nick'} onChange={handleChange} onBlur={handleBlur} value={values.nick}/>
            <br/>
            {touched.nick && errors.nick && <p style={{fontSize:'14px',color:'red'}}>{errors.nick}</p>}
            <br/>
            <TextField id="outlined-basic" label="Почта" variant="outlined" placeholder='Email' type ={'text'} name={'email'} onChange={handleChange} onBlur={handleBlur} value={values.email}/>
            <br/>
            {touched.email && errors.email && <p style={{fontSize:'14px',color:'red'}}>{errors.email}</p>}
            <br/>
            <TextField id="outlined-basic" label="Пароль" variant="outlined" placeholder='Пароль' type ={'password'} name={'password'} onChange={handleChange} onBlur={handleBlur} value={values.password}/>
            <br/>
            {touched.password && errors.password && <p style={{fontSize:'14px',color:'red'}}>{errors.password}</p>}
            <br/>
            <TextField id="outlined-basic" label="Повторите пароль" variant="outlined" placeholder='Повторите пароль' type ={'password'} name={'repeatpassword'} onChange={handleChange} onBlur={handleBlur} value={values.repeatpassword}/>
            <br/>
            {touched.repeatpassword && errors.repeatpassword && <p style={{fontSize:'14px',color:'red'}}>{errors.repeatpassword}</p>}
            <br/>
            <Checkbox type='checkbox' name='checkbox' checked={values.checkbox} onChange={handleChange} onBlur={handleBlur}></Checkbox><label>Я согласен...</label>
            <br/>
            {touched.checkbox && errors.checkbox && <p style={{fontSize:'14px',color:'red'}}>{errors.checkbox}</p>}
            <Button variant="contained" disabled={!isValid && !dirty} onClick={handleSubmit} type={'submit'} >Регистрация</Button>
            {values.RegCheck}
            <br/> 
            <Link to='/SignIn'><p>У меня уже есть аккаунт</p></Link>
        </div>
        )}


       </Formik>
    </div>
  )
}

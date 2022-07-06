import React, { useEffect, useRef, useState } from 'react'
import {Button, Container,Grid,TextField,Avatar,SendIcon} from '@mui/material'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, firestore} from '../firebase/firebase-config'
import { collection,addDoc,orderBy,query} from 'firebase/firestore'
import Loader from '../Loader/loader'
import firebase from 'firebase/compat/app'
import './chat.css'
export default function Chat() {
    const dummy = useRef()
    const [MessageText,setMessageText] = useState()
    const [user] = useAuthState(auth)
    const DB = collection(firestore,'messages')
    const DBQuery = query(DB, orderBy('createdAt'))
    const [messages,loading] = useCollectionData(
      DBQuery
    )
    const MessageValue = (e) =>{
        setMessageText(e.target.value)
    }

    useEffect(()=>{
      dummy.current?.scrollIntoView({behavior:'smooth'})
    })
    

    const SendMessage = async () =>{
      if(MessageText){
       await addDoc(collection(firestore,'messages'),{
        uid: user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL,
        text:MessageText,
        createdAt:firebase.firestore.FieldValue.serverTimestamp()
      })
      setMessageText('')
      dummy.current.scrollIntoView({behavior:'smooth'})
    }
  }
    if(loading){
      return <Loader/>
    }
    const KeyPressEnter = (event) =>{
      if(event.key === 'Enter'){
        SendMessage()
      }
    }
  return  (
    <Container>
        <Grid container justify={'center'} style={{marginTop:'25px'}} >
        <div className='chatwindow' style={{width: '80%',height:'70vh',border: '1px solid black',overflowY:'auto'}}>
          {messages.map(message=>
            <Container >
              <Grid display={'flex'} style={{marginTop:'13px'}}>
                <Avatar src={message.photoURL} style={{border:user?.uid === message?.uid ? '2px solid green' : ''}}/>
                <div style={{margin:'3px',fontSize:'20px',color:'black'}}>{message.displayName}</div>
              </Grid>
              <div >{message.text}</div>
            </Container>
          )}
          <div ref={dummy} ></div>
        </div>
        <Grid container direction={'column'} alignItems={'flex-end'} style ={{width:'80%',marginTop:'15px'}}>
                <TextField style={{width:'100%'}} onKeyPress={KeyPressEnter} variant='outlined' onChange={MessageValue} value={MessageText}></TextField>
                <Button  onClick={SendMessage} >Отправить</Button>
            </Grid>
        </Grid>
    </Container>
  )
}


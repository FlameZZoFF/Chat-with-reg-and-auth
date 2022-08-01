import React, { useEffect, useMemo, useRef, useState } from 'react'
import {Button, Container,Grid,TextField,Avatar,SendIcon} from '@mui/material'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, firestore ,storage} from '../firebase/firebase-config'
import { collection,addDoc,orderBy,query} from 'firebase/firestore'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import Smile from '../components/images/smile.svg'
import Loader from '../components/Loader/loader'
import firebase from 'firebase/compat/app'
import Messrepeat from '../components/UI/MessRepeat/messrepeat'
import '../styles/chat.css'
import Picker from 'emoji-picker-react'
import Close from '../components/images/close.svg'
import photoLoad from '../components/images/photoLoad.svg'
import {v4} from 'uuid'
export default function Chat() {
    const dummy = useRef()
    const InputValue = useRef()
    const fileRef = useRef()
    const [MessageText,setMessageText] = useState()
    const [user] = useAuthState(auth)
    const DB = collection(firestore,'messages')
    const DBQuery = query(DB, orderBy('createdAt'))
    const [repeat,setRepeat] = useState() 
    const [showPicker,setShowPicker] = useState(false)
    const [sendPhoto,setSendPhoto] = useState()
    const [url,setUrl] = useState()
    const [imgLoader,setImgLoader] = useState()
    const [drag,setDrag] = useState(false)
    const [messages,loading] = useCollectionData(
      DBQuery
    )

  
    useEffect(()=>{
      dummy.current?.scrollIntoView({behavior:'smooth'})
    },)
    
    const onEmojiClick = (event, emojiObject) => {
      InputValue.current.value = InputValue.current.value + emojiObject.emoji
      
      
    };
    useEffect(()=>{
      const  get = async () => {
        if(sendPhoto){
        setImgLoader('Идет загрузка...')
        const imageRef = ref(storage, `images/chat/${sendPhoto + v4()}`)
        await uploadBytes(imageRef, sendPhoto)
         .then(()=>{
             getDownloadURL(imageRef)
             .then((url)=>{
                 setUrl(url)
                 InputValue.current.value = InputValue.current.value + ' '
                 setImgLoader(`${sendPhoto.name} загружено`)
                 console.log(sendPhoto.name)
             })
         })
      }
    }
      get()
    },[sendPhoto])

    const SendMessage = async () =>{
      if(InputValue.current.value){
        await addDoc(collection(firestore,'messages'),{
         rep:repeat ? repeat : '',
         uid: user.uid,
         displayName:user.displayName,
         photoURL:user.photoURL,
         text:InputValue.current.value,
         url:url ? url : '',
         createdAt:firebase.firestore.FieldValue.serverTimestamp()
       })
       InputValue.current.value = ''
       setRepeat('')
       setShowPicker(false)
       setImgLoader('')
       setUrl(null)
       console.log(sendPhoto)
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

    const repeatmessage =(e) =>{
      setRepeat(messages[e.target.id -1].displayName  + ":" + ' ' + messages[e.target.id -1].text)
      
    }
    const closeRepeat = () =>{
      setRepeat('')
    }

    const PhotoAdd = (e) =>{
      setSendPhoto(e.target.files[0])
      console.log(sendPhoto)
       }
      
       const dragStart = (e) =>{
        e.preventDefault()
        setDrag(true)
       }

       const dragLeave = (e) =>{
        e.preventDefault()
        setDrag(false)
       }

       const onDropHandler = (e) =>{
        e.preventDefault()
        setSendPhoto(e.dataTransfer.files[0])
        setDrag(false)
       }

       const closeFile = () =>{
        setUrl('')
        setSendPhoto('')
        setImgLoader('')
       }
  return  (
    <Container>
        <Grid container justify={'center'} style={{marginTop:'25px'}} >
        <div className='chatwindow' style={{width: '80%',height:'70vh',border: '1px solid black',overflowY:'auto'}}>
          {messages?.map((message,key)=>{
            return <Container >
              <Grid display={'flex'} style={{marginTop:'13px'}}>
                <Avatar src={message.photoURL} style={{border:user?.uid === message?.uid ? '2px solid green' : '2px solid black'}}/>
                <Messrepeat id={key=key + 1} repeatmessage={repeatmessage}/>
                <div style={{margin:'3px',fontSize:'20px',color:'black'}}>{message.displayName}</div>
              </Grid>
              <div style={{backgroundColor:'lightblue',width:'150px',opacity:'0.6'}}>{message?.rep}</div>
              <div >{message.text}</div>
              <img src = {message.url} style={{minWidth:'300px',maxWidth:'300px'}}></img>
            </Container>
})}
          <div ref={dummy} ></div>
        </div>
        <Grid container direction={'column'} alignItems={'flex-end'} style ={{width:'80%',marginTop:'15px'}}>
                 <div style={{backgroundColor:'lightblue'}}>
                  {repeat ? <div>{repeat} <img src={Close} onClick={closeRepeat} className='RepeatClose'></img></div> : ''}
                 </div>
                 <img style={{width:'30px',height:'30px',position:'absolute',marginLeft:'45px',marginTop:'20px',cursor:'pointer'}} src = {Smile} onClick={()=>setShowPicker(val => !val)}></img>
                 <input type='file' ref={fileRef} hidden accept="image/*" onChange={PhotoAdd}></input>
                 <img className='LoadImage' src={photoLoad} onClick={() => fileRef.current.click()}></img>
                 {imgLoader ? <div>{imgLoader} <img className='RepeatClose' onClick={closeFile} src={Close}></img></div> : ''}
                <input style={{border: drag ? '2px solid green' : ''}}  className='chatInput' onDragStart={e => dragStart(e)} onDragLeave = {e => dragLeave(e)} onDragOver={e => dragStart(e)} onDrop={e => onDropHandler(e)}  onKeyPress={KeyPressEnter} variant='outlined' ref={InputValue} ></input>
                {showPicker && <Picker pickerStyle={{width:'100%',height:'250px'}} onEmojiClick={onEmojiClick} />}
                <Button  onClick={SendMessage}>Отправить</Button>
            </Grid>
        </Grid>
    </Container>
  )
}


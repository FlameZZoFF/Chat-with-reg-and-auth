import React, { useState,useRef } from 'react'
import { auth,storage } from '../firebase/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Grid,Container,TextField,Button,Avatar } from '@mui/material'
import { updateProfile } from 'firebase/auth'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
export default function PersonalArea() {
    const [user] = useAuthState(auth)
    const [emailChange,setEmailChange] = useState(user?.email)
    const [nickName,setNickName] = useState(user?.displayName)
    const [avatar,setAvatar] = useState(null)
    const [disableText,setDisableText] = useState(true)
    const [hideSaveButton,setHideSaveButton] = useState(true)
    const [hidePhotoButton,setHidePhotoButton] = useState(true)
    const [url,setUrl] = useState(null)
    const inputfile = useRef()
    const refClick = () =>{
        inputfile.current.click()
    }
    const ChangeProfile = () =>{
        setHideSaveButton(false)
        setDisableText(false)
    }
    const SaveProfileChange = async () =>{
        await updateProfile(auth.currentUser,{
            displayName:nickName,
            email:emailChange
        })
        setHideSaveButton(true)
        setDisableText(true)
    }
    const LoadPhotoFile = async (e) =>{
        if(e.target.files[0]) { 
          setAvatar(e.target.files[0]) 
          setHidePhotoButton(false)
        }
        
    }
    const PhotoSubmit = async () =>{
    const imageRef = ref(storage, `images/${avatar.name + v4()}`)
       await uploadBytes(imageRef, avatar)
        .then(()=>{
            getDownloadURL(imageRef)
            .then((url)=>{
                setUrl(url)
                updateProfile(auth.currentUser,{
                    photoURL:url
                    
                })
                setHidePhotoButton(true)
            })
        })

           
    }
  return (
    <Container>
    <Avatar src = {url ? url :user?.photoURL} style={{height:'111px',width:'111px',marginTop:'11px'}}></Avatar>
    <input ref ={inputfile} onChange={LoadPhotoFile} type='file' style={{display:'none'}} accept='/image'></input>
    <Button variant='contained' onClick={refClick} style={{marginTop:'13px'}}>Загрузить</Button>
    <Button onClick={PhotoSubmit} color='secondary' disabled={hidePhotoButton}>Подтвердить</Button>
    <Grid container direction={'column'}  justify={'center'} style={{margin:'40px'}}>
    <TextField id="outlined-name" label="Nickname" value={nickName} onChange={(e)=>setNickName(e.target.value)} disabled={disableText}></TextField>
    <br/>
    </Grid>
    <Button variant='contained' onClick={ChangeProfile} >Изменить профиль</Button>
    <Button color="secondary" onClick={SaveProfileChange} disabled={hideSaveButton} hidden={hideSaveButton}>Сохранить изменения</Button>
</Container>
  )
}

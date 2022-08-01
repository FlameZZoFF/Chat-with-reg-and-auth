import React from 'react'
import RepeatIcon from '../../images/chat-svgrepo-com.svg'
import styles from './messrepeat.module.css'
export default function Messrepeat({repeatmessage,id}) {
  return (
    <img src={RepeatIcon} className={styles.iconS} id={id} onClick={repeatmessage}>
        
    </img>
  )
}

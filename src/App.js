import React from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import Layout from './components/Routes/layout'
import RequireAuth from './components/Routes/RequireAuth'
import Chat from './components/chat/chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './components/firebase/firebase-config'
import Loader from './components/Loader/loader'
import PersonalArea from './components/personalArea/PersonalArea'
import IfAuth from './components/Routes/IfAuth'
export default function App() {
  const [user, loading , error] = useAuthState(auth)
  if (loading) {
    return <Loader/>
  }
  return (
    <div>
    <Routes>

        <Route path='/' element={<Layout />}>

        <Route path="/*" element={<Navigate to="/SignIn" />} />
        <Route path="/" element={<Navigate to="/SignIn" />} />
        <Route path ='/Registration' element={<RegistrationForm />} />
        <Route path ='/SignIn' element={<IfAuth><SignIn /></IfAuth>} />
        <Route path = '/Chat' element = {<RequireAuth> <Chat /> </RequireAuth>} />
        <Route path = '/PersonalArea' element = {<RequireAuth> <PersonalArea /> </RequireAuth>} />
        

        </Route>
    </Routes>
    </div>
  )
}

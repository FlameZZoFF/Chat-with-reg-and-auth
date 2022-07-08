import React from 'react'
import {Routes, Route ,Navigate} from 'react-router-dom'
import SignIn from './pages/SignIn'
import RegistrationForm from './pages/RegistrationForm'
import Layout from './Routes/layout'
import RequireAuth from './Routes/RequireAuth'
import Chat from './pages/chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase-config'
import Loader from './components/Loader/loader'
import PersonalArea from './pages/PersonalArea'
import IfAuth from './Routes/IfAuth'
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

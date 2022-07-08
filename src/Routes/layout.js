import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import Header from '../pages/header'


export default function Layout() {

  return (
    <div>
    <Header />
    <Outlet/>
    </div>
  )
}

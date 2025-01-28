import React from 'react'
import { MainTemplate } from './MainTemplate'
import { Order } from './Order'
import {  UserDashBoard } from './UserDash'

export const Home = () => {
  return (
    <>
    <UserDashBoard/>
    <MainTemplate/>
    <Order/>
    </>

  )
}

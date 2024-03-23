import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function RootLayout() {

  //  <Footer/>
  return (
    <div className='home'>
 
      <Header title='Libysys'/>

    <Outlet />
   </div>
  )
}

export default RootLayout;
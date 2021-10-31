import React, { useState } from 'react'
import Maps from '../components/Maps/Maps'
import NavbarComponent from '../components/Navbar/Navbar'
import SideBar from '../components/SideBar/SideBar'
import './styles.scss'

function HomePage(props) {
  const [inputValue, setInputValue] = useState('')

  const handleSetInputValue = (data) => {
    setInputValue(data)
  }

  return (
    <div className='wrapper'>
      {/* <div className='sidebar__container'> */}
      <SideBar />
      {/* </div> */}
      <div className='map'>
        <NavbarComponent className='navbar-component' handleSetInputValue={handleSetInputValue} />
        <Maps className='main-container' distance={inputValue} />
      </div>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage

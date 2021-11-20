import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Button, Collapse, Input, Nav, Navbar, NavbarToggler } from 'reactstrap'
import './styles.scss'
import { Navigate } from 'react-router-dom'

const NavbarComponent = (props) => {
  const { className, isSignedIn, handleIsSignedOut } = props
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    ReactTooltip.show(inputRef.current)
  }, [])

  // const [isSignedOut, setIsSignedOut] = useState(false)

  return (
    <>
      {!isSignedIn ? (
        <Navigate to='/login' />
      ) : (
        <div>
          <Navbar color='dark' dark expand='md' className={className}>
            <NavbarToggler onClick={function noRefCheck() {}} />
            <Collapse navbar>
              <Nav className='me-auto' navbar></Nav>
              <Button
                id='submit__button'
                onClick={() => {
                  localStorage.removeItem('token')
                  handleIsSignedOut()
                }}
              >
                Đăng xuất
              </Button>
            </Collapse>
          </Navbar>
        </div>
      )}
    </>
  )
}

export default NavbarComponent

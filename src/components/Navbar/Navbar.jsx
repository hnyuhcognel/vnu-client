import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import jwt_decode from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { Button, Collapse, Nav, Navbar } from 'reactstrap'
import './styles.scss'

const NavbarComponent = (props) => {
  const { className, isSignedIn, handleIsSignedOut } = props
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    ReactTooltip.show(inputRef.current)
  }, [])

  const token = localStorage.getItem('token')
  const tokenDecoded = jwt_decode(token)

  return (
    <>
      {!isSignedIn ? (
        <Navigate to='/login' />
      ) : (
        <div>
          <Navbar color='dark' dark expand='md' className={className}>
            {/* <NavbarToggler onClick={function noRefCheck() {}} /> */}
            <Collapse navbar>
              <Nav className='me-auto' navbar></Nav>
              <FontAwesomeIcon className='user-icon' icon={faUser} />
              <p className='display-username'>
                {tokenDecoded.ten} {tokenDecoded.ho}
              </p>
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

import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Introduction from '../../components/Introduction'
import SignInForm from '../../components/SignInForm'
import SignUpForm from '../../components/SignUpForm'
import './styles.scss'

function Authentication(props) {
  const signInInitialValues = {
    signInUsername: '',
    signInPassword: '',
  }

  const signUpInitialValues = {
    signUpUsername: '',
    signUpPassword: '',
    signUpHo: '',
    signUpTen: '',
  }

  const [isSignIn, setisSignIn] = useState(true)

  const handleSign = () => {
    setisSignIn(!isSignIn)
  }

  return (
    <div className='authentication'>
      <div className='main'>
        {/* <Introduction className='introduction' /> */}
        {isSignIn && <SignInForm initialValues={signInInitialValues} handleSign={handleSign} />}
        {!isSignIn && <SignUpForm initialValues={signUpInitialValues} handleSign={handleSign} />}
      </div>
      {/* <Footer className='footer' /> */}
    </div>
  )
}

export default Authentication

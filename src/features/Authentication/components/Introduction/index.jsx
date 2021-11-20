import React from 'react'
import './styles.scss'

export default function Introduction(props) {
  const { className } = props
  return (
    <div className={className}>
      <h1 className='logo'>fakebook</h1>
      <p className='title'>
        Fakebook giúp bạn kết nối và chia sẻ <br /> với mọi người trong cuộc sống của bạn.
      </p>
    </div>
  )
}

import React from 'react'
import './styles.scss'

export default function Footer(props) {
  const { className } = props
  return (
    <div className={className}>
      <div className='link'>
        <a href=''>Đăng ký</a>
        <a href=''>Đăng nhập</a>
        <a href=''>Quên mật khẩu?</a>
      </div>
      <p>Fakebook by Le Ngoc Huynh © 2022</p>
    </div>
  )
}

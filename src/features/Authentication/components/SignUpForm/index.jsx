import axios from 'axios'
import { FastField, Form, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import InputField from '../../../../custom-fields/InputField'
import './styles.scss'

export default function SignUnForm(props) {
  const { initialValues, handleSign } = props

  // Yup.addMethod(Yup.string, 'checkUsername', function (msg, existed) {
  //   return this.test('checkUsername', msg, function (value) {
  //     const { path, createError } = this
  //     if (existed) {
  //       return createError({
  //         path,
  //         message: msg,
  //       })
  //     }
  //     return true
  //   })
  // })

  const validationSchema = Yup.object().shape({
    signUpHo: Yup.string(),
    signUpTen: Yup.string().required('Vui lòng nhập tên'),
    signUpUsername: Yup.string()
      .matches(/([A-Z]|[a-z]|\.|\_)\w+/g, {
        message: 'Tên tài khoản chỉ có thể chứa các ký tự: a-z, A-Z, _, .',
      })
      .min(5, 'Tên tài khoản phải có ít nhất 5 ký tự!')
      .max(32, 'Tên tài khoản chỉ có thể có tối đa 32 ký tự!')
      .required('Vui lòng nhập tên tài khoản!'),
    signUpPassword: Yup.string()
      .matches(/[.^\S]/g, { message: 'Mật khẩu không được có khoảng trắng' })
      .min(5, 'Mật khẩu phải có ít nhất 5 ký tự!')
      .max(32, 'Mật khẩu chỉ có thể có tối đa 32 ký tự!')
      .required('Vui lòng nhập mật khẩu!'),
    signUpPasswordConfirmation: Yup.string()
      .oneOf([Yup.ref('signUpPassword'), null], 'Mật khẩu không trùng khớp!')
      .required('Vui lòng xác nhận mật khẩu!'),
  })

  const handleSignUpSubmit = async (values, actions) => {
    try {
      const result = await axios.post('http://localhost:8000/taikhoan/dangky', {
        username: values.signUpUsername,
        password: values.signUpPassword,
        ho: values.signUpHo,
        ten: values.signUpTen,
      })
      alert('Đăng ký thành công!')
      handleSign()
      console.log(result)
    } catch (error) {
      if (error.response.data.fail == 'tai khoan da ton tai') {
        actions.setErrors({ signUpUsername: 'Tên tài khoản đã tồn tại!' })
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignUpSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps
        return (
          <Form className='sign-up__form'>
            <div className='full-name'>
              <FastField name='signUpHo' component={InputField} placeholder='Họ' />
              <FastField name='signUpTen' component={InputField} placeholder='Tên' />
            </div>
            <FastField name='signUpUsername' component={InputField} placeholder='Tên tài khoản' />
            <FastField
              name='signUpPassword'
              component={InputField}
              type='password'
              placeholder='Mật khẩu'
            />
            <FastField
              name='signUpPasswordConfirmation'
              component={InputField}
              type='password'
              placeholder='Nhập lại mật khẩu'
            />
            <button className='myBtn' type='submit'>
              Đăng ký
            </button>
            <div className='line'></div>
            <div className='signInBtnContainer'>
              <p>Nếu bạn đã có tài khoản:</p>
              <button className='myBtn signInBtn' onClick={handleSign}>
                Đăng nhập
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

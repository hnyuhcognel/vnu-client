import { FastField, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import InputField from '../../../../custom-fields/InputField'
import './styles.scss'

export default function SignInForm(props) {
  const { initialValues, handleSign } = props
  const validationSchema = Yup.object().shape({
    signInUsername: Yup.string()
      .matches(/([A-Z]|[a-z]|\.|\_)\w+/g, {
        message: 'Tên tài khoản chỉ có thể chứa các ký tự: a-z, A-Z, _, .',
      })
      .min(5, 'Tên tài khoản phải có ít nhất 5 ký tự!')
      .max(32, 'Tên tài khoản chỉ có thể có tối đa 32 ký tự!')
      .required('Vui lòng nhập tên tài khoản!'),
    signInPassword: Yup.string()
      .matches(/[.^\S]/g, { message: 'Mật khẩu không được có khoảng trắng' })
      .min(5, 'Mật khẩu phải có ít nhất 5 ký tự!')
      .max(32, 'Mật khẩu chỉ có thể có tối đa 32 ký tự!')
      .required('Vui lòng nhập mật khẩu!'),
  })
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps
        return (
          <Form className='sign-in__form'>
            <FastField name='signInUsername' component={InputField} placeholder='Tên tài khoản' />
            <FastField
              name='signInPassword'
              component={InputField}
              type='password'
              placeholder='Mật khẩu'
            />
            <button className='myBtn' color='primary'>
              Đăng nhập
            </button>
            {/* <a href=''>Quên mật khẩu?</a> */}
            <div className='line'></div>
            <p>Bạn chưa có tài khoản?</p>
            <button className='myBtn' color='success' onClick={handleSign}>
              Tạo tài khoản mới
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

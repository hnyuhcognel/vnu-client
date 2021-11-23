import { FastField, Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import InputField from '../../custom-fields/InputField'
import SelectField from '../../custom-fields/SelectField'
import './styles.scss'
import * as Yup from 'yup'

function AddSchoolModal(props) {
  const { show, onHide, groupList } = props

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

  const initialValues = {
    school_name: '',
    lat: '',
    lng: '',
    description: '',
    group_id: '',
    group_name: '',
  }

  const [isNewGroup, setIsNewGroup] = useState(false)

  const handleSetNewGroup = (bool) => {
    setIsNewGroup(bool)
  }

  return (
    <div>
      <Modal isOpen={show} toggle={onHide} centered>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          // onSubmit={handleAddSchoolSubmit}
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps
            return (
              <Form className='add-school--form'>
                <FastField name='school_name' component={InputField} placeholder='Tên trường' />
                <div className='coordinates'>
                  <FastField name='lat' component={InputField} placeholder='Vĩ độ' />
                  <FastField name='lng' component={InputField} placeholder='Kinh độ' />
                </div>
                <FastField name='description' component={InputField} placeholder='Mô tả' />
                <FastField
                  className='group_id'
                  name='group_id'
                  component={SelectField}
                  placeholder='Id nhóm'
                  options={groupList}
                  handleSetNewGroup={handleSetNewGroup}
                />
                {isNewGroup && (
                  <FastField name='group_name' component={InputField} placeholder='Tên nhóm' />
                )}
                <div className='add-school__button'>
                  <Button className='add-school__button--add' type='submit'>
                    Thêm trường
                  </Button>
                  <Button className='add-school__button--cancel ' type='button' onClick={onHide}>
                    Hủy
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    </div>
  )
}

export default AddSchoolModal

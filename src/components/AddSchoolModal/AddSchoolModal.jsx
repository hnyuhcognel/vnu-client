import axios from 'axios'
import { FastField, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'reactstrap'
import * as Yup from 'yup'
import InputField from '../../custom-fields/InputField'
import SelectField from '../../custom-fields/SelectField'
import './styles.scss'

function AddSchoolModal(props) {
  const {
    show,
    onHide,
    groupList,
    handleJustAddSchool,
    handleSetIsAddingSchool,
    coordinatesMarker,
    handleJustAddGroup,
    schoolList,
    isEditingSchool,
    idSchoolEditing,
    handleSetIsEditingSchool,
  } = props

  const [editingSchoolTemp, setEditingSchoolTemp] = useState({
    tentruong: null,
    lat: null,
    long: null,
    mo_ta: null,
    id_nhom: null,
  })

  const editingSchool =
    schoolList && schoolList.find((school) => school.id_truong === idSchoolEditing)

  const validationSchema = Yup.object().shape({
    school_name: isEditingSchool
      ? Yup.string()
      : Yup.string().required('Vui lòng nhập tên trường!'),
    lat: isEditingSchool ? Yup.number() : Yup.number().required('Vui lòng nhập vĩ độ!'),
    lng: isEditingSchool ? Yup.number() : Yup.number().required('Vui lòng nhập kinh độ!'),
    description: isEditingSchool ? Yup.string() : Yup.string(),
    group_id: isEditingSchool ? Yup.number() : Yup.number(),
    group_name: isEditingSchool ? Yup.string() : Yup.string(),
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

  const handleAddSchoolSubmit = async (e, setErrors) => {
    e.preventDefault()
    let data = {
      ten_truong: e.target.school_name.value,
      coordinates: [parseFloat(e.target.lat.value), parseFloat(e.target.lng.value)],
      mo_ta: e.target.description.value === '' ? '' : e.target.description.value,
      id_nhom: e.target.group_id.value === '' ? '' : e.target.group_id.value,
      // group_name: e.target.group_name.value === '' ? '' : e.target.group_name.value,
    }
    if (e.target.group_id.value === 'khac') {
      await axios
        .post(
          'http://localhost:8000/nhom',
          { ten_nhom: e.target.group_name.value },
          { headers: { Authorization: localStorage.getItem('token') } },
        )
        .then((id_nhom) => {
          data = { ...data, id_nhom: id_nhom.data.id_nhom }
          handleJustAddGroup()
        })
    }

    try {
      await axios.post('http://localhost:8000/truong', JSON.stringify(data), {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      })
      handleJustAddSchool()
      onHide()
    } catch (error) {
      if (error.response.data.fail === 'khong nham trong dia phan VN') {
        alert('Tọa độ không thuộc Việt Nam!')
        // setErrors({
        //   lat: 'Tọa độ không thuộc Việt Nam!',
        //   lng: ' ',
        // })
      }
      if (error.response.data.fail === 'cần cung cấp tham số ten_truong và coordinates') {
        alert('Vui lòng nhập tên trường!')
        setErrors({
          school_name: 'Vui lòng nhập tên trường!',
        })
      }
    }
  }
  const handleEditSchoolSubmit = async (e, setErrors, id_truong) => {
    e.preventDefault()
    let data = {
      ten_truong: e.target.school_name.value,
      coordinates: [parseFloat(e.target.lat.value), parseFloat(e.target.lng.value)],
      mo_ta: e.target.description.value === '' ? '' : e.target.description.value,
      id_nhom: e.target.group_id.value === '' ? '' : e.target.group_id.value,
      // group_name: e.target.group_name.value === '' ? '' : e.target.group_name.value,
    }
    if (e.target.group_id.value === 'khac') {
      await axios
        .post(
          'http://localhost:8000/nhom',
          { ten_nhom: e.target.group_name.value },
          { headers: { Authorization: localStorage.getItem('token') } },
        )
        .then((id_nhom) => {
          data = { ...data, id_nhom: id_nhom.data.id_nhom }
          handleJustAddGroup()
        })
    }
    try {
      await axios.put(`http://localhost:8000/truong/${id_truong}`, JSON.stringify(data), {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      })
      handleJustAddSchool()
      onHide()
    } catch (error) {
      if (error.response.data.fail === 'khong nham trong dia phan VN') {
        alert('Tọa độ không thuộc Việt Nam!')
        // setErrors({
        //   lat: 'Tọa độ không thuộc Việt Nam!',
        //   lng: ' ',
        // })
      }
      // if (error.response.data.fail === 'cần cung cấp tham số ten_truong và coordinates') {
      //   alert('Vui lòng nhập tên trường!')
      //   setErrors({
      //     school_name: 'Vui lòng nhập tên trường!',
      //   })
      // }
    }
  }

  return (
    <div>
      <Modal
        isOpen={show}
        toggle={() => {
          onHide()
          handleSetIsAddingSchool(false)
          handleSetIsEditingSchool(false)
        }}
        centered
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {(formikProps) => {
            const { setErrors, values, errors, touched, isSubmitting } = formikProps
            return (
              <Form
                className='add-school--form'
                onSubmit={(e) => {
                  !isEditingSchool
                    ? handleAddSchoolSubmit(e, setErrors)
                    : handleEditSchoolSubmit(e, setErrors, editingSchool.id_truong)
                }}
              >
                <FastField
                  name='school_name'
                  component={InputField}
                  placeholder='Tên trường'
                  value={
                    isEditingSchool
                      ? editingSchoolTemp.tentruong
                        ? editingSchoolTemp.tentruong
                        : editingSchool.tentruong
                      : null
                  }
                  onInput={(e) =>
                    setEditingSchoolTemp({ ...editingSchoolTemp, tentruong: e.target.value })
                  }
                />
                <div className='coordinates'>
                  <FastField
                    name='lat'
                    component={InputField}
                    type='number'
                    placeholder='Vĩ độ(lat)'
                    disabled={isEditingSchool ? false : true}
                    // value={isEditingSchool ? editingSchool.lat : coordinatesMarker.lat}
                    value={
                      isEditingSchool
                        ? editingSchoolTemp.lat
                          ? editingSchoolTemp.lat
                          : editingSchool.lat
                        : coordinatesMarker.lat
                    }
                    onInput={(e) =>
                      setEditingSchoolTemp({ ...editingSchoolTemp, lat: e.target.value })
                    }
                  />
                  <FastField
                    name='lng'
                    component={InputField}
                    type='number'
                    placeholder='Kinh độ(lng)'
                    disabled={isEditingSchool ? false : true}
                    // value={isEditingSchool ? editingSchool.long : coordinatesMarker.lng}
                    value={
                      isEditingSchool
                        ? editingSchoolTemp.long
                          ? editingSchoolTemp.long
                          : editingSchool.long
                        : coordinatesMarker.lng
                    }
                    onInput={(e) =>
                      setEditingSchoolTemp({ ...editingSchoolTemp, long: e.target.value })
                    }
                  />
                </div>
                <FastField
                  name='description'
                  component={InputField}
                  placeholder='Mô tả'
                  // value={isEditingSchool ? editingSchool.mo_ta : null}
                  value={
                    isEditingSchool
                      ? editingSchoolTemp.mo_ta
                        ? editingSchoolTemp.mo_ta
                        : editingSchool.mo_ta
                      : null
                  }
                  onInput={(e) =>
                    setEditingSchoolTemp({ ...editingSchoolTemp, mo_ta: e.target.value })
                  }
                />
                <FastField
                  className='group_id'
                  name='group_id'
                  component={SelectField}
                  placeholder='Nhóm'
                  options={groupList}
                  handleSetNewGroup={handleSetNewGroup}
                  value={
                    isEditingSchool &&
                    (editingSchoolTemp.id_nhom ? editingSchoolTemp.id_nhom : editingSchool.id_nhom)
                  }
                  onChangeGroupId={(selected) =>
                    setEditingSchoolTemp({ ...editingSchoolTemp, id_nhom: selected.value })
                  }
                />
                {isNewGroup && (
                  <FastField name='group_name' component={InputField} placeholder='Tên nhóm' />
                )}
                <div className='add-school__button'>
                  {!isEditingSchool && (
                    <Button className='add-school__button--add' type='submit'>
                      Thêm trường
                    </Button>
                  )}
                  {isEditingSchool && (
                    <Button className='add-school__button--add' type='submit'>
                      Xác nhận
                    </Button>
                  )}
                  <Button
                    className='add-school__button--cancel '
                    onClick={() => {
                      onHide()
                      handleSetIsAddingSchool(false)
                      handleSetIsEditingSchool(false)
                    }}
                  >
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

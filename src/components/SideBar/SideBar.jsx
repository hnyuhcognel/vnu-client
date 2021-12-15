import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import jwtDecode from 'jwt-decode'
import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Button, Input } from 'reactstrap'
import './styles.scss'

function SideBar(props) {
  const {
    areaList,
    cityList,
    groupList,
    schoolList,
    handleAreaChange,
    handleCityChange,
    handleGroupChange,
    handleSchoolChange,
    areaValue,
    cityValue,
    groupValue,
    handleSearchSchool,
    isFindByDistance,
    handleFindByDistance,
    handleSetInputValue,
    isDrawing,
    handleSetIsAddingSchool,
    isAddingSchool,
  } = props

  const tokenDecoded = jwtDecode(localStorage.getItem('token'))

  return (
    <div className='school-search'>
      <p className='title'>Vietnamese's University</p>
      <Input id='area' name='area' type='select' bsSize='sm' onChange={handleAreaChange}>
        <option selected value=''>
          Tất cả miền
        </option>
        {areaList &&
          areaList.map((area, index) => (
            <option key={index} value={area.id_mien}>
              {area.ten_mien}
            </option>
          ))}
      </Input>
      <Input id='city' name='city' type='select' bsSize='sm' onChange={handleCityChange}>
        <option selected value=''>
          Tất cả tỉnh
        </option>
        {cityList &&
          (!areaValue || areaValue == 0) &&
          cityList.map((city, index) => (
            <option key={index} value={city.id_tinh}>
              {city.ten_tinh}
            </option>
          ))}
        {cityList &&
          areaValue &&
          cityList.map((city, index) => {
            if (city.id_mien == areaValue)
              return (
                <option key={index} value={city.id_tinh}>
                  {city.ten_tinh}
                </option>
              )
          })}
      </Input>
      <Input id='group' name='group' type='select' bsSize='sm' onChange={handleGroupChange}>
        <option selected value=''>
          Tất cả nhóm
        </option>
        {groupList &&
          groupList.map((group, index) => (
            <option key={index} value={group.id_nhom}>
              {group.ten_nhom}
            </option>
          ))}
      </Input>
      <Input id='school' name='school' type='select' bsSize='sm' onChange={handleSchoolChange}>
        <option selected value=''>
          Tất cả trường
        </option>
        {schoolList &&
          areaValue &&
          (!cityValue || cityValue == 0) &&
          (!groupValue || groupValue == 0) &&
          schoolList.map((school, index) => {
            if (school.id_mien == areaValue)
              return (
                <option key={index} value={school.id_truong}>
                  {school.tentruong}
                </option>
              )
          })}
        {schoolList &&
          cityValue &&
          groupValue &&
          schoolList.map((school, index) => {
            if (school.id_tinh == cityValue && school.id_nhom == groupValue)
              return (
                <option key={index} value={school.id_truong}>
                  {school.tentruong}
                </option>
              )
          })}
        {schoolList &&
          cityValue &&
          (!groupValue || groupValue == 0) &&
          schoolList.map((school, index) => {
            if (school.id_tinh == cityValue)
              return (
                <option key={index} value={school.id_truong}>
                  {school.tentruong}
                </option>
              )
          })}
        {schoolList &&
          (!cityValue || cityValue == 0) &&
          groupValue &&
          schoolList.map((school, index) => {
            if (school.id_nhom == groupValue)
              return (
                <option key={index} value={school.id_truong}>
                  {school.tentruong}
                </option>
              )
          })}
        {schoolList &&
          (!areaValue || areaValue == 0) &&
          (!cityValue || cityValue == 0) &&
          (!groupValue || groupValue == 0) &&
          schoolList.map((school, index) => (
            <option key={index} value={school.id_truong}>
              {school.tentruong}
            </option>
          ))}
      </Input>
      <Button id='submit__button' color='primary' size='' onClick={handleSearchSchool}>
        Tìm trường
      </Button>
      <hr />
      <div className='find-school-by-distance'>
        <ReactTooltip
          id='distance required'
          effect='solid'
          place='left'
          type='light'
          // backgroundColor='#fff'
          textColor='#333'
          // borderColor='blue'
          offset={{ top: -15 }}
        >
          Nhập vào khoảng cách(KM), <br /> sau đó nhấn vào 1 điểm trên bảng đồ <br /> để tìm những
          trường gần đó <br /> trong bán kính bạn vừa nhập
        </ReactTooltip>
        {isFindByDistance && (
          <Input
            id='distance'
            name='distance'
            data-tip
            data-for='distance required'
            bsSize='sm'
            type='number'
            placeholder='Bán kính cần đo (KM)'
            onInput={(e) => handleSetInputValue(e.target.value)}
          />
        )}
        {!isFindByDistance && (
          <Button
            id='find-school-by-distance__btn'
            onClick={() => {
              !isDrawing && handleFindByDistance(true)
              handleSetIsAddingSchool(false)
            }}
          >
            Tìm trường theo bán kính
          </Button>
        )}
        {isFindByDistance && (
          <Button id='submit__button' onClick={() => handleFindByDistance(false)}>
            Hủy
          </Button>
        )}
      </div>
      <hr />
      {tokenDecoded.role === 'admin' && !isAddingSchool && (
        <Button
          id='submit__button'
          className='toggle-modal--add-school'
          onClick={() => {
            // handleModalShow()
            handleFindByDistance(false)
            !isDrawing && handleSetIsAddingSchool(true)
            !isDrawing && alert('Vui lòng chọn tọa độ cần thêm (Chỉ nằm trên lãnh thổ Việt Nam)!')
          }}
        >
          Thêm trường
        </Button>
      )}
      {isAddingSchool && (
        <Button
          className='toggle-modal--cancel-add-school'
          id='submit__button'
          onClick={() => {
            handleSetIsAddingSchool(false)
          }}
        >
          Hủy thêm trường
        </Button>
      )}
    </div>
  )
}

SideBar.propTypes = {}

export default SideBar

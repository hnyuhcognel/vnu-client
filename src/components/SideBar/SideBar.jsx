// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import React, { useState } from 'react'
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
  } = props

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
    </div>
  )
}

SideBar.propTypes = {}

export default SideBar

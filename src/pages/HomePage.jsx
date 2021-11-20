import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Maps from '../components/Maps/Maps'
import NavbarComponent from '../components/Navbar/Navbar'
import SideBar from '../components/SideBar/SideBar'
import '../../node_modules/leaflet-draw/dist/leaflet.draw.css'
import './styles.scss'
import { Navigate } from 'react-router-dom'

function HomePage(props) {
  const { isSignedIn, handleIsSignedOut } = props
  const [inputValue, setInputValue] = useState('')

  const handleSetInputValue = (data) => {
    setInputValue(data)
  }

  const [areaData, setAreaData] = useState()
  const [cityData, setCityData] = useState()
  const [groupData, setGroupData] = useState()
  const [schoolData, setSchoolData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8000/mien')
      setAreaData(result.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8000/tinh')
      setCityData(result.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8000/nhom')
      setGroupData(result.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8000/truong`)
      setSchoolData(result.data)
    }
    fetchData()
  }, [])
  const areaList = areaData
  const cityList = cityData
  const groupList = groupData
  const schoolList = schoolData.data

  const [areaValue, setAreaValue] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [groupValue, setGroupValue] = useState('')
  const [schoolValue, setSchoolValue] = useState('')
  const [schoolListSearch, setSchoolListSearch] = useState()

  const handleAreaChange = (e) => {
    setAreaValue(e.target.value)
    console.log(areaValue)
  }
  const handleCityChange = (e) => {
    setCityValue(e.target.value)
  }
  const handleGroupChange = (e) => {
    setGroupValue(e.target.value)
  }
  const handleSchoolChange = (e) => {
    setSchoolValue(e.target.value)
  }

  const handleSearchSchool = () => {
    if (schoolValue) {
      setSchoolListSearch(schoolList.filter((school) => school.id_truong == schoolValue))
      return
    }

    if (!areaValue && !cityValue && !groupValue && !schoolValue) {
      setSchoolListSearch(schoolList)
      return
    }

    if (areaValue && !cityValue) {
      setSchoolListSearch(schoolList.filter((school) => school.id_mien == areaValue))
      return
    }

    if (cityValue && groupValue && !schoolValue) {
      setSchoolListSearch(
        schoolList.filter((school) => school.id_tinh == cityValue && school.id_nhom == groupValue),
      )
      return
    }
    if (cityValue && !groupValue && !schoolValue) {
      setSchoolListSearch(schoolList.filter((school) => school.id_tinh == cityValue))
      return
    }
    if (!cityValue && groupValue && !schoolValue) {
      setSchoolListSearch(schoolList.filter((school) => school.id_nhom == groupValue))
      return
    }
  }

  const [isFindByDistance, setIsFindByDistance] = useState(true)
  const handleFindByDistance = () => {
    setIsFindByDistance(!isFindByDistance)
    setInputValue('')
  }

  const [isDrawing, setIsDrawing] = useState(false)
  const handleIsDrawing = (bool) => {
    setIsDrawing(bool)
    console.log('handleIsDrawing ~ isDrawing', isDrawing)
  }

  return (
    <div className='wrapper'>
      <SideBar
        areaList={areaList}
        cityList={cityList}
        groupList={groupList}
        schoolList={schoolList}
        handleAreaChange={handleAreaChange}
        handleCityChange={handleCityChange}
        handleGroupChange={handleGroupChange}
        handleSchoolChange={handleSchoolChange}
        areaValue={areaValue}
        cityValue={cityValue}
        groupValue={groupValue}
        handleSearchSchool={handleSearchSchool}
        handleFindByDistance={handleFindByDistance}
        isFindByDistance={isFindByDistance}
        handleSetInputValue={handleSetInputValue}
        isDrawing={isDrawing}
        // handleIsDrawing={handleIsDrawing}
      />
      <div className='map'>
        <NavbarComponent
          className='navbar-component'
          // handleSetInputValue={handleSetInputValue}
          // handleFindByDistance={handleFindByDistance}
          // isFindByDistance={isFindByDistance}
          handleIsSignedOut={handleIsSignedOut}
          isSignedIn={isSignedIn}
        />
        <Maps
          className='main-container'
          distance={inputValue}
          isFindByDistance={isFindByDistance}
          handleFindByDistance={handleFindByDistance}
          schoolList={schoolListSearch || schoolList}
          handleIsDrawing={handleIsDrawing}
        />
      </div>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage

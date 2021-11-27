import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Maps from '../components/Maps/Maps'
import NavbarComponent from '../components/Navbar/Navbar'
import SideBar from '../components/SideBar/SideBar'
import '../../node_modules/leaflet-draw/dist/leaflet.draw.css'
import './styles.scss'
import { Navigate } from 'react-router-dom'
import AddSchoolModal from '../components/AddSchoolModal/AddSchoolModal'

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

  const [justAddSchool, setJustAddSchool] = useState(0)
  const [justAddGroup, setJustAddGroup] = useState(0)
  const [justDeletedSchool, setJustDeletedSchool] = useState(0)
  const [isAddingSchool, setIsAddingSchool] = useState(false)
  const [isEditingSchool, setIsEditingSchool] = useState(false)
  const [idSchoolEditing, setIdSchoolEditing] = useState(0)
  const [coordinatesMarker, setCoordinatesMarker] = useState([])
  const handleSetIsAddingSchool = (bool) => {
    setIsAddingSchool(bool)
  }
  const handleSetIsEditingSchool = (bool) => {
    setIsEditingSchool(bool)
  }
  const handleSetIdSchoolEditing = (school_id) => {
    setIdSchoolEditing(school_id)
  }
  const handleSetCoordinatesMarker = (latlng) => {
    setCoordinatesMarker(latlng)
  }

  const handleJustAddSchool = () => {
    setJustAddSchool(justAddSchool + 1)
  }
  const handleJustAddGroup = () => {
    setJustAddGroup(justAddGroup + 1)
  }

  const handleSetJustDeletedSchool = () => {
    setJustDeletedSchool(justDeletedSchool + 1)
  }

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
  }, [justAddGroup])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://localhost:8000/truong`)
        setSchoolData(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [justAddSchool, justDeletedSchool])
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

  const [isFindByDistance, setIsFindByDistance] = useState(false)
  const handleFindByDistance = (bool) => {
    setIsFindByDistance(bool)
    setInputValue('')
  }

  const [isDrawing, setIsDrawing] = useState(false)
  const handleIsDrawing = (bool) => {
    setIsDrawing(bool)
    console.log('handleIsDrawing ~ isDrawing', isDrawing)
  }

  const [modalShow, setModalShow] = useState(false)

  const onShow = () => {
    setModalShow(true)
  }
  const onHide = () => {
    setModalShow(false)
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
        handleModalShow={onShow}
        handleSetIsAddingSchool={handleSetIsAddingSchool}
        isAddingSchool={isAddingSchool}
      />
      <div className='map'>
        <NavbarComponent
          className='navbar-component'
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
          isAddingSchool={isAddingSchool}
          handleSetCoordinatesMarker={handleSetCoordinatesMarker}
          handleSetIsAddingSchool={handleSetIsAddingSchool}
          onShow={onShow}
          handleSetIsEditingSchool={handleSetIsEditingSchool}
          handleSetIdSchoolEditing={handleSetIdSchoolEditing}
          justAddSchool={justAddSchool}
          handleSetJustDeletedSchool={handleSetJustDeletedSchool}
        />
        <AddSchoolModal
          handleJustAddSchool={handleJustAddSchool}
          handleJustAddGroup={handleJustAddGroup}
          show={modalShow}
          onHide={onHide}
          onShow={onShow}
          groupList={groupList}
          coordinatesMarker={coordinatesMarker}
          handleSetIsAddingSchool={handleSetIsAddingSchool}
          schoolList={schoolList}
          isEditingSchool={isEditingSchool}
          idSchoolEditing={idSchoolEditing}
          handleSetIsEditingSchool={handleSetIsEditingSchool}
        />
      </div>
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage

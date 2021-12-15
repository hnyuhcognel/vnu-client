import axios from 'axios'
import jwtDecode from 'jwt-decode'
import L from 'leaflet'
import React, { useEffect, useState } from 'react'
import { FeatureGroup, LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import '../../leaflet/leaflet.css'
import Draw from './Draw/Draw'
import LocationMarker from './LocationMarker/LocationMarker'
import Minimap from './Minimap/Minimap'
import SchoolList from './SchoolList/SchoolList'
import SearchField from './Search/Search'
import './styles.scss'

function Maps(props) {
  const {
    distance,
    schoolList,
    handleFindByDistance,
    isFindByDistance,
    handleIsDrawing,
    isAddingSchool,
    handleSetCoordinatesMarker,
    onShow,
    handleSetIsAddingSchool,
    handleSetIsEditingSchool,
    handleSetIdSchoolEditing,
    justAddSchool,
    handleSetJustDeletedSchool,
    justDeletedSchool,
  } = props
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconAnchor: [12, 40],
  })
  const redIcon = L.icon({
    iconUrl: 'https://chiangmaibuddy.com/wp-content/uploads/2015/12/1460972177-map_marker-red1.png',
    iconAnchor: [18, 39],
    iconSize: [34.5, 40],
  })
  const greenIcon = L.icon({
    iconUrl: 'https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309741_960_720.png',
    iconAnchor: [18, 39],
    iconSize: [24.72, 40],
  })

  const [drawData, setDrawData] = useState({
    type: '',
    coordinates: [],
    mota: '',
    username: '',
  })
  const tokenDecoded = jwtDecode(localStorage.getItem('token'))

  const [listDrawData, setListDrawData] = useState()

  const handleLine = (e) => {
    if (e.layerType === 'rectangle' || e.layerType === 'polygon') {
      let latlngs = []
      for (let latlng of e.layer._latlngs[0]) {
        latlngs.push([latlng.lat, latlng.lng])
      }
      latlngs.push(latlngs[0])
      setDrawData({
        ...drawData,
        type: 'Polygon',
        coordinates: [latlngs],
        username: tokenDecoded.username,
      })
    } else if (e.layerType === 'polyline') {
      let latlngs = []
      for (let latlng of e.layer._latlngs) {
        latlngs.push([latlng.lat, latlng.lng])
      }
      setDrawData({
        ...drawData,
        type: 'LineString',
        coordinates: latlngs,
        username: tokenDecoded.username,
      })
    } else if (e.layerType === 'marker') {
      setDrawData({
        ...drawData,
        type: 'Point',
        coordinates: [e.layer._latlng.lat, e.layer._latlng.lng],
        username: tokenDecoded.username,
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log('drawdata', drawData)
      const result1 = await axios
        .post('http://localhost:8000/khac', drawData)
        .then((res) => {
          console.log(res)
          console.log('Draw saved')
        })
        .catch((err) => {
          console.error(err)
        })
      const result2 = await axios
        .get('http://localhost:8000/khac')
        .then((result) => {
          // console.log(result.data)
          setListDrawData(result.data)
        })
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [drawData])

  return (
    <div className='map-container'>
      <MapContainer
        center={[13.75922020532489, 109.21785730217843]}
        zoom={5}
        scrollWheelZoom={true}
        // closePopupOnClick={false}
      >
        <SearchField />
        <LayersControl position='topright'>
          <LayersControl.BaseLayer checked name='OpenStreetMap - Mapnik'>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='OpenStreetMap - BlackAndWhite'>
            <TileLayer url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png' />
          </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup>
          <EditControl
            position='topleft'
            onDrawStart={() => {
              handleIsDrawing(true)
              handleFindByDistance(false)
              handleSetIsAddingSchool(false)
            }}
            // onCreated={(e) => handleLine(e)}
            onCreated={async (e) => {
              const save = await handleLine(e)
              const deleteLayer = await e.layer.remove()
              const confirm = await console.log('del layer')
            }}
            onDrawStop={() => handleIsDrawing(false)}
            edit={{ edit: false, remove: false }}
            draw={{ marker: { icon: icon }, circle: false, circlemarker: false }}
          />
        </FeatureGroup>
        <SchoolList
          icon={icon}
          onShow={onShow}
          handleSetIsEditingSchool={handleSetIsEditingSchool}
          handleSetIdSchoolEditing={handleSetIdSchoolEditing}
          justAddSchool={justAddSchool}
          schoolList={schoolList}
          handleSetJustDeletedSchool={handleSetJustDeletedSchool}
          justDeletedSchool={justDeletedSchool}
        />
        <Draw listDrawData={listDrawData} icon={greenIcon} username={tokenDecoded.username} />
        <Minimap position='bottomright' zoom='4' />
        <LocationMarker
          icon={redIcon}
          schoolList={schoolList}
          distance={distance}
          isFindByDistance={isFindByDistance}
          isAddingSchool={isAddingSchool}
          handleSetCoordinatesMarker={handleSetCoordinatesMarker}
          onShow={onShow}
        />
      </MapContainer>
    </div>
  )
}

Maps.propTypes = {}

export default Maps

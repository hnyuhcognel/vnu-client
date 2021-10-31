import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import L, { Map } from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  LayersControl,
  LayerGroup,
} from 'react-leaflet'
import '../../leaflet/leaflet.css'
import './styles.scss'
import Minimap from './Minimap/Minimap'
import SearchField from './Search/Search'
import LocationMarker from './LocationMarker/LocationMarker'
import axios from 'axios'
import SchoolList from './SchoolList/SchoolList'

function Maps(props) {
  const { distance } = props
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconAnchor: [12, 40],
  })

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8000/truong')
      setData(result.data)
    }
    fetchData()
  }, [])
  const schoolList = data.features

  return (
    <div className='map-container'>
      <MapContainer
        center={[10.030039333911489, 105.77070113153334]}
        zoom={16}
        scrollWheelZoom={true}
        // className='test'
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
        <SchoolList icon={icon} schoolList={schoolList} />

        <Minimap position='bottomright' zoom='9' />
        <LocationMarker icon={icon} schoolList={schoolList} distance={distance} />
      </MapContainer>
    </div>
  )
}

Maps.propTypes = {}

export default Maps

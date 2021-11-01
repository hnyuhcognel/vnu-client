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
  const { distance, schoolList } = props
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconAnchor: [12, 40],
  })
  const redIcon = L.icon({
    iconUrl: 'https://chiangmaibuddy.com/wp-content/uploads/2015/12/1460972177-map_marker-red1.png',
    iconAnchor: [18, 39],
    iconSize: [34.5, 40],
  })

  return (
    <div className='map-container'>
      <MapContainer
        center={[13.75922020532489, 109.21785730217843]}
        zoom={5}
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

        <Minimap position='bottomright' zoom='4' />
        <LocationMarker icon={redIcon} schoolList={schoolList} distance={distance} />
      </MapContainer>
    </div>
  )
}

Maps.propTypes = {}

export default Maps

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Marker, Tooltip } from 'react-leaflet'

export default function SchoolList(props) {
  const { icon, schoolList } = props
  return (
    <div>
      {schoolList &&
        schoolList.map((school, index) => (
          <Marker position={school.geometry.coordinates} icon={icon} key={index}>
            <Tooltip sticky>{school.properties.tentruong}</Tooltip>
          </Marker>
        ))}
    </div>
  )
}

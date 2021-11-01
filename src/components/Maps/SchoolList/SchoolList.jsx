import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Marker, Tooltip } from 'react-leaflet'

export default function SchoolList(props) {
  const { icon, schoolList } = props
  // console.log('SchoolList ~ schoolList', schoolList)
  return (
    <div>
      {schoolList &&
        schoolList.map((school, index) => (
          <Marker position={[school.long, school.lat]} icon={icon} key={index}>
            <Tooltip sticky>{school.tentruong}</Tooltip>
          </Marker>
        ))}
    </div>
  )
}

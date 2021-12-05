import React, { useState } from 'react'
import { Marker, Polyline, useMapEvents } from 'react-leaflet'

export default function LocationMarker(props) {
  const {
    icon,
    distance: distanceInput,
    schoolList,
    isFindByDistance,
    isAddingSchool,
    handleSetCoordinatesMarker,
    onShow,
  } = props
  console.log('LocationMarker ~ isFindByDistance', isFindByDistance)
  console.log('LocationMarker ~ isAddingSchool', isAddingSchool)
  const [marker, setMarker] = useState()

  function getDistance(origin, destination) {
    var lon1 = toRadian(origin[1]),
      lat1 = toRadian(origin[0]),
      lon2 = toRadian(destination[1]),
      lat2 = toRadian(destination[0])

    var deltaLat = lat2 - lat1
    var deltaLon = lon2 - lon1

    var a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2)
    var c = 2 * Math.asin(Math.sqrt(a))
    var EARTH_RADIUS = 6371
    return c * EARTH_RADIUS * 1000
  }
  function toRadian(degree) {
    return (degree * Math.PI) / 180
  }

  const map = useMapEvents({
    click(e) {
      // if (!isAddingSchool) return
      if (isAddingSchool) {
        handleSetCoordinatesMarker(e.latlng)
        onShow()
        return
      }
      if (!isFindByDistance) return

      if (distanceInput === '') {
        console.log('click ~ distanceInput', distanceInput)
        alert('Vui lòng nhập bán kính ')
        setMarker(null)
        return
      }
      const newMarker = e.latlng
      setMarker(newMarker)
    },
  })
  var polylines = []
  const distanceAround = () => {
    schoolList.forEach((school) => {
      let distance = getDistance(Object.values(marker), [school.lat, school.long]) / 1000
      if (distance <= distanceInput)
        polylines.push([Object.values(marker), [school.lat, school.long]])
    })
  }

  marker && distanceAround()

  return (
    <>
      {isFindByDistance && marker && <Marker position={marker} icon={icon}></Marker>}
      {marker &&
        polylines.map((polyline) => (
          <Polyline pathOptions={{ color: 'red' }} positions={polyline} weight='1' />
        ))}
    </>
  )
}

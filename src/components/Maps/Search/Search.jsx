import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import '../../../../node_modules/react-leaflet-geosearch/node_modules/leaflet-geosearch/assets/css/leaflet.css'
import L from 'leaflet'

const icon = L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })

const SearchField = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider()

  const searchControl = new GeoSearchControl({
    provider: provider,
    marker: {
      icon: icon,
      draggable: false,
    },
    searchLabel: 'Nhập địa chỉ',
  })

  const map = useMap()
  useEffect(() => {
    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [])

  return null
}

export default SearchField

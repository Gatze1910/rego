import { NextPage } from 'next'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { MiniView } from '../../components/partials/miniView'
import { Search } from '../../components/basic/formfields'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN

export const Shops: NextPage = () => {
  const mapContainer = useRef<null | HTMLDivElement>(null)
  const map = useRef<null | mapboxgl.Map>(null)

  const [lng, setLng] = useState<number>(13.05501)
  const [lat, setLat] = useState<number>(47.80949)
  const [zoom, setZoom] = useState<number>(11)

  const [shopId, setShopId] = useState<number | null>(null)
  const [shops, setShops] = useState<Shop[]>([])

  const [miniView, setMiniView] = useState<boolean>(false)

  const AllShopsQuery = gql`
    query {
      shops {
        id
        latitude
        longitude
      }
    }
  `
  const { data, loading, error } = useQuery(AllShopsQuery)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      })
    }
  }

  const markerClick = (shopId) => {
    setShopId(shopId)
    setMiniView(true)

    const selectedShop = data?.shops.find((s) => s.id === shopId)
    if (selectedShop) {
      setLat(selectedShop.latitude)
      setLng(selectedShop.longitude)
      setZoom(13)
    }
  }

  const markerClose = () => {
    setMiniView(false)
  }

  useEffect(() => {
    shops.forEach((shop) => {
      const marker = new mapboxgl.Marker()
      marker
        .setLngLat({ lng: shop.longitude, lat: shop.latitude })
        .addTo(map.current)
      marker.getElement().id = shop.id.toString()
      marker.getElement().addEventListener('click', () => markerClick(shop.id))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shops])

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
    getLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      setShops(data.shops)

      const selectedShopId = window.location.hash.replace('#', '')

      if (selectedShopId && selectedShopId.match(/^[0-9]*$/)) {
        const numericSelectedShopId = Number(selectedShopId)
        markerClick(numericSelectedShopId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    map.current.flyTo({ center: [lng, lat], zoom })
  }, [lng, lat, zoom])

  return (
    <>
      <div ref={mapContainer} className="map-container" />
      <div className="miniview-search box-shadow">
        <Search placeholder="Suche"></Search>
      </div>

      {miniView && (
        <div className="miniview-box">
          <div className="uk-padding miniview-view">
            <span
              onClick={() => {
                markerClose()
              }}
              uk-icon=" icon: close"
            ></span>
            {shopId && <MiniView shopId={shopId} />}
          </div>
        </div>
      )}
    </>
  )
}

export default Shops

interface Shop {
  id: number
  longitude: number
  latitude: number
}

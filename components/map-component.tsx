"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface MapComponentProps {
  pickupLocation?: string
  dropLocation?: string
  captainLocation?: string
  captain?: any
  step?: string
  rideStatus?: string
}

declare global {
  interface Window {
    google: any
  }
}

export function MapComponent({
  pickupLocation = "Peeli kothi chauraha, Moradabad 244001",
  dropLocation = "MIT clg, Moradabad 244001",
  captainLocation,
  captain,
  step,
  rideStatus,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null)
  const [directionsService, setDirectionsService] = useState<any>(null)
  const [distance, setDistance] = useState<string>("")
  const [duration, setDuration] = useState<string>("")

  // Initialize the map
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && mapRef.current && !map) {
      const moradabadCenter = { lat: 28.8386, lng: 78.7733 }

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: moradabadCenter,
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })

      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#3b82f6",
          strokeWeight: 5,
          strokeOpacity: 0.8,
        },
      })

      const directionsServiceInstance = new window.google.maps.DirectionsService()

      setMap(mapInstance)
      setDirectionsRenderer(directionsRendererInstance)
      setDirectionsService(directionsServiceInstance)
      setMapLoaded(true)
    }
  }, [map])

  // Calculate and display route when locations change
  useEffect(() => {
    if (mapLoaded && directionsService && directionsRenderer && pickupLocation && dropLocation) {
      const calculateRoute = async () => {
        try {
          const response = await directionsService.route({
            origin: pickupLocation,
            destination: dropLocation,
            travelMode: window.google.maps.TravelMode.DRIVING,
            region: "in", // India
          })

          directionsRenderer.setDirections(response)

          const route = response.routes[0]
          if (route && route.legs && route.legs.length > 0) {
            const { distance, duration } = route.legs[0]
            setDistance(distance.text)
            setDuration(duration.text)
            console.log(`Distance: ${distance.text}, Duration: ${duration.text}`)
          }
        } catch (error) {
          console.error("Error calculating route:", error)
        }
      }

      calculateRoute()
    }
  }, [mapLoaded, directionsService, directionsRenderer, pickupLocation, dropLocation])

  // Add captain marker if captain is available
  useEffect(() => {
    if (mapLoaded && map && captain && captainLocation) {
      // Create a marker for the captain
      const captainMarker = new window.google.maps.Marker({
        position: { lat: 28.8386, lng: 78.7733 }, // Default position, would be dynamic in real app
        map: map,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
        title: `Captain ${captain.name}`,
      })

      // Simulate captain movement (in a real app, this would use real-time location updates)
      if (step === "tracking" || rideStatus === "accepted" || rideStatus === "started") {
        const simulateMovement = setInterval(() => {
          const position = captainMarker.getPosition()
          const lat = position.lat()
          const lng = position.lng()

          // Move slightly towards destination
          const newLat = lat + (Math.random() * 0.001 - 0.0005)
          const newLng = lng + (Math.random() * 0.001 - 0.0005)

          captainMarker.setPosition(new window.google.maps.LatLng(newLat, newLng))
        }, 3000)

        return () => {
          clearInterval(simulateMovement)
          captainMarker.setMap(null)
        }
      }

      return () => {
        captainMarker.setMap(null)
      }
    }
  }, [mapLoaded, map, captain, captainLocation, step, rideStatus])

  return (
    <Card className="w-full h-full overflow-hidden relative">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-full"></div>
      )}

      {/* Overlay information */}
      {mapLoaded && (distance || duration) && (
        <div className="absolute bottom-4 left-4 right-4 bg-background/90 p-3 rounded-lg shadow-lg md:w-auto md:max-w-xs">
          <div className="flex flex-col space-y-1">
            {distance && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Distance:</span>
                <span className="text-sm">{distance}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Duration:</span>
                <span className="text-sm">{duration}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {captain && (
        <div className="absolute top-4 left-4 right-4 bg-background/90 p-3 rounded-lg shadow-lg md:w-auto md:max-w-xs">
          <p className="text-sm font-medium">
            Captain {captain.name} is {step === "tracking" ? "on the way" : "driving you to destination"}
          </p>
          <p className="text-xs text-muted-foreground">ETA: {captain.eta} minutes</p>
        </div>
      )}
    </Card>
  )
}


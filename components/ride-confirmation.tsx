"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Car, Bike } from "lucide-react"

interface RideConfirmationProps {
  pickupLocation: string
  dropLocation: string
  vehicleType: "auto" | "bike"
  fare: number
  distance: number
  duration: number
}

export function RideConfirmation({
  pickupLocation,
  dropLocation,
  vehicleType,
  fare,
  distance,
  duration,
}: RideConfirmationProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">Pickup</p>
            <p className="text-sm text-muted-foreground">{pickupLocation}</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-destructive mt-1 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">Drop</p>
            <p className="text-sm text-muted-foreground">{dropLocation}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Vehicle:</span>
            <span className="text-sm">{vehicleType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Fare:</span>
            <span className="text-sm">₹{fare}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Distance:</span>
            <span className="text-sm">{distance} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Duration:</span>
            <span className="text-sm">{duration} mins</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


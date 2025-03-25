"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Car, Bike } from "lucide-react"

interface VehicleSelectorProps {
  onSelect: (vehicle: "auto" | "bike") => void
  fare: number
  distance: number
  duration: number
}

export function VehicleSelector({ onSelect, fare, distance, duration }: VehicleSelectorProps) {
  return (
    <div className="space-y-4">
      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect("auto")}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Auto</h3>
              <p className="text-sm text-muted-foreground">Comfortable ride for up to 3 people</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">₹{fare}</p>
            <p className="text-sm text-muted-foreground">{duration} min</p>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect("bike")}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Bike className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Bike</h3>
              <p className="text-sm text-muted-foreground">Quick ride for 1 person</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">₹{Math.round(fare * 0.7)}</p>
            <p className="text-sm text-muted-foreground">{Math.round(duration * 0.8)} min</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


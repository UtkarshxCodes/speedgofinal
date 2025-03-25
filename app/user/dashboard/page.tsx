"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Car, Bike, Clock, Zap } from "lucide-react"
import { MapComponent } from "@/components/map-component"
import { VehicleSelector } from "@/components/vehicle-selector"
import { LocationSearch } from "@/components/location-search"
import { RideConfirmation } from "@/components/ride-confirmation"
import { FeedbackForm } from "@/components/feedback-form"

export default function UserDashboard() {
  const [step, setStep] = useState<"search" | "select" | "confirm" | "waiting" | "tracking" | "completed" | "feedback">(
    "search",
  )
  const [pickupLocation, setPickupLocation] = useState("Peeli kothi chauraha, Moradabad 244001")
  const [dropLocation, setDropLocation] = useState("MIT clg, Moradabad 244001")
  const [selectedVehicle, setSelectedVehicle] = useState<"auto" | "bike" | null>(null)
  const [fare, setFare] = useState(0)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [captain, setCaptain] = useState<any>(null)

  useEffect(() => {
    // Simulate calculating fare based on distance
    // In a real app, this would come from the API
    if (pickupLocation && dropLocation) {
      setDistance(5.2) // Example: 5.2 km
      setDuration(18) // Example: 18 minutes
      setFare(120) // Example: ₹120
    }
  }, [pickupLocation, dropLocation])

  const handleLocationSelect = (type: "pickup" | "drop", value: string) => {
    if (type === "pickup") {
      setPickupLocation(value)
    } else {
      setDropLocation(value)
    }
  }

  const handleSearchRide = () => {
    if (pickupLocation && dropLocation) {
      setStep("select")
    }
  }

  const handleVehicleSelect = (vehicle: "auto" | "bike") => {
    setSelectedVehicle(vehicle)
    // Adjust fare based on vehicle type
    if (vehicle === "auto") {
      setFare(120) // Example: ₹120 for auto
    } else {
      setFare(80) // Example: ₹80 for bike
    }
    setStep("confirm")
  }

  const handleConfirmRide = () => {
    // In a real app, you would make an API call to request a ride
    setStep("waiting")

    // Simulate finding a captain after 3 seconds
    setTimeout(() => {
      setCaptain({
        id: "c123",
        name: "Rahul Singh",
        phone: "+91 98765 43210",
        rating: 4.8,
        vehicleNumber: "UP 21 AB 1234",
        vehicleType: selectedVehicle,
        eta: 5, // 5 minutes
      })
      setStep("tracking")
    }, 3000)
  }

  const handleCancelRide = () => {
    // In a real app, you would make an API call to cancel the ride
    setStep("search")
    setSelectedVehicle(null)
    setCaptain(null)
  }

  const handleCompleteRide = () => {
    setStep("completed")

    // Show feedback form after 2 seconds
    setTimeout(() => {
      setStep("feedback")
    }, 2000)
  }

  const handleSubmitFeedback = (rating: number, comment: string) => {
    // In a real app, you would submit this to your API
    console.log("Feedback submitted:", { rating, comment })

    // Reset the ride flow
    setStep("search")
    setSelectedVehicle(null)
    setCaptain(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Speed Go</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/user/profile">Profile</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/user/rides">My Rides</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          {step === "search" && (
            <Card>
              <CardHeader>
                <CardTitle>Book a Ride</CardTitle>
                <CardDescription>Enter your pickup and drop-off locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <LocationSearch
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(value) => handleLocationSelect("pickup", value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drop">Drop Location</Label>
                  <LocationSearch
                    id="drop"
                    placeholder="Enter drop location"
                    value={dropLocation}
                    onChange={(value) => handleLocationSelect("drop", value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSearchRide} disabled={!pickupLocation || !dropLocation}>
                  Search Rides
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "select" && (
            <Card>
              <CardHeader>
                <CardTitle>Select Vehicle</CardTitle>
                <CardDescription>Choose your preferred ride option</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Distance: {distance} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {duration} min</span>
                  </div>
                </div>
                <VehicleSelector onSelect={handleVehicleSelect} fare={fare} distance={distance} duration={duration} />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setStep("search")}>
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "confirm" && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Ride</CardTitle>
                <CardDescription>Review your ride details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RideConfirmation
                  pickupLocation={pickupLocation}
                  dropLocation={dropLocation}
                  vehicleType={selectedVehicle!}
                  fare={fare}
                  distance={distance}
                  duration={duration}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={handleConfirmRide}>
                  Confirm Ride
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setStep("select")}>
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "waiting" && (
            <Card>
              <CardHeader>
                <CardTitle>Finding Captain</CardTitle>
                <CardDescription>Please wait while we find a captain for you</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-center text-muted-foreground">Looking for nearby captains...</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleCancelRide}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "tracking" && captain && (
            <Card>
              <CardHeader>
                <CardTitle>Ride Confirmed</CardTitle>
                <CardDescription>Your captain is on the way</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 border p-3 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full">
                    {captain.vehicleType === "auto" ? (
                      <Car className="h-6 w-6 text-primary" />
                    ) : (
                      <Bike className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{captain.name}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{captain.vehicleNumber}</span>
                      <span>⭐ {captain.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ETA</span>
                    <span className="font-medium">{captain.eta} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fare</span>
                    <span className="font-medium">₹{fare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment</span>
                    <span className="font-medium">Cash</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`tel:${captain.phone}`}>Call</Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={handleCompleteRide}>
                  Complete Ride
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleCancelRide}>
                  Cancel Ride
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "completed" && (
            <Card>
              <CardHeader>
                <CardTitle>Ride Completed</CardTitle>
                <CardDescription>Thank you for riding with Speed Go</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-center font-medium">Your ride has been completed successfully!</p>
                <p className="text-center text-muted-foreground mt-2">Please pay ₹{fare} in cash to your captain.</p>
              </CardContent>
            </Card>
          )}

          {step === "feedback" && (
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Ride</CardTitle>
                <CardDescription>Share your experience with us</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackForm captainName={captain?.name || "your captain"} onSubmit={handleSubmitFeedback} />
              </CardContent>
            </Card>
          )}
        </div>
        <div className="md:col-span-2 h-[calc(100vh-12rem)]">
          <MapComponent pickupLocation={pickupLocation} dropLocation={dropLocation} captain={captain} step={step} />
        </div>
      </main>
    </div>
  )
}


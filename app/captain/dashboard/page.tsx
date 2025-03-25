"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, User, Zap } from "lucide-react"
import { MapComponent } from "@/components/map-component"

export default function CaptainDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [currentRide, setCurrentRide] = useState<any>(null)
  const [rideRequests, setRideRequests] = useState<any[]>([])
  const [earnings, setEarnings] = useState({
    today: 450,
    week: 3200,
    month: 12500,
  })
  const [captainLocation, setCaptainLocation] = useState("Current Location")
  const [rideStatus, setRideStatus] = useState<"idle" | "accepted" | "arrived" | "started" | "completed">("idle")

  useEffect(() => {
    // In a real app, you would get the captain's current location
    setCaptainLocation("Current Location")

    // Simulate receiving ride requests when online
    if (isOnline && !currentRide && rideRequests.length === 0) {
      const timer = setTimeout(() => {
        setRideRequests([
          {
            id: "r123",
            user: {
              id: "u456",
              name: "Priya Sharma",
              rating: 4.7,
            },
            pickup: "Peeli kothi chauraha, Moradabad 244001",
            drop: "MIT clg, Moradabad 244001",
            distance: 5.2,
            duration: 18,
            fare: 120,
            vehicleType: "auto",
          },
        ])
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOnline, currentRide, rideRequests.length])

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
    if (!isOnline) {
      // Going online
      setRideStatus("idle")
    } else {
      // Going offline
      setRideRequests([])
    }
  }

  const handleAcceptRide = (ride: any) => {
    setCurrentRide(ride)
    setRideRequests([])
    setRideStatus("accepted")
  }

  const handleRejectRide = (rideId: string) => {
    setRideRequests(rideRequests.filter((request) => request.id !== rideId))
  }

  const handleArrived = () => {
    setRideStatus("arrived")
  }

  const handleStartRide = () => {
    setRideStatus("started")
  }

  const handleCompleteRide = () => {
    // In a real app, you would make an API call to complete the ride
    setEarnings({
      today: earnings.today + currentRide.fare,
      week: earnings.week + currentRide.fare,
      month: earnings.month + currentRide.fare,
    })
    setCurrentRide(null)
    setRideStatus("idle")
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
            <div className="flex items-center space-x-2">
              <Switch id="online-mode" checked={isOnline} onCheckedChange={handleToggleOnline} />
              <Label htmlFor="online-mode">
                {isOnline ? (
                  <Badge variant="outline" className="bg-green-500 text-white">
                    Online
                  </Badge>
                ) : (
                  <Badge variant="outline">Offline</Badge>
                )}
              </Label>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/captain/profile">Profile</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/captain/earnings">Earnings</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          {!isOnline && (
            <Card>
              <CardHeader>
                <CardTitle>Go Online</CardTitle>
                <CardDescription>You're currently offline. Go online to start receiving ride requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-6">
                  <Button size="lg" onClick={handleToggleOnline}>
                    Go Online
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isOnline && rideStatus === "idle" && rideRequests.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Waiting for Rides</CardTitle>
                <CardDescription>You're online and ready to receive ride requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-center text-muted-foreground">Looking for ride requests...</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleToggleOnline}>
                  Go Offline
                </Button>
              </CardFooter>
            </Card>
          )}

          {isOnline && rideRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>New Ride Request</CardTitle>
                <CardDescription>You have a new ride request</CardDescription>
              </CardHeader>
              {rideRequests.map((request) => (
                <CardContent key={request.id} className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{request.user.name}</h3>
                      <div className="text-sm text-muted-foreground">⭐ {request.user.rating}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pickup</p>
                        <p className="text-sm text-muted-foreground">{request.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-destructive mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Drop</p>
                        <p className="text-sm text-muted-foreground">{request.drop}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="border rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-medium">{request.distance} km</p>
                    </div>
                    <div className="border rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">{request.duration} min</p>
                    </div>
                    <div className="border rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">Fare</p>
                      <p className="font-medium">₹{request.fare}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" onClick={() => handleAcceptRide(request)}>
                      Accept
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleRejectRide(request.id)}>
                      Reject
                    </Button>
                  </div>
                </CardContent>
              ))}
            </Card>
          )}

          {currentRide && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {rideStatus === "accepted" && "Heading to Pickup"}
                  {rideStatus === "arrived" && "Arrived at Pickup"}
                  {rideStatus === "started" && "Ride in Progress"}
                </CardTitle>
                <CardDescription>
                  {rideStatus === "accepted" && "Navigate to the pickup location"}
                  {rideStatus === "arrived" && "Waiting for passenger"}
                  {rideStatus === "started" && "Navigate to the drop location"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{currentRide.user.name}</h3>
                    <div className="text-sm text-muted-foreground">⭐ {currentRide.user.rating}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">{currentRide.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-destructive mt-1 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Drop</p>
                      <p className="text-sm text-muted-foreground">{currentRide.drop}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="border rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-medium">{currentRide.distance} km</p>
                  </div>
                  <div className="border rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">{currentRide.duration} min</p>
                  </div>
                  <div className="border rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Fare</p>
                    <p className="font-medium">₹{currentRide.fare}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`tel:+919876543210`}>Call</Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                {rideStatus === "accepted" && (
                  <Button className="w-full" onClick={handleArrived}>
                    Arrived at Pickup
                  </Button>
                )}
                {rideStatus === "arrived" && (
                  <Button className="w-full" onClick={handleStartRide}>
                    Start Ride
                  </Button>
                )}
                {rideStatus === "started" && (
                  <Button className="w-full" onClick={handleCompleteRide}>
                    Complete Ride
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Today's Earnings</CardTitle>
              <CardDescription>Summary of your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">₹{earnings.today}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">₹{earnings.week}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₹{earnings.month}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/captain/earnings">View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-2 h-[calc(100vh-12rem)]">
          <MapComponent
            captainLocation={captainLocation}
            pickupLocation={currentRide?.pickup || ""}
            dropLocation={currentRide?.drop || ""}
            rideStatus={rideStatus}
          />
        </div>
      </main>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navigation, Search, Users, Car, DollarSign, BarChart } from "lucide-react"
import Image from "next/image"
import { Label } from "@/components/ui/label";

const API_KEY = "AlzaSyVOaTb7Ok3d_VyeuQ-eOoxbvaqMcm32Sgp";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Define the handleClick function
  const handleClick = () => {
    console.log("Main container clicked!");
  };

  // Mock data for demonstration
  const users = [
    { id: "u1", name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43210", rides: 24, status: "active" },
    {
      id: "u2",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      rides: 18,
      status: "active",
    },
    {
      id: "u3",
      name: "Rahul Singh",
      email: "rahul@example.com",
      phone: "+91 76543 21098",
      rides: 32,
      status: "active",
    },
    {
      id: "u4",
      name: "Neha Patel",
      email: "neha@example.com",
      phone: "+91 65432 10987",
      rides: 15,
      status: "inactive",
    },
  ]

  const captains = [
    {
      id: "c1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 54321 09876",
      rides: 124,
      vehicle: "auto",
      status: "active",
    },
    {
      id: "c2",
      name: "Suresh Verma",
      email: "suresh@example.com",
      phone: '+91 43210 98765", rides: 98, vehicle:  name: "Suresh Verma',
      email: "suresh@example.com",
      phone: "+91 43210 98765",
      rides: 98,
      vehicle: "bike",
      status: "active",
    },
    {
      id: "c3",
      name: "Vikram Malhotra",
      email: "vikram@example.com",
      phone: "+91 32109 87654",
      rides: 156,
      vehicle: "auto",
      status: "active",
    },
    {
      id: "c4",
      name: "Deepak Sharma",
      email: "deepak@example.com",
      phone: "+91 21098 76543",
      rides: 87,
      vehicle: "bike",
      status: "inactive",
    },
  ]

  const rides = [
    {
      id: "r1",
      user: "Amit Kumar",
      captain: "Rajesh Kumar",
      pickup: "Connaught Place",
      drop: "Lajpat Nagar",
      fare: 120,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: "r2",
      user: "Priya Sharma",
      captain: "Suresh Verma",
      pickup: "Hauz Khas",
      drop: "Saket",
      fare: 150,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: "r3",
      user: "Rahul Singh",
      captain: "Vikram Malhotra",
      pickup: "Dwarka",
      drop: "Janakpuri",
      fare: 200,
      date: "2023-06-14",
      status: "completed",
    },
    {
      id: "r4",
      user: "Neha Patel",
      captain: "Deepak Sharma",
      pickup: "Noida",
      drop: "Greater Noida",
      fare: 250,
      date: "2023-06-14",
      status: "cancelled",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const filteredCaptains = captains.filter(
    (captain) =>
      captain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      captain.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      captain.phone.includes(searchTerm),
  )

  const filteredRides = rides.filter(
    (ride) =>
      ride.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.captain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.drop.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Navigation className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RideOn Admin</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/settings">Settings</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      <main onClick={handleClick} className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Captains</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{captains.length}</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{rides.reduce((acc, ride) => acc + (ride.status === "completed" ? ride.fare : 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">+₹470 from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="captains">Captains</TabsTrigger>
              <TabsTrigger value="rides">Rides</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Rides</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.rides}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/users/${user.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="captains" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Rides</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCaptains.map((captain) => (
                    <TableRow key={captain.id}>
                      <TableCell className="font-medium">{captain.name}</TableCell>
                      <TableCell>{captain.email}</TableCell>
                      <TableCell>{captain.phone}</TableCell>
                      <TableCell>{captain.vehicle}</TableCell>
                      <TableCell>{captain.rides}</TableCell>
                      <TableCell>
                        <Badge variant={captain.status === "active" ? "default" : "secondary"}>{captain.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1" asChild>
                            <Link href={`https://wa.me/${captain.phone}`} target="_blank" rel="noopener noreferrer">
                              Call
                            </Link>
                          </Button>

                          <Button variant="outline" className="flex-1" asChild>
                            <Link
                              href={`https://wa.me/${7302275542}?text=Hello%20${captain.name},%20I%20would%20like%20to%20discuss%20my%20ride.`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Message
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="rides" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Captain</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Drop</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRides.map((ride) => (
                    <TableRow key={ride.id}>
                      <TableCell className="font-medium">{ride.id}</TableCell>
                      <TableCell>{ride.user}</TableCell>
                      <TableCell>{ride.captain}</TableCell>
                      <TableCell>{ride.pickup}</TableCell>
                      <TableCell>{ride.drop}</TableCell>
                      <TableCell>₹{ride.fare}</TableCell>
                      <TableCell>{ride.date}</TableCell>
                      <TableCell>
                        <Badge variant={ride.status === "completed" ? "default" : "destructive"}>{ride.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/rides/${ride.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="analytics" className="border rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rides Overview</CardTitle>
                    <CardDescription>Total rides per day for the last week</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-16 w-16 mx-auto mb-2" />
                      <p>Analytics charts would be displayed here</p>
                      <p className="text-sm">Integrates with real data visualization libraries</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Total revenue per day for the last week</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-16 w-16 mx-auto mb-2" />
                      <p>Analytics charts would be displayed here</p>
                      <p className="text-sm">Integrates with real data visualization libraries</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Image
          src="/images/speedgo.png" // Path to the speedgo.png image
          width={500}
          height={500}
          alt="SpeedGo Logo"
          className="mx-auto aspect-square rounded-xl object-cover"
        />
        <p className="text-xs text-muted-foreground">© 2025 Speed Go. All rights reserved.</p>
        <Button asChild size="lg">
          <Link href="/login">Book a Ride</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Book a Ride</CardTitle>
            <CardDescription>Enter your pickup and drop-off locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input
                id="pickup"
                placeholder="Enter pickup location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drop">Drop Location</Label>
              <Input
                id="drop"
                placeholder="Enter drop location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}


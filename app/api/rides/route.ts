import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, pickupLocation, dropLocation, vehicleType, fare, distance, duration } = body

    if (!userId || !pickupLocation || !dropLocation || !vehicleType || !fare) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock response
    const mockRide = {
      id: `ride_${Date.now()}`,
      userId,
      pickupLocation,
      dropLocation,
      vehicleType,
      fare,
      distance,
      duration,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      ride: mockRide,
    })
  } catch (error) {
    console.error("Error creating ride:", error)
    return NextResponse.json({ error: "Failed to create ride" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Mock rides data
  const rides = [
    {
      id: "ride_1",
      userId,
      pickupLocation: "Connaught Place, New Delhi",
      dropLocation: "Lajpat Nagar, New Delhi",
      vehicleType: "auto",
      fare: 120,
      distance: 5.2,
      duration: 18,
      status: "completed",
      createdAt: "2023-06-15T10:30:00Z",
    },
  ]

  return NextResponse.json({ rides })
}


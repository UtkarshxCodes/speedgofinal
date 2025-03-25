import { NextResponse } from "next/server"

// This is a mock API route that would normally connect to gomaps.pro
// In a real app, you would make API calls to the gomaps.pro service

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")

  if (!origin || !destination) {
    return NextResponse.json({ error: "Origin and destination parameters are required" }, { status: 400 })
  }

  // Mock directions result for Moradabad
  // In a real app, this would come from the gomaps.pro API
  const mockResult = {
    distance: {
      text: "5.2 km",
      value: 5200, // meters
    },
    duration: {
      text: "18 mins",
      value: 1080, // seconds
    },
    fare: {
      auto: 120, // rupees
      bike: 80, // rupees
    },
    polyline: "mock_polyline_data_would_go_here",
    steps: [
      {
        distance: { text: "1.2 km", value: 1200 },
        duration: { text: "4 mins", value: 240 },
        instruction: "Head north on Peeli kothi chauraha",
        start_location: { lat: 28.8386, lng: 78.7733 },
        end_location: { lat: 28.8415, lng: 78.775 },
      },
      {
        distance: { text: "2.5 km", value: 2500 },
        duration: { text: "8 mins", value: 480 },
        instruction: "Turn right onto Main Road",
        start_location: { lat: 28.8415, lng: 78.775 },
        end_location: { lat: 28.835, lng: 78.78 },
      },
      {
        distance: { text: "1.5 km", value: 1500 },
        duration: { text: "6 mins", value: 360 },
        instruction: "Turn left towards MIT College",
        start_location: { lat: 28.835, lng: 78.78 },
        end_location: { lat: 28.83, lng: 78.78 },
      },
    ],
  }

  return NextResponse.json(mockResult)
}


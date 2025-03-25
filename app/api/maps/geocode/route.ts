import { NextResponse } from "next/server"

// This is a mock API route that would normally connect to gomaps.pro
// In a real app, you would make API calls to the gomaps.pro service

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  // Mock geocoding results for Moradabad
  const mockResults = [
    {
      id: "1",
      name: "Peeli kothi chauraha",
      address: "Peeli kothi chauraha, Moradabad 244001",
      lat: 28.8386,
      lng: 78.7733,
    },
    {
      id: "2",
      name: "MIT College",
      address: "MIT clg, Moradabad 244001",
      lat: 28.83,
      lng: 78.78,
    },
    {
      id: "3",
      name: "Civil Lines",
      address: "Civil Lines, Moradabad 244001",
      lat: 28.84,
      lng: 78.765,
    },
    {
      id: "4",
      name: "Railway Station",
      address: "Railway Station, Moradabad 244001",
      lat: 28.835,
      lng: 78.77,
    },
  ].filter(
    (result) =>
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.address.toLowerCase().includes(query.toLowerCase()),
  )

  return NextResponse.json({ results: mockResults })
}


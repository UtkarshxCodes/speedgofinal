import { NextResponse } from "next/server"

// This is a mock API route that would normally connect to gomaps.pro
// In a real app, you would make API calls to the gomaps.pro service

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")
  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY

  if (!origin || !destination) {
    return NextResponse.json({ error: "Origin and destination parameters are required" }, { status: 400 })
  }

  try {
    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch directions from GoMaps Pro API")
    }

    const data = await response.json()
    if (data.status !== "OK") {
      return NextResponse.json({ error: data.error_message || "Failed to fetch directions" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching directions:", error)
    return NextResponse.json({ error: "Failed to fetch directions" }, { status: 500 })
  }
}


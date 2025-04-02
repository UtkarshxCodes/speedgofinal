export async function getDirections(origin: string, destination: string, apiKey: string) {
  const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch directions")
    }

    const data = await response.json()
    if (data.status !== "OK") {
      throw new Error(data.error_message || "Failed to fetch directions")
    }

    return data
  } catch (error) {
    console.error("Error fetching directions:", error)
    throw error
  }
}
"use client";

import { Card } from "@/components/ui/card";

interface MapComponentProps {
  pickupLocation?: string;
  dropLocation?: string;
  captainLocation?: string;
  captain?: any;
  step?: string;
  rideStatus?: string;
}

export function MapComponent({
  pickupLocation = "Peeli kothi chauraha, Moradabad 244001",
  dropLocation = "MIT clg, Moradabad 244001",
  captainLocation,
  captain,
  step,
  rideStatus,
}: MapComponentProps) {
  return (
    <Card className="w-full h-full overflow-hidden relative">
      {/* Show the placeholder image */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <img
          src="/images/placeholder-logo.png" // Path to the placeholder image in the public folder
          alt="Map Placeholder"
          className="w-full h-full object-cover"
        />
      </div>
    </Card>
  );
}


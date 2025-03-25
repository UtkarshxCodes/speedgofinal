"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MapPin, Check } from "lucide-react"

interface LocationSearchProps {
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

declare global {
  interface Window {
    google: any
  }
}

export function LocationSearch({ id, placeholder, value, onChange }: LocationSearchProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const autocompleteService = useRef<any>(null)
  const sessionToken = useRef<any>(null)

  // Initialize Google Maps Autocomplete service
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && !autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService()
      sessionToken.current = new window.google.maps.places.AutocompleteSessionToken()
    }
  }, [])

  // Get location suggestions when input changes
  useEffect(() => {
    if (autocompleteService.current && value.length > 2) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionToken.current,
          componentRestrictions: { country: "in" },
          locationBias: {
            latLng: new window.google.maps.LatLng(28.8386, 78.7733), // Moradabad coordinates
          },
        },
        (predictions: any[], status: string) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions)
          } else {
            setSuggestions([])
          }
        },
      )
    } else {
      setSuggestions([])
    }
  }, [value])

  // Fallback suggestions for Moradabad
  const moradabadLocations = [
    "Peeli kothi chauraha, Moradabad 244001",
    "MIT clg, Moradabad 244001",
    "Civil Lines, Moradabad 244001",
    "Railway Station, Moradabad 244001",
    "Moradabad Bus Stand, Moradabad 244001",
    "Mansarover Colony, Moradabad 244001",
    "Budh Bazar, Moradabad 244001",
    "Ramganga Vihar, Moradabad 244001",
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-8"
            onClick={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" sideOffset={5}>
        <Command>
          <CommandInput placeholder={placeholder} value={value} onValueChange={onChange} />
          <CommandList>
            <CommandEmpty>
              {suggestions.length === 0 && value.length > 2 ? (
                <div className="py-2 px-4 text-sm text-muted-foreground">
                  No locations found. Try these popular locations:
                  <div className="mt-2 space-y-1">
                    {moradabadLocations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-accent"
                        onClick={() => {
                          onChange(location)
                          setOpen(false)
                        }}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{location}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-sm">No locations found</div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.place_id}
                  value={suggestion.description}
                  onSelect={() => {
                    onChange(suggestion.description)
                    setOpen(false)
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{suggestion.description}</span>
                  {value === suggestion.description && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


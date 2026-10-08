"use client"

import React, { useEffect, useRef, useState } from "react"
import { Loader2, MapPin, Navigation, Search } from "lucide-react"

function LocationByCityApi({ onSelectLocation, onCurrentLocation }) {
    const [suggestion, setSuggestion] = useState([])
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

    const containerRef = useRef(null)

    const fetchLocation = async () => {
        try {
            if (!value.trim()) {
                setSuggestion([])
                return
            }

            setLoading(true)

            const res = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&filter=countrycode:in&limit=5&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
            )

            const data = await res.json()

            setSuggestion(data.results || [])
        } catch (err) {
            console.log("Failed to fetch location", err)
            setSuggestion([])
        } finally {
            setLoading(false)
        }
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = (location) => {
        const selectedLocation = {
            city: location.city || location.name,
            state: location.state,
            country: location.country,
            latitude: location.lat,
            longitude: location.lon
        }

        setValue(selectedLocation.city)
        setSuggestion([])

        if (onSelectLocation) {
            onSelectLocation(selectedLocation)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLocation()
        }, 400)

        return () => clearTimeout(timer)
    }, [value])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setSuggestion([])
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative w-[350px]"
        >
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50">

                <div className="mb-3 flex items-center gap-3 px-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50">
                        <MapPin className="h-5 w-5 text-[#0891B2]" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-800">
                            Choose location
                        </p>

                        <p className="text-xs text-slate-400">
                            Search for a city
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={value}
                        onChange={handleValue}
                        placeholder="Search city..."
                        autoFocus
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0891B2] focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                    />

                    {loading && (
                        <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#0891B2]" />
                    )}
                </div>

                <button
                    type="button"
                    onClick={onCurrentLocation}
                    className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-cyan-50"
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50">
                        <Navigation className="h-4 w-4 text-[#0891B2]" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#0891B2]">
                            Use current location
                        </p>

                        <p className="text-xs text-slate-400">
                            Detect your location automatically
                        </p>
                    </div>
                </button>

                {suggestion.length > 0 && (
                    <div className="mt-2 border-t border-slate-100 pt-2">
                        <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Suggestions
                        </p>

                        <div className="space-y-0.5">
                            {suggestion.map((location) => (
                                <button
                                    key={location.place_id}
                                    type="button"
                                    onClick={() => handleSelect(location)}
                                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-cyan-50">
                                        <MapPin className="h-4 w-4 text-slate-400 transition group-hover:text-[#0891B2]" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-slate-700">
                                            {location.city || location.name}
                                        </p>

                                        <p className="truncate text-xs text-slate-400">
                                            {location.state}, {location.country}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && value.trim() && suggestion.length === 0 && (
                    <div className="px-3 py-5 text-center">
                        <MapPin className="mx-auto mb-2 h-6 w-6 text-slate-300" />

                        <p className="text-sm font-medium text-slate-600">
                            No locations found
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                            Try searching for another city
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LocationByCityApi


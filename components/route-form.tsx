"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import { MapPin, Clock, Route } from "lucide-react"

export function RouteForm() {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    duration: 60,
  })

  const minDuration = 15 // 15 minutes
  const maxDuration = 120 // 2 hours

  const presetTimes = [
    { label: "Quick", value: 20, desc: "20 min" },
    { label: "Short", value: 45, desc: "45 min" },
    { label: "Medium", value: 75, desc: "1h 15m" },
    { label: "Long", value: 105, desc: "1h 45m" },
  ]

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Generating routes for:", formData)
    setIsLoading(false)

    alert("Routes generated! (coming soon)")
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) {
      return `${hours}h`
    }
    return `${hours}h ${remainingMinutes}m`
  }

  const isFormValid =
    formData.startLocation &&
    formData.endLocation &&
    formData.duration &&
    formData.duration > minDuration &&
    formData.duration < maxDuration

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl md:text-3xl font-semibold text-gray-900">Plan Your Route</CardTitle>
        <CardDescription className="text-base text-gray-600">
          Enter your locations and preferred walking time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Inputs */}
          <div className="grid gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-location" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Start Location
              </Label>
              <Input
                id="start-location"
                type="text"
                placeholder="Enter starting point (e.g., Central Park, NYC)"
                value={formData.startLocation}
                onChange={(e) => handleInputChange("startLocation", e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-location" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                End Location
              </Label>
              <Input
                id="end-location"
                type="text"
                placeholder="Enter destination (e.g., Times Square, NYC)"
                value={formData.endLocation}
                onChange={(e) => handleInputChange("endLocation", e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Preferred Walking Time
            </Label>

            {/* presets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presetTimes.map((preset) => (
                <Button
                  key={preset.value}
                  type="button"
                  variant={formData.duration === preset.value ? "default" : "outline"}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    formData.duration === preset.value
                      ? "bg-blue-600 text-white shadow-md scale-105"
                      : "hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, duration: preset.value }))}
                >
                  <span className="text-xs font-medium opacity-80">{preset.label}</span>
                  <span className="text-sm font-semibold">{preset.desc}</span>
                </Button>
              ))}
            </div>

            {/* slider */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{formatDuration(formData.duration)}</div>
              </div>

              <div className="">
                <Slider
                  value={[formData.duration]}
                  min={15}
                  max={120}
                  step={5}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      duration: value[0],
                    }))
                  }}
                  className="w-full"
                />

                {/* markers */}
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-gray-300 rounded-full mb-1"></div>
                    15m
                  </span>
                  <span className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-gray-300 rounded-full mb-1"></div>
                    30m
                  </span>
                  <span className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-gray-300 rounded-full mb-1"></div>
                    1h
                  </span>
                  <span className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-gray-300 rounded-full mb-1"></div>
                    1h 30m
                  </span>
                  <span className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-gray-300 rounded-full mb-1"></div>
                    2h
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating Routes...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4" />
                Generate Walking Routes
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

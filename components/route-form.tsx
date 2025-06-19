"use client"

import React from 'react'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { MapPin, Clock, Route } from "lucide-react"

export function RouteForm(){
    const [formData, setFormData] = useState({
        startLocation: "",
        endLocation: "",
        minDuration: "",
        maxDuration: "",
    });

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

        alert("Routes generated! (Coming soon)")
    }

    const isFormValid = formData.startLocation && formData.endLocation && formData.minDuration && formData.maxDuration

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

          {/* Time Range */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Preferred Walking Time
            </Label>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-duration" className="text-xs text-gray-500">
                  Minimum Duration
                </Label>
                <Input
                  id="min-duration"
                  type="time"
                  value={formData.minDuration}
                  onChange={(e) => handleInputChange("minDuration", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-duration" className="text-xs text-gray-500">
                  Maximum Duration
                </Label>
                <Input
                  id="max-duration"
                  type="time"
                  value={formData.maxDuration}
                  onChange={(e) => handleInputChange("maxDuration", e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
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

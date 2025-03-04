"use client"

import { useState, useEffect } from "react"
import { Calendar, Mail, Phone, Users } from "lucide-react"

interface Booking {
  id: string
  fullName: string
  email: string
  phone: string
  numberOfTrekkers: number
  groupId: string
  route: string
  departureDate: string
  specialRequirements?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings")
      if (!response.ok) throw new Error("Failed to fetch bookings")
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: "pending" | "confirmed" | "cancelled") => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Failed to update booking status")

      // Update local state
      setBookings((prev) =>
        prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking))
      )
    } catch (error) {
      console.error("Error updating booking status:", error)
      alert("Failed to update booking status")
    }
  }

  const filteredBookings = bookings.filter(
    (booking) => filter === "all" || booking.status === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={fetchBookings}
          className="text-primary hover:text-primary-dark font-medium text-sm"
        >
          Refresh
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{booking.fullName}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{booking.numberOfTrekkers} trekkers</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.departureDate}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Route</h4>
                <p className="text-gray-600">{booking.route}</p>
              </div>

              {booking.specialRequirements && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-1">Special Requirements</h4>
                  <p className="text-gray-600">{booking.specialRequirements}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                {booking.status !== "confirmed" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "confirmed")}
                    className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Confirm
                  </button>
                )}
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "cancelled")}
                    className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                )}
                {booking.status !== "pending" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "pending")}
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Mark as Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
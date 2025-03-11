"use client"

import { useState, useEffect } from "react"
import { Calendar, Mail, Phone, Users, Search, Download, RefreshCw } from "lucide-react"

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
  const [searchTerm, setSearchTerm] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
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

  const exportToCSV = () => {
    setIsExporting(true)
    try {
      // Filter bookings based on current filter and search
      const bookingsToExport = filteredBookings
      
      // Create CSV content
      const headers = [
        "ID", "Name", "Email", "Phone", "Trekkers", 
        "Route", "Departure Date", "Status", "Created At", 
        "Special Requirements"
      ]
      
      const csvContent = [
        headers.join(","),
        ...bookingsToExport.map(booking => [
          booking.id,
          `"${booking.fullName.replace(/"/g, '""')}"`,
          `"${booking.email.replace(/"/g, '""')}"`,
          `"${booking.phone.replace(/"/g, '""')}"`,
          booking.numberOfTrekkers,
          `"${booking.route.replace(/"/g, '""')}"`,
          booking.departureDate,
          booking.status,
          booking.createdAt,
          booking.specialRequirements ? `"${booking.specialRequirements.replace(/"/g, '""')}"` : ""
        ].join(","))
      ].join("\n")
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `bookings-export-${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting bookings:", error)
      alert("Failed to export bookings")
    } finally {
      setIsExporting(false)
    }
  }

  // Filter and search bookings
  const filteredBookings = bookings
    .filter(booking => filter === "all" || booking.status === filter)
    .filter(booking => {
      if (!searchTerm) return true
      const term = searchTerm.toLowerCase()
      return (
        booking.fullName.toLowerCase().includes(term) ||
        booking.email.toLowerCase().includes(term) ||
        booking.phone.toLowerCase().includes(term) ||
        booking.route.toLowerCase().includes(term) ||
        (booking.specialRequirements && booking.specialRequirements.toLowerCase().includes(term))
      )
    })

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
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <h2 className="text-xl font-bold">Manage Bookings</h2>
          <div className="flex gap-2">
            <button
              onClick={fetchBookings}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1 px-3 py-2 bg-green-100 hover:bg-green-200 rounded-md text-sm font-medium text-green-700"
              disabled={isExporting || filteredBookings.length === 0}
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(["all", "pending", "confirmed", "cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filter === status
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{booking.fullName}</h3>
                  <p className="text-sm text-gray-500">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{booking.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.numberOfTrekkers} trekkers</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.departureDate}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Route</h4>
                <p className="text-gray-600">{booking.route}</p>
              </div>

              {booking.specialRequirements && (
                <div className="mb-4 bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-1">Special Requirements</h4>
                  <p className="text-gray-600">{booking.specialRequirements}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 mt-4">
                {booking.status !== "confirmed" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "confirmed")}
                    className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Confirm
                  </button>
                )}
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "cancelled")}
                    className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                )}
                {booking.status !== "pending" && (
                  <button
                    onClick={() => updateBookingStatus(booking.id, "pending")}
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-2 rounded-md text-sm font-medium"
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
"use client"

import { useState, useEffect } from "react"
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react"
import type { ClimbGroup } from "@/lib/types"

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

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    upcomingDepartures: 0,
    totalTrekkers: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])

  useEffect(() => {
    Promise.all([
      fetchBookings(),
      fetchGroups()
    ]).then(() => {
      setLoading(false)
    })
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings")
      if (!response.ok) throw new Error("Failed to fetch bookings")
      const data: Booking[] = await response.json()
      
      // Calculate booking stats
      const confirmed = data.filter(b => b.status === "confirmed").length
      const pending = data.filter(b => b.status === "pending").length
      const totalTrekkers = data.reduce((sum, booking) => sum + booking.numberOfTrekkers, 0)
      
      // Set recent bookings (last 5)
      const sorted = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setRecentBookings(sorted.slice(0, 5))
      
      setStats(prev => ({
        ...prev,
        totalBookings: data.length,
        confirmedBookings: confirmed,
        pendingBookings: pending,
        totalTrekkers
      }))
    } catch (error) {
      console.error("Error fetching bookings:", error)
    }
  }

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/admin/groups")
      if (!response.ok) throw new Error("Failed to fetch groups")
      const data: ClimbGroup[] = await response.json()
      
      // Calculate group stats
      const now = new Date()
      const upcoming = data.filter(group => new Date(group.departureDate) > now).length
      
      // Estimate revenue (confirmed bookings * average price)
      const avgPrice = data.reduce((sum, group) => sum + group.price, 0) / data.length
      const estimatedRevenue = stats.confirmedBookings * avgPrice
      
      setStats(prev => ({
        ...prev,
        upcomingDepartures: upcoming,
        totalRevenue: estimatedRevenue
      }))
    } catch (error) {
      console.error("Error fetching groups:", error)
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
      <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">{stats.confirmedBookings} confirmed</span>
              <span className="text-yellow-600">{stats.pendingBookings} pending</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Estimated Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>From confirmed bookings</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Trekkers</p>
              <p className="text-2xl font-bold">{stats.totalTrekkers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-purple-600">
              <span>Across all bookings</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Departures</p>
              <p className="text-2xl font-bold">{stats.upcomingDepartures}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-orange-600">
              <span>Scheduled group climbs</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        {recentBookings.length === 0 ? (
          <p className="text-gray-500">No recent bookings</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.fullName}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.route}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.departureDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 
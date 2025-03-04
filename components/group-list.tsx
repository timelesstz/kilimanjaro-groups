"use client"

import { useState } from "react"
import Link from "next/link"
import type { ClimbGroup } from "@/lib/types"
import { BookingModal } from "./booking-modal"
import { Calendar, DollarSign, Users, Mountain } from "lucide-react"

interface GroupListProps {
  groups: ClimbGroup[]
}

export function GroupList({ groups }: GroupListProps) {
  const [selectedGroup, setSelectedGroup] = useState<ClimbGroup | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBookNow = (group: ClimbGroup) => {
    setSelectedGroup(group)
    setIsModalOpen(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "challenging":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSpacesColor = (spacesLeft: number, totalSpaces: number) => {
    const percentage = (spacesLeft / totalSpaces) * 100
    if (percentage <= 20) return "bg-red-100 text-red-800"
    if (percentage <= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <div id="group-list" className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">Upcoming Group Departures</h3>
        <p className="mt-2 text-gray-600">Select from our scheduled group climbs below</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                <div className="flex items-center space-x-2">
                  <Mountain className="w-4 h-4" />
                  <span>Route</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Dates</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Price (USD)</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wider">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Availability</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <Link
                      href={`/routes/${group.route.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      {group.route}
                    </Link>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getDifficultyColor(group.difficulty)}`}>
                      {group.difficulty}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">Arrival: {group.arrivalDate}</span>
                    <span className="text-sm text-gray-500">Departure: {group.departureDate}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-900">${group.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getSpacesColor(group.spacesLeft, group.totalSpaces)}`}>
                      {group.spacesLeft} of {group.totalSpaces} spaces
                    </span>
                    {group.spacesLeft <= 3 && (
                      <span className="text-xs text-red-600 mt-1">Limited spots remaining!</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleBookNow(group)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {groups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No upcoming departures available at this time.</p>
        </div>
      )}

      {selectedGroup && (
        <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} group={selectedGroup} />
      )}
    </div>
  )
}


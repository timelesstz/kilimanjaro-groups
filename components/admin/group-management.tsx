"use client"

import { useState, useEffect } from "react"
import type { ClimbGroup } from "@/lib/types"
import { Calendar, DollarSign, Users, Mountain, Trash2, Edit, Search, Download, RefreshCw, ArrowUpDown } from "lucide-react"

export function GroupManagement() {
  const [groups, setGroups] = useState<ClimbGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [editingGroup, setEditingGroup] = useState<ClimbGroup | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [sortField, setSortField] = useState<keyof ClimbGroup>("departureDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/groups")
      if (!response.ok) throw new Error("Failed to fetch groups")
      const data = await response.json()
      setGroups(data)
    } catch (error) {
      console.error("Error fetching groups:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteGroup = async (groupId: string) => {
    if (!confirm("Are you sure you want to delete this group?")) return

    try {
      const response = await fetch(`/api/admin/groups/${groupId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete group")

      // Update local state
      setGroups((prev) => prev.filter((group) => group.id !== groupId))
    } catch (error) {
      console.error("Error deleting group:", error)
      alert("Failed to delete group")
    }
  }

  const updateGroup = async (groupId: string, updates: Partial<ClimbGroup>) => {
    try {
      const response = await fetch(`/api/admin/groups/${groupId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error("Failed to update group")

      // Update local state
      setGroups((prev) =>
        prev.map((group) => (group.id === groupId ? { ...group, ...updates } : group))
      )
      setEditingGroup(null)
    } catch (error) {
      console.error("Error updating group:", error)
      alert("Failed to update group")
    }
  }

  const exportToCSV = () => {
    setIsExporting(true)
    try {
      // Filter groups based on current search
      const groupsToExport = filteredGroups
      
      // Create CSV content
      const headers = [
        "ID", "Route", "Arrival Date", "Departure Date", 
        "Price", "Total Spaces", "Spaces Left", "Difficulty", 
        "Description"
      ]
      
      const csvContent = [
        headers.join(","),
        ...groupsToExport.map(group => [
          group.id,
          `"${group.route.replace(/"/g, '""')}"`,
          group.arrivalDate,
          group.departureDate,
          group.price,
          group.totalSpaces,
          group.spacesLeft,
          `"${group.difficulty.replace(/"/g, '""')}"`,
          group.description ? `"${group.description.replace(/"/g, '""')}"` : ""
        ].join(","))
      ].join("\n")
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `groups-export-${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting groups:", error)
      alert("Failed to export groups")
    } finally {
      setIsExporting(false)
    }
  }

  const handleSort = (field: keyof ClimbGroup) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // New field, default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort groups
  const filteredGroups = groups
    .filter(group => {
      if (!searchTerm) return true
      const term = searchTerm.toLowerCase()
      return (
        group.route.toLowerCase().includes(term) ||
        group.difficulty.toLowerCase().includes(term) ||
        (group.description && group.description.toLowerCase().includes(term))
      )
    })
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]
      
      // Handle different field types
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA)
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA
      } else {
        // Fallback for other types or mixed types
        return sortDirection === 'asc' 
          ? String(fieldA).localeCompare(String(fieldB))
          : String(fieldB).localeCompare(String(fieldA))
      }
    })

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
          <h2 className="text-xl font-bold">Manage Groups</h2>
          <div className="flex gap-2">
            <button
              onClick={fetchGroups}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1 px-3 py-2 bg-green-100 hover:bg-green-200 rounded-md text-sm font-medium text-green-700"
              disabled={isExporting || filteredGroups.length === 0}
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
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSort("departureDate")}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
            >
              <Calendar className="w-4 h-4" />
              Date
              {sortField === "departureDate" && (
                <ArrowUpDown className={`w-3 h-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
              )}
            </button>
            <button
              onClick={() => handleSort("price")}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
            >
              <DollarSign className="w-4 h-4" />
              Price
              {sortField === "price" && (
                <ArrowUpDown className={`w-3 h-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
              )}
            </button>
            <button
              onClick={() => handleSort("spacesLeft")}
              className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700"
            >
              <Users className="w-4 h-4" />
              Spaces
              {sortField === "spacesLeft" && (
                <ArrowUpDown className={`w-3 h-3 ${sortDirection === "asc" ? "rotate-0" : "rotate-180"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No groups found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{group.route}</h3>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                        group.difficulty
                      )}`}
                    >
                      {group.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingGroup(group)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm font-medium text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteGroup(group.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 rounded-md text-sm font-medium text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="text-sm">Arrival: {group.arrivalDate}</div>
                    <div className="text-sm">Departure: {group.departureDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <DollarSign className="w-4 h-4 flex-shrink-0" />
                  <span>${group.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {group.spacesLeft} of {group.totalSpaces} spaces left
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mountain className="w-4 h-4 flex-shrink-0" />
                  <span>{group.duration || "N/A"} days</span>
                </div>
              </div>

              {group.description && (
                <div className="mt-2 bg-gray-50 p-3 rounded-md text-gray-600 text-sm">{group.description}</div>
              )}

              {editingGroup?.id === group.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Edit Group</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                      <input
                        type="number"
                        value={editingGroup.price}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, price: parseFloat(e.target.value) })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Spaces</label>
                      <input
                        type="number"
                        value={editingGroup.totalSpaces}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, totalSpaces: parseInt(e.target.value) })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Spaces Left</label>
                      <input
                        type="number"
                        value={editingGroup.spacesLeft}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, spacesLeft: parseInt(e.target.value) })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select
                        value={editingGroup.difficulty}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, difficulty: e.target.value })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Challenging">Challenging</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingGroup.description}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, description: e.target.value })
                        }
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingGroup(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => updateGroup(group.id, editingGroup)}
                      className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 
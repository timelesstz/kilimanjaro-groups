"use client"

import { useState, useEffect } from "react"
import type { ClimbGroup } from "@/lib/types"
import { Calendar, DollarSign, Users, Mountain, Trash2, Edit } from "lucide-react"

export function GroupManagement() {
  const [groups, setGroups] = useState<ClimbGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [editingGroup, setEditingGroup] = useState<ClimbGroup | null>(null)

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
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
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Manage Groups</h2>
        <button
          onClick={fetchGroups}
          className="text-primary hover:text-primary-dark font-medium text-sm"
        >
          Refresh
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No groups found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{group.route}</h3>
                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
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
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteGroup(group.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <div className="text-sm">Arrival: {group.arrivalDate}</div>
                    <div className="text-sm">Departure: {group.departureDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${group.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {group.spacesLeft} of {group.totalSpaces} spaces left
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mountain className="w-4 h-4" />
                  <span>{group.duration} days</span>
                </div>
              </div>

              {group.description && (
                <div className="mt-2 text-gray-600 text-sm">{group.description}</div>
              )}

              {editingGroup?.id === group.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Edit Group</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
                      <input
                        type="number"
                        value={editingGroup.price}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, price: parseFloat(e.target.value) })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Spaces</label>
                      <input
                        type="number"
                        value={editingGroup.totalSpaces}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, totalSpaces: parseInt(e.target.value) })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spaces Left</label>
                      <input
                        type="number"
                        value={editingGroup.spacesLeft}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, spacesLeft: parseInt(e.target.value) })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editingGroup.description}
                        onChange={(e) =>
                          setEditingGroup({ ...editingGroup, description: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
"use client"

import { useState } from "react"
import type { RouteType } from "@/lib/types"

export function AddGroupForm() {
  const [formData, setFormData] = useState({
    route: "8 Day Lemosho route" as RouteType,
    arrivalDate: "",
    departureDate: "",
    price: "",
    totalSpaces: "",
    difficulty: "Moderate",
    description: "",
  })

  const routes: RouteType[] = [
    "8 Day Lemosho route",
    "7 Day Machame route",
    "6 Day Machame route (Full Moon climb)",
    "7 Day Machame route (Full Moon climb)",
    "6 Day Rongai route (Full Moon climb)",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          totalSpaces: parseInt(formData.totalSpaces),
          spacesLeft: parseInt(formData.totalSpaces),
          id: new Date().getTime().toString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add group")
      }

      // Reset form
      setFormData({
        route: "8 Day Lemosho route",
        arrivalDate: "",
        departureDate: "",
        price: "",
        totalSpaces: "",
        difficulty: "Moderate",
        description: "",
      })

      alert("Group added successfully!")
    } catch (error) {
      console.error("Error adding group:", error)
      alert("Failed to add group. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">
            Route *
          </label>
          <select
            id="route"
            name="route"
            value={formData.route}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          >
            {routes.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty *
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>

        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">
            Arrival Date *
          </label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
            Departure Date *
          </label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (USD) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="totalSpaces" className="block text-sm font-medium text-gray-700">
            Total Spaces *
          </label>
          <input
            type="number"
            id="totalSpaces"
            name="totalSpaces"
            value={formData.totalSpaces}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Add Group
        </button>
      </div>
    </form>
  )
} 
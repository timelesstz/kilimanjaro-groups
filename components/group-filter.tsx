"use client"

import type React from "react"

import { useState } from "react"

export function GroupFilter() {
  const [month, setMonth] = useState<string>("all")
  const [route, setRoute] = useState<string>("all")
  const [duration, setDuration] = useState<string>("all")

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
    // This would be connected to state management or context in a real app
    console.log({ month, route, duration })
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Find Your Perfect Climb</h3>
      <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Months</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="mar">March</option>
            <option value="apr">April</option>
            <option value="may">May</option>
            <option value="jun">June</option>
            <option value="jul">July</option>
            <option value="aug">August</option>
            <option value="sep">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>
        </div>
        <div>
          <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-1">
            Route
          </label>
          <select
            id="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Routes</option>
            <option value="lemosho">Lemosho Route</option>
            <option value="machame">Machame Route</option>
            <option value="rongai">Rongai Route</option>
            <option value="marangu">Marangu Route</option>
            <option value="umbwe">Umbwe Route</option>
            <option value="northern">Northern Circuit</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Durations</option>
            <option value="5">5 Days</option>
            <option value="6">6 Days</option>
            <option value="7">7 Days</option>
            <option value="8">8 Days</option>
            <option value="9">9 Days</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            Filter Results
          </button>
        </div>
      </form>
    </div>
  )
}


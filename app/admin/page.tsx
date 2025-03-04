"use client"

import { useState } from "react"
import { AddGroupForm } from "@/components/admin/add-group-form"
import { BookingsList } from "@/components/admin/bookings-list"
import { GroupManagement } from "@/components/admin/group-management"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"groups" | "bookings" | "add">("groups")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage climbing groups and bookings</p>
          </div>
          <div className="px-6">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab("groups")}
                className={`${
                  activeTab === "groups"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Group Management
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`${
                  activeTab === "bookings"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("add")}
                className={`${
                  activeTab === "add"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Add New Group
              </button>
            </nav>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "groups" && <GroupManagement />}
          {activeTab === "bookings" && <BookingsList />}
          {activeTab === "add" && <AddGroupForm />}
        </div>
      </div>
    </div>
  )
} 
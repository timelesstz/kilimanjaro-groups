"use client"

import { useState } from "react"
import { AddGroupForm } from "@/components/admin/add-group-form"
import { BookingsList } from "@/components/admin/bookings-list"
import { GroupManagement } from "@/components/admin/group-management"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { LayoutDashboard, Users, Calendar, PlusCircle } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "groups" | "bookings" | "add">("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "groups", label: "Group Management", icon: <Calendar className="w-5 h-5" /> },
    { id: "bookings", label: "Bookings", icon: <Users className="w-5 h-5" /> },
    { id: "add", label: "Add New Group", icon: <PlusCircle className="w-5 h-5" /> },
  ] as const

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage climbing groups and bookings</p>
          </div>
          <div className="px-6">
            <nav className="flex flex-wrap -mb-px space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "groups" && <GroupManagement />}
          {activeTab === "bookings" && <BookingsList />}
          {activeTab === "add" && <AddGroupForm />}
        </div>
      </div>
    </div>
  )
} 
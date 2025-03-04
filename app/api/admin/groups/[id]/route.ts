import { NextResponse } from "next/server"
import { climbGroups } from "@/lib/data"

// In a real application, this would be a database
let groups = [...climbGroups]

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const groupId = params.id

    // Find and update the group
    const groupIndex = groups.findIndex((g) => g.id === groupId)
    if (groupIndex === -1) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 })
    }

    // Update the group
    groups[groupIndex] = { ...groups[groupIndex], ...updates }

    return NextResponse.json(groups[groupIndex])
  } catch (error) {
    console.error("Error updating group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const groupId = params.id

    // Find and remove the group
    const groupIndex = groups.findIndex((g) => g.id === groupId)
    if (groupIndex === -1) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 })
    }

    // Remove the group
    groups.splice(groupIndex, 1)

    return NextResponse.json({ message: "Group deleted successfully" })
  } catch (error) {
    console.error("Error deleting group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 
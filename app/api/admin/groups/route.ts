import { NextResponse } from "next/server"
import { climbGroups } from "@/lib/data"

// In a real application, this would be a database
let groups = [...climbGroups]

export async function GET() {
  return NextResponse.json(groups)
}

export async function POST(request: Request) {
  try {
    const newGroup = await request.json()

    // Validate required fields
    if (!newGroup.route || !newGroup.arrivalDate || !newGroup.departureDate || !newGroup.price || !newGroup.totalSpaces) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add the new group
    groups.push(newGroup)

    return NextResponse.json(newGroup)
  } catch (error) {
    console.error("Error adding group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 
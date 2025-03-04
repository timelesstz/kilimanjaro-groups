import { NextResponse } from "next/server"

// In a real application, this would be a database
let bookings: any[] = []

export async function GET() {
  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  try {
    const booking = await request.json()

    // Add status and creation date
    const newBooking = {
      ...booking,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Add the booking
    bookings.push(newBooking)

    return NextResponse.json(newBooking)
  } catch (error) {
    console.error("Error adding booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 
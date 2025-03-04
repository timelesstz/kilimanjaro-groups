import { NextResponse } from "next/server"

// In a real application, this would be a database
let bookings: any[] = []

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const bookingId = params.id

    // Find and update the booking
    const bookingIndex = bookings.findIndex((b) => b.id === bookingId)
    if (bookingIndex === -1) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Update the booking
    bookings[bookingIndex] = { ...bookings[bookingIndex], ...updates }

    return NextResponse.json(bookings[bookingIndex])
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id

    // Find and remove the booking
    const bookingIndex = bookings.findIndex((b) => b.id === bookingId)
    if (bookingIndex === -1) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Remove the booking
    bookings.splice(bookingIndex, 1)

    return NextResponse.json({ message: "Booking deleted successfully" })
  } catch (error) {
    console.error("Error deleting booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 
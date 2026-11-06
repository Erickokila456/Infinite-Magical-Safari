import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TEMPORARY: Create a dummy user if one doesn't exist so we can test bookings
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Test Customer",
          email: "test@example.com",
          password: "password123", 
        }
      });
    }

    // Save the booking to the database, connecting the Tour and the User
    const newBooking = await prisma.booking.create({
      data: {
        tour: { connect: { id: body.tourId } },
        user: { connect: { id: user.id } },
        date: new Date(body.date),
        amount: body.amount,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { auth } from "../../auth";

export async function POST(request: Request) {
  try {
    // 1. Check if user is logged in
    const session = await auth();
    
    // 2. Reject if not logged in or not an ADMIN
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    const newTour = await prisma.tour.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        imageUrl: body.imageUrl,
        itinerary: body.itinerary,
      },
    });

    return NextResponse.json({ success: true, tour: newTour }, { status: 201 });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json({ success: false, error: "Failed to create tour" }, { status: 500 });
  }
}
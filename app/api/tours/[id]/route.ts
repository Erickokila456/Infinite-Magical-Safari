import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tour = await prisma.tour.findUnique({
      where: { id: id },
    });
    return NextResponse.json({ success: true, tour });
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 });
  }
}
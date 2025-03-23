import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";

export async function GET(req: NextRequest, context: { params: Promise<{ regNo: string }> }) {
  try {
    await connectDB();

    // Await the params to handle the asynchronous nature
    const { regNo } = await context.params;

    if (!regNo) {
      return NextResponse.json({ message: "Register number is required" }, { status: 400 });
    }

    const alumni = await Alumni.findOne({ regNo });

    if (!alumni) {
      return NextResponse.json({ message: "Alumni not found" }, { status: 404 });
    }

    return NextResponse.json(alumni, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching alumni:", error.message);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

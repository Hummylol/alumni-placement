import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";
import type { NextRequest } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }: { params: { regNo: string } }) {
  try {
    const regNo = params.regNo; 

    if (!regNo) {
      return NextResponse.json({ message: "Register number is required" }, { status: 400 });
    }

    const alumni = await Alumni.findOne({ regNo });

    if (!alumni) {
      return NextResponse.json({ message: "No alumni details found" }, { status: 404 });
    }

    return NextResponse.json(alumni, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Error fetching alumni", error: errorMessage }, { status: 500 });
  }
}

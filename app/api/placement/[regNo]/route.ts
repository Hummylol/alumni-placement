import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Placement from "@/models/Placement";

export async function GET(req: NextRequest, context: { params: Promise<{ regNo: string }> }) {
  try {
    await connectDB();

    const { regNo } = await context.params;

    if (!regNo) {
      return NextResponse.json({ message: "Register number is required" }, { status: 400 });
    }

    const student = await Placement.findOne({ regNo });

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching placement:", error.message);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

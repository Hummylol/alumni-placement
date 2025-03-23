import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db"; // Ensure you have a database connection utility
import Placement from "@/models/Placement"; // Your Placement model

export async function GET(req: NextRequest, { params }: { params: { regNo: string } }) {
  try {
    await connectDB();
    
    const { regNo } = params;
    const student = await Placement.findOne({ regNo });

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

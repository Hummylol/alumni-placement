import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";

interface AlumniData {
  regNo: string;
  alumniName: string;
  yearOfPassing: number;
  currentPosition: string;
  companyName: string;
  contact: string;
  alumniEmail: string;
  imageUrl?: string;
}

export async function GET(req: NextRequest, context: { params: Promise<{ regNo: string }> }) {
  try {
    await connectDB();

    const { regNo } = await context.params;

    if (!regNo) {
      return NextResponse.json({ message: "Register number is required" }, { status: 400 });
    }

    const alumni = await Alumni.findOne({ regNo }).lean<AlumniData & { _id?: unknown; __v?: number }>();

    if (!alumni) {
      return NextResponse.json({ message: "Alumni not found" }, { status: 404 });
    }

    const { _id, __v, ...cleanAlumni } = alumni;

    return NextResponse.json(cleanAlumni, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching alumni:", error.message);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

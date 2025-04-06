import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const alumni = await Alumni.find({}).lean();
    return NextResponse.json(alumni, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch alumni", error: error.message }, { status: 500 });
  }
}

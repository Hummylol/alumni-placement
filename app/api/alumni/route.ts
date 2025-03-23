import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { regNo, alumniName, yearOfPassing, currentPosition, companyName, contact, alumniEmail } = await req.json();

    if (!regNo || !alumniName || !yearOfPassing || !currentPosition || !companyName || !contact || !alumniEmail) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newAlumni = new Alumni({ regNo, alumniName, yearOfPassing, currentPosition, companyName, contact, alumniEmail });
    await newAlumni.save();

    return NextResponse.json({ message: "Alumni added successfully!" }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: "Error adding alumni", error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const regNo = searchParams.get("regNo");

    if (!regNo) {
      return NextResponse.json({ message: "Register number is required" }, { status: 400 });
    }

    const alumni = await Alumni.findOne({ regNo });

    if (!alumni) {
      return NextResponse.json({ message: "Alumni not found" }, { status: 404 });
    }

    return NextResponse.json(alumni, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: "Error fetching alumni", error: err.message }, { status: 500 });
  }
}

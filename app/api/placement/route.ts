import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Placement from "@/models/Placement";

// Connect to database
connectDB();

// Handle **POST** request (Add Placement Details)
export async function POST(req: Request) {
  try {
    const { regNo, company, studentName, package: pkg, location, dateOfJoining, role } = await req.json();

    // Validate input
    if (!regNo || !company || !studentName || !pkg || !location || !dateOfJoining || !role) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newPlacement = new Placement({ regNo, company, studentName, package: pkg, location, dateOfJoining, role });
    await newPlacement.save();

    return NextResponse.json({ message: "Placement added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding placement", error }, { status: 500 });
  }
}

// Handle **GET** request (Fetch Placement Details by Reg No)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const regNo = searchParams.get("regNo");

    if (!regNo) {
      return NextResponse.json({ message: "Register number is required" }, { status: 400 });
    }

    const placement = await Placement.findOne({ regNo });
    if (!placement) {
      return NextResponse.json({ message: "No placement details found" }, { status: 404 });
    }

    return NextResponse.json(placement, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching placement", error }, { status: 500 });
  }
}

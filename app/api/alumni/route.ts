import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";

connectDB();

export async function POST(req: Request) {
  try {
    const { regNo, alumniName, yearOfPassing, currentPosition, companyName, contact, alumniEmail } = await req.json();

    if (!regNo || !alumniName || !yearOfPassing || !currentPosition || !companyName || !contact || !alumniEmail) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newAlumni = new Alumni({
      regNo,
      alumniName,
      yearOfPassing,
      currentPosition,
      companyName,
      contact,
      alumniEmail,
    });

    await newAlumni.save();

    return NextResponse.json({ message: "Alumni added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding alumni", error }, { status: 500 });
  }
}

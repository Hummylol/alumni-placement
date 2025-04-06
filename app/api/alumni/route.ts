import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Alumni from "@/models/Alumni";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      regNo,
      alumniName,
      ug,
      pg,
      batchFrom,
      batchTo,
      alumniEmail,
      contact,
      address,
      occupation,
      organisation,
      jobLocation,
      webpage,
      linkedin,
      facebook,
      twitter,
      youtube,
      otherSocial,
      interactWithJuniors,
      attendMeet,
      contributeScheme,
      imageUrl,
    } = body;

    const required = [
      regNo,
      alumniName,
      ug,
      batchFrom,
      batchTo,
      alumniEmail,
      contact,
      address,
      occupation,
      organisation,
      jobLocation,
    ];

    if (required.some(field => !field)) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 });
    }

    const newAlumni = new Alumni({
      regNo,
      alumniName,
      ug,
      pg,
      batchFrom,
      batchTo,
      alumniEmail,
      contact,
      address,
      occupation,
      organisation,
      jobLocation,
      webpage,
      linkedin,
      facebook,
      twitter,
      youtube,
      otherSocial,
      interactWithJuniors,
      attendMeet,
      contributeScheme,
      imageUrl,
    });

    await newAlumni.save();
    return NextResponse.json({ message: "Alumni added successfully!" }, { status: 201 });

  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: "Error adding alumni", error: err.message }, { status: 500 });
  }
}

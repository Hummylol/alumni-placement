"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

const AlumniPage = () => {
  const [viewMode, setViewMode] = useState<"add" | "view" | null>(null);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Alumni Details</h2>

      <div className="flex gap-4">
        <Button text="Add Alumni" onClick={() => setViewMode("add")} />
        <Button text="View Alumni" onClick={() => setViewMode("view")} />
      </div>

      {viewMode === "add" && (
        <form className="mt-4 flex flex-col gap-4">
          <FormInput label="Register Number" id="regNo" />
          <FormInput label="Alumni Name" id="alumniName" />
          <FormInput label="Year of Passing" id="yearOfPassing" type="number" />
          <FormInput label="Current Position" id="currentPosition" />
          <FormInput label="Company Name (Current)" id="companyName" />
          <FormInput label="Contact Information" id="contact" />
          <FormInput label="Email" id="alumniEmail" type="email" />
          <Button text="Submit" type="submit" />
        </form>
      )}

      {viewMode === "view" && (
        <div className="mt-4 flex flex-col gap-4">
          <FormInput label="Enter Register Number" id="searchRegNo" />
          <Button text="Search" onClick={() => alert("Fetching alumni details...")} />
        </div>
      )}
    </div>
  );
};

export default AlumniPage;

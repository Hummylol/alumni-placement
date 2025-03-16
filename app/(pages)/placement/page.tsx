"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

const PlacementPage = () => {
  const [viewMode, setViewMode] = useState<"add" | "view" | null>(null);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Placement Details</h2>
      
      <div className="flex gap-4">
        <Button text="Add Placement" onClick={() => setViewMode("add")} />
        <Button text="View Placement" onClick={() => setViewMode("view")} />
      </div>

      {viewMode === "add" && (
        <form className="mt-4 flex flex-col gap-4">
          <FormInput label="Register Number" id="regNo" />
          <FormInput label="Company Name" id="company" />
          <FormInput label="Student Name" id="studentName" />
          <FormInput label="Package (in Lakhs)" id="package" type="number" />
          <FormInput label="Job Location" id="location" />
          <FormInput label="Date of Joining" id="dateOfJoining" type="date" />
          <FormInput label="Role" id="role" />
          <Button text="Submit" type="submit" />
        </form>
      )}

      {viewMode === "view" && (
        <div className="mt-4 flex flex-col gap-4">
          <FormInput label="Enter Register Number" id="searchRegNo" />
          <Button text="Search" onClick={() => alert("Fetching placement details...")} />
        </div>
      )}
    </div>
  );
};

export default PlacementPage;

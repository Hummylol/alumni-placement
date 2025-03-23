"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

const PlacementPage = () => {
  const [viewMode, setViewMode] = useState<"add" | "view" | null>(null);
  
  // Form state for adding placement
  const [formData, setFormData] = useState({
    regNo: "",
    company: "",
    studentName: "",
    package: "",
    location: "",
    dateOfJoining: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  // State for viewing placement
  const [searchRegNo, setSearchRegNo] = useState("");
  const [studentData, setStudentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle adding placement
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Placement details added successfully!");
        setFormData({
          regNo: "",
          company: "",
          studentName: "",
          package: "",
          location: "",
          dateOfJoining: "",
          role: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRegNo(e.target.value);
  };

  // Fetch placement details
  const fetchPlacementDetails = async () => {
    if (!searchRegNo.trim()) {
      setError("Please enter a register number.");
      return;
    }

    setSearchLoading(true);
    setError(null);
    setStudentData(null);

    try {
      const response = await fetch(`/api/placement/${searchRegNo}`);
      const data = await response.json();

      if (response.ok) {
        setStudentData(data);
      } else {
        setError(data.message || "Student not found.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Placement Details</h2>

      <div className="flex gap-4">
        <Button text="Add Placement" onClick={() => setViewMode("add")} />
        <Button text="View Placement" onClick={() => setViewMode("view")} />
      </div>

      {/* Add Placement Section */}
      {viewMode === "add" && (
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput label="Register Number" id="regNo" value={formData.regNo} onChange={handleChange} />
          <FormInput label="Company Name" id="company" value={formData.company} onChange={handleChange} />
          <FormInput label="Student Name" id="studentName" value={formData.studentName} onChange={handleChange} />
          <FormInput label="Package (in Lakhs)" id="package" type="number" value={formData.package} onChange={handleChange} />
          <FormInput label="Job Location" id="location" value={formData.location} onChange={handleChange} />
          <FormInput label="Date of Joining" id="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} />
          <FormInput label="Role" id="role" value={formData.role} onChange={handleChange} />
          <Button text={loading ? "Submitting..." : "Submit"} type="submit" disabled={loading} />
        </form>
      )}

      {/* View Placement Section */}
      {viewMode === "view" && (
        <div className="mt-4 flex flex-col gap-4">
          <FormInput
            label="Enter Register Number"
            id="searchRegNo"
            value={searchRegNo}
            onChange={handleSearchChange}
          />
          <Button text={searchLoading ? "Searching..." : "Search"} onClick={fetchPlacementDetails} disabled={searchLoading} />

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Student Details */}
          {studentData && (
            <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Student Details</h3>
              <p><strong>Reg No:</strong> {studentData.regNo}</p>
              <p><strong>Name:</strong> {studentData.studentName}</p>
              <p><strong>Company:</strong> {studentData.company}</p>
              <p><strong>Package:</strong> {studentData.package} LPA</p>
              <p><strong>Location:</strong> {studentData.location}</p>
              <p><strong>Date of Joining:</strong> {studentData.dateOfJoining}</p>
              <p><strong>Role:</strong> {studentData.role}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlacementPage;

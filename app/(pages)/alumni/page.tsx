"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

const AlumniPage = () => {
  const [viewMode, setViewMode] = useState<"add" | "view" | null>(null);

  // Form state for adding alumni
  const [formData, setFormData] = useState({
    regNo: "",
    alumniName: "",
    yearOfPassing: "",
    currentPosition: "",
    companyName: "",
    contact: "",
    alumniEmail: "",
  });
  const [loading, setLoading] = useState(false);

  // State for viewing alumni
  const [searchRegNo, setSearchRegNo] = useState("");
  const [alumniData, setAlumniData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle adding alumni
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Alumni details added successfully!");
        setFormData({
          regNo: "",
          alumniName: "",
          yearOfPassing: "",
          currentPosition: "",
          companyName: "",
          contact: "",
          alumniEmail: "",
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

  // Fetch alumni details
  const fetchAlumniDetails = async () => {
    if (!searchRegNo.trim()) {
      setError("Please enter a register number.");
      return;
    }

    setSearchLoading(true);
    setError(null);
    setAlumniData(null);

    try {
      const response = await fetch(`/api/alumni/${searchRegNo}`);
      const data = await response.json();

      if (response.ok) {
        setAlumniData(data);
      } else {
        setError(data.message || "Alumni not found.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Alumni Details</h2>

      <div className="flex gap-4">
        <Button text="Add Alumni" onClick={() => setViewMode("add")} />
        <Button text="View Alumni" onClick={() => setViewMode("view")} />
      </div>

      {/* Add Alumni Section */}
      {viewMode === "add" && (
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput label="Register Number" id="regNo" value={formData.regNo} onChange={handleChange} />
          <FormInput label="Alumni Name" id="alumniName" value={formData.alumniName} onChange={handleChange} />
          <FormInput label="Year of Passing" id="yearOfPassing" type="number" value={formData.yearOfPassing} onChange={handleChange} />
          <FormInput label="Current Position" id="currentPosition" value={formData.currentPosition} onChange={handleChange} />
          <FormInput label="Company Name" id="companyName" value={formData.companyName} onChange={handleChange} />
          <FormInput label="Contact" id="contact" value={formData.contact} onChange={handleChange} />
          <FormInput label="Email" id="alumniEmail" type="email" value={formData.alumniEmail} onChange={handleChange} />
          <Button text={loading ? "Submitting..." : "Submit"} type="submit" disabled={loading} />
        </form>
      )}

      {/* View Alumni Section */}
      {viewMode === "view" && (
        <div className="mt-4 flex flex-col gap-4">
          <FormInput
            label="Enter Register Number"
            id="searchRegNo"
            value={searchRegNo}
            onChange={handleSearchChange}
          />
          <Button text={searchLoading ? "Searching..." : "Search"} onClick={fetchAlumniDetails} disabled={searchLoading} />

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Alumni Details */}
          {alumniData && (
            <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Alumni Details</h3>
              <p><strong>Reg No:</strong> {alumniData.regNo}</p>
              <p><strong>Name:</strong> {alumniData.alumniName}</p>
              <p><strong>Year of Passing:</strong> {alumniData.yearOfPassing}</p>
              <p><strong>Current Position:</strong> {alumniData.currentPosition}</p>
              <p><strong>Company:</strong> {alumniData.companyName}</p>
              <p><strong>Contact:</strong> {alumniData.contact}</p>
              <p><strong>Email:</strong> {alumniData.alumniEmail}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlumniPage;

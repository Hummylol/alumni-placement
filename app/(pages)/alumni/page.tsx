"use client";

import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";

const ugOptions = ["CSE", "IT", "BME", "ECE", "CS", "AIDS", "AIML", "CSBS"];
const pgOptions = ["MBA", "MCA", "CE", "CEM", "PED", "AE", "SE"];

export default function AlumniPage() {
  const [mode, setMode] = useState<"add" | "view">("add");
  const [regNoSearch, setRegNoSearch] = useState("");
  const [alumniData, setAlumniData] = useState<any>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    regNo: "",
    alumniName: "",
    ug: "",
    pg: "",
    batchFrom: "",
    batchTo: "",
    alumniEmail: "",
    contact: "",
    address: "",
    occupation: "",
    organisation: "",
    jobLocation: "",
    webpage: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    youtube: "",
    otherSocial: "",
    interactWithJuniors: false,
    attendMeet: false,
    contributeScheme: false,
    imageUrl: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRadioChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "yes",
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    const res = await fetch("/api/alumni", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    alert(data.message);
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/alumni/${regNoSearch}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setAlumniData(data);
      setError("");
    } catch (err: any) {
      setAlumniData(null);
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alumni Portal</h1>
        <a
          href="/alumnidata"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          View All Alumni
        </a>
      </div>
      <div className="max-w-5xl mx-auto p-8 space-y-6">
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setMode("add")}
            className={`px-5 py-2 rounded font-semibold shadow ${mode === "add" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Add Alumni
          </button>
          <button
            onClick={() => setMode("view")}
            className={`px-5 py-2 rounded font-semibold shadow ${mode === "view" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            View Alumni
          </button>
        </div>

        {mode === "add" ? (
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-lg">
            {/* Image upload */}
            <div>
              <label className="block font-semibold mb-2">Upload Photo</label>
              <CldUploadButton
                uploadPreset="alumni_uploads"
                onSuccess={(result: any) => {
                  const url = result?.info?.secure_url;
                  if (url) setFormData((prev) => ({ ...prev, imageUrl: url }));
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload
              </CldUploadButton>

              {formData.imageUrl && (
                <div className="mt-4">
                  <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded border" />
                </div>
              )}
            </div>

            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Personal Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["regNo", "alumniName", "batchFrom", "batchTo", "alumniEmail", "contact", "address"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Work */}
            <div>
              <h3 className="text-lg font-bold mb-4">Education & Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">UG Department</label>
                  <select name="ug" value={formData.ug} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select UG</option>
                    {ugOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">PG Department</label>
                  <select name="pg" value={formData.pg} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select PG</option>
                    {pgOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                {["occupation", "organisation", "jobLocation"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-lg font-bold mb-4">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["webpage", "linkedin", "facebook", "twitter", "youtube", "otherSocial"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 font-medium capitalize">{field}</label>
                    <input
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-bold mb-4">Preferences</h3>
              <div className="space-y-4">
                {[
                  { name: "interactWithJuniors", label: "Willing to interact with juniors?" },
                  { name: "attendMeet", label: "Willing to attend meets?" },
                  { name: "contributeScheme", label: "Willing to contribute to schemes?" },
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center gap-6">
                    <span className="w-64 font-medium">{label}</span>
                    <label>
                      <input
                        type="radio"
                        name={name}
                        value="yes"
                        checked={(formData as any)[name] === true}
                        onChange={handleRadioChange}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={name}
                        value="no"
                        checked={(formData as any)[name] === false}
                        onChange={handleRadioChange}
                        className="mr-1"
                      />
                      No
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg shadow">
              Submit
            </button>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <input
              value={regNoSearch}
              onChange={(e) => setRegNoSearch(e.target.value)}
              placeholder="Enter Register Number"
              className="border px-4 py-2 rounded w-full"
            />
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
              Search
            </button>

            {error && <p className="text-red-600">{error}</p>}

            {alumniData && (
              <div className="space-y-2">
                {alumniData.imageUrl && (
                  <div className="text-center">
                    <img src={alumniData.imageUrl} alt="Alumni" className="w-40 h-40 object-cover rounded mx-auto" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-center">{alumniData.alumniName}</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Register No:</strong> {alumniData.regNo}</p>
                  <p><strong>Email:</strong> {alumniData.alumniEmail}</p>
                  <p><strong>UG:</strong> {alumniData.ug}</p>
                  <p><strong>PG:</strong> {alumniData.pg}</p>
                  <p><strong>Organisation:</strong> {alumniData.organisation}</p>
                  <p><strong>Occupation:</strong> {alumniData.occupation}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

interface AlumniData {
  regNo: string;
  alumniName: string;
  ug: string;
  pg: string;
  batchFrom: number;
  batchTo: number;
  alumniEmail: string;
  contact: string;
  address: string;
  occupation: string;
  organisation: string;
  jobLocation: string;
  webpage?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  otherSocial?: string;
  interactWithJuniors: boolean;
  attendMeet: boolean;
  contributeScheme: boolean;
  imageUrl?: string;
}

export default function AlumniDataPage() {
  const [alumniList, setAlumniList] = useState<AlumniData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("/api/alumni/all");
      const data = await res.json();
      setAlumniList(data);
    };
    fetchAll();
  }, []);

  const years = Array.from({ length: 27 }, (_, i) => 2000 + i);

  const filteredAlumni = selectedYear
    ? alumniList.filter((alumni) => alumni.batchTo === selectedYear)
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Alumni</h1>
        <a
          href="/alumni"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Alumni Page
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {years.map((year) => (
          <button
            key={year}
            className={`px-3 py-2 rounded border ${
              selectedYear === year
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {selectedYear && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Alumni of {selectedYear}
          </h2>

          {filteredAlumni.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((alumni) => (
                <div
                  key={alumni.regNo}
                  className="border rounded p-4 bg-white shadow"
                >
                  {alumni.imageUrl && (
                    <img
                      src={alumni.imageUrl}
                      alt={alumni.alumniName}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-lg font-bold">{alumni.alumniName}</h3>
                  <p className="text-sm text-gray-600">{alumni.occupation} at {alumni.organisation}</p>
                  <p>Reg No: {alumni.regNo}</p>
                  <p>Email: {alumni.alumniEmail}</p>
                  <p>Contact: {alumni.contact}</p>
                  <p>Batch: {alumni.batchFrom} - {alumni.batchTo}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No alumni found for {selectedYear}.</p>
          )}
        </div>
      )}
    </div>
  );
}

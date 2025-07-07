import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { Link } from "react-router-dom";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (scannedData) {
      const stored = localStorage.getItem("familyMembers");
      const members = stored ? JSON.parse(stored) : [];

      console.log("Scanned QR Data:", scannedData); // debug
      console.log("Stored Members:", members); // debug

      const found = members.find((m) => m.qrId === scannedData);
      setMember(found || null);
    }
  }, [scannedData]);

  return (
    <div className="min-h-screen bg-[#E6FAF5] py-10 px-4 md:px-10 text-center">
      <h2 className="text-3xl font-bold text-[#008080] mb-6">
        Volunteer QR Scan
      </h2>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setScannedData(result?.text);
            }
            if (!!error) {
              console.warn(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "100%" }}
        />
      </div>

      <div className="mt-6">
        {member ? (
          <div className="bg-white p-6 mt-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-[#00A896] mb-2">
              Match Found
            </h3>
            <p>Name: {member.name}</p>
            <p>Age: {member.age}</p>
            <p>Gender: {member.gender}</p>
            <p>Relation: {member.relation}</p>
            <p>Contact: {member.contact}</p>
            {member.specialInfo && <p>Note: {member.specialInfo}</p>}
          </div>
        ) : scannedData ? (
          <p className="text-red-600 font-semibold mt-4">
            No matching member found.
          </p>
        ) : (
          <p className="text-gray-600">
            Scan a QR code to search for a family member.
          </p>
        )}
      </div>

      <Link
        to="/"
        className="inline-block mt-6 text-sm text-[#008080] hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default QRScanner;

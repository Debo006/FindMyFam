import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const FamilyMemberCard = ({ member, onEdit, onDelete }) => {
  const canvasRef = useRef(null);

  const handleDownloadQR = () => {
    const canvas = canvasRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${member.name}_qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center relative">
      <img
        src={member.photo}
        alt={member.name}
        className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-[#008080]">{member.name}</h3>
      <p className="text-gray-700">Age: {member.age}</p>
      <p className="text-gray-700">Gender: {member.gender}</p>
      <p className="text-gray-700">Relation: {member.relation}</p>
      <p className="text-gray-700">Contact: {member.contact}</p>
      {member.specialInfo && (
        <p className="text-sm text-gray-500 italic mt-1">
          Special Info: {member.specialInfo}
        </p>
      )}

      {/* QR Code */}
      <div ref={canvasRef} className="my-4">
        <QRCodeCanvas value={member.qrId} size={100} />
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          className="bg-[#00A896] text-white px-4 py-2 rounded-lg hover:bg-[#007F72] transition-all"
          onClick={() => {
            onEdit(member);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          onClick={() => onDelete(member)}
        >
          Delete
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          onClick={handleDownloadQR}
        >
          Download QR
        </button>
      </div>
    </div>
  );
};

export default FamilyMemberCard;

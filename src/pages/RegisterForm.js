import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import FamilyMemberCard from "../components/FamilyMemberCard";
import { v4 as uuidv4 } from "uuid";

const RegisterForm = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    relation: "",
    contact: "",
    specialInfo: "",
    photo: null,
    qrId: "",
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("familyMembers");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("familyMembers", JSON.stringify(members));
  }, [members]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    if (!formData.qrId) {
      dataToSave.qrId = uuidv4(); // Generate unique QR ID
    }

    if (editingIndex !== null) {
      const updated = [...members];
      updated[editingIndex] = dataToSave;
      setMembers(updated);
      setEditingIndex(null);
    } else {
      setMembers((prev) => [...prev, dataToSave]);
    }

    setFormData({
      name: "",
      age: "",
      gender: "",
      relation: "",
      contact: "",
      specialInfo: "",
      photo: null,
      qrId: "",
    });
  };

  const handleDelete = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
    if (editingIndex === index) {
      setFormData({
        name: "",
        age: "",
        gender: "",
        relation: "",
        contact: "",
        specialInfo: "",
        photo: null,
        qrId: "",
      });
      setEditingIndex(null);
    }
  };

  const handleEdit = (index) => {
    const member = members[index];
    setFormData(member);
    setEditingIndex(index);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    members.forEach((member, index) => {
      const y = 10 + index * 50;
      pdf.text(`Name: ${member.name}`, 10, y);
      pdf.text(`Age: ${member.age}`, 10, y + 6);
      pdf.text(`Gender: ${member.gender}`, 10, y + 12);
      pdf.text(`Relation: ${member.relation}`, 10, y + 18);
      pdf.text(`Contact: ${member.contact}`, 10, y + 24);
      if (member.specialInfo) {
        pdf.text(`Special Info: ${member.specialInfo}`, 10, y + 30);
      }
      pdf.text(`QR ID: ${member.qrId}`, 10, y + 36);
    });
    pdf.save("registered_family_members.pdf");
  };

  return (
    <div className="min-h-screen bg-[#E6FAF5] py-10 px-4 md:px-10">
      <div
        ref={formRef}
        className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-10"
      >
        <h2 className="text-3xl font-bold text-center text-[#008080] mb-6">
          {editingIndex !== null
            ? "Edit Family Member"
            : "Register a Family Member"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="number"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Relation</label>
            <select
              name="relation"
              required
              value={formData.relation}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Brother</option>
              <option>Sister</option>
              <option>Son</option>
              <option>Daughter</option>
              <option>Relative</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Emergency Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Special Info or Condition
            </label>
            <textarea
              name="specialInfo"
              value={formData.specialInfo}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Upload Recent Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 bg-[#00A896] text-white font-semibold rounded-xl hover:bg-[#007F72] hover:scale-105 transition-all duration-300"
          >
            {editingIndex !== null ? "Update Member" : "Submit Family Member"}
          </button>
        </form>

        <Link
          to="/"
          className="inline-block mt-6 text-sm text-[#008080] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      {members.length > 0 && (
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-[#008080]">
              Registered Members Preview
            </h3>
            <button
              onClick={handleDownloadPDF}
              className="py-2 px-4 bg-[#00A896] text-white rounded-lg hover:bg-[#007F72] hover:scale-105 transition-all duration-300"
            >
              Download PDF
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <FamilyMemberCard
                key={index}
                member={member}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;

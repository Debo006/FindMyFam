import React, { useEffect, useState } from "react";
import FamilyMemberCard from "../components/FamilyMemberCard";
import { Link } from "react-router-dom";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [relationFilter, setRelationFilter] = useState("All");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    const saved = localStorage.getItem("familyMembers");
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  const filtered = members
    .filter((member) => {
      const matchesSearch = (member.name + member.relation + member.contact)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "All" || member.gender === genderFilter;

      const matchesRelation =
        relationFilter === "All" || member.relation === relationFilter;

      return matchesSearch && matchesGender && matchesRelation;
    })
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "age") {
        return parseInt(a.age) - parseInt(b.age);
      } else if (sortOption === "relation") {
        return a.relation.localeCompare(b.relation);
      } else {
        return 0;
      }
    });

  // 📊 Statistics
  const total = members.length;
  const totalMale = members.filter((m) => m.gender === "Male").length;
  const totalFemale = members.filter((m) => m.gender === "Female").length;
  const totalOther = members.filter(
    (m) => m.gender !== "Male" && m.gender !== "Female"
  ).length;

  const uniqueRelations = [
    "All",
    ...new Set(members.map((m) => m.relation).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-[#E6FAF5] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#008080]">
            All Registered Members
          </h2>
          <Link to="/" className="text-[#008080] hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* 🧮 Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-xl font-bold text-[#00A896]">{total}</h4>
            <p className="text-sm text-gray-600">Total Members</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-xl font-bold text-[#00A896]">{totalMale}</h4>
            <p className="text-sm text-gray-600">Males</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-xl font-bold text-[#00A896]">{totalFemale}</h4>
            <p className="text-sm text-gray-600">Females</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-xl font-bold text-[#00A896]">{totalOther}</h4>
            <p className="text-sm text-gray-600">Others</p>
          </div>
        </div>

        {/* 🔍 Search + Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name, relation, contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-1 md:col-span-2 border border-gray-300 p-3 rounded-lg focus:ring-[#00A896]"
          />

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={relationFilter}
            onChange={(e) => setRelationFilter(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          >
            {uniqueRelations.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mb-4">
          <label className="mr-2 text-sm font-medium">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="relation">Relation</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-600">No matching members found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((member, index) => (
              <FamilyMemberCard key={index} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMembers;

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function MainPageFMF() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth status on load
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login"); // 👈 redirect to login page immediately
  };

  return (
    <div className="min-h-screen bg-[#E6FAF5] text-gray-900 font-sans">
      {/* Hero */}
      <section className="bg-white py-20 px-6 text-center shadow-sm">
        <h1 className="text-5xl font-extrabold mb-4 text-[#008080]">
          FindMyFam
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-700">
          Keeping families connected in crowded places using AI and compassion.
        </p>

        <div className="space-x-4 flex flex-wrap justify-center">
          {/* Register */}
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-[#00A896] text-white rounded-2xl font-medium transition-all duration-300 hover:bg-[#007F72] hover:scale-105"
          >
            Register Family
          </button>

          {/* Volunteer Login or Logout */}
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-white border border-gray-300 text-[#008080] rounded-2xl transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              Volunteer Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-2xl transition-all duration-300 hover:bg-red-600 hover:scale-105"
            >
              Logout
            </button>
          )}

          {/* QR Scanner */}
          <Link to="/scan">
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all">
              Volunteer QR Scan
            </button>
          </Link>

          {/* View All Members */}
          <Link to="/members">
            <button className="px-6 py-3 bg-[#008080] text-white rounded-xl hover:bg-[#007066]">
              View All Members
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10 text-[#008080]">
          Why FindMyFam?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Pre-Registration",
            "Facial Recognition",
            "Missing Poster Generator",
          ].map((title, index) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2 text-[#00A896]">{title}</h3>
              <p className="text-gray-700">
                {index === 0 &&
                  "Register family members with photos and emergency details."}
                {index === 1 &&
                  "Use AI to identify lost persons using their photo."}
                {index === 2 &&
                  "Instantly create shareable posters with a tap."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-[#008080]">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {["1. Register", "2. Get QR & Face Data", "3. Reunite"].map(
            (step, index) => (
              <div
                key={step}
                className="bg-[#D1F2EB] p-6 rounded-2xl shadow-md transform transition-transform duration-300 hover:scale-105"
              >
                <h4 className="text-xl font-bold mb-2 text-[#007F72]">
                  {step}
                </h4>
                <p className="text-gray-700">
                  {index === 0 &&
                    "Add family details, photos, and emergency contacts."}
                  {index === 1 &&
                    "Receive QR badges or store face data securely."}
                  {index === 2 &&
                    "Use app to find or report missing members instantly."}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CFF5EC] text-center py-16 text-gray-900">
        <h2 className="text-3xl font-bold mb-4">
          Start Protecting Your Loved Ones
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Join thousands of families who trust FindMyFam.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-4 bg-[#00A896] text-white font-medium rounded-xl transition-all duration-300 hover:bg-[#007F72] hover:scale-105"
        >
          Register Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>
          © 2025 FindMyFam |{" "}
          <a href="#" className="underline">
            Privacy
          </a>{" "}
          |{" "}
          <a href="#" className="underline">
            Contact
          </a>
        </p>
      </footer>
    </div>
  );
}

export default MainPageFMF;

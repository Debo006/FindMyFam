import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent user from using back button after logout
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "volunteer123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/"); // redirect to main page after successful login
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E6FAF5] flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-[#008080] mb-4">
          Welcome to FindMyFam
        </h1>
        <p className="mb-6 text-gray-700">
          FindMyFam helps families stay connected in large crowds using AI, QR
          codes, and volunteer support.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Volunteer Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-[#00A896] text-white px-6 py-2 rounded hover:bg-[#007F72]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

 

  const handleLogin = async () => {
    try {

        setLoading(true)
        setError("")

    const response = await fetch(
      "http://localhost:5000/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
        setError(data.message || "Login failed")
          return;
    }
      localStorage.setItem(
        "token",
        data.token
      );

      window.location.href =
        "/admin/brands";
    } 
      catch (error) {
        setError("Server connection failed")
      } finally {
        setLoading(false)
      }

  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl w-96">

        <h1 className="text-2xl font-bold mb-6 text-white">
          Admin Login
        </h1>

        <input
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        {
          error && (
            <p className="text-red-500 mb-4" >{error}</p>
          )
        }

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 p-3 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}
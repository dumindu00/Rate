"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

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

    if (data.token) {

      localStorage.setItem(
        "token",
        data.token
      );

      window.location.href =
        "/admin/brands";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-gray-50 p-8 rounded-xl w-96">

        <h1 className="text-2xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          className="w-full p-3 mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}
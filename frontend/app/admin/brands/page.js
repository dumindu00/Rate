"use client"

import {  useEffect, useState } from "react"
import ImageUploader from "@/components/ImageUploader"

export default function AdminBrands() {
    const [name, setName] = useState("")
    const [logoUrl, setLogoUrl] = useState("")
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [category, setCategory] = useState("Technology")


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/admin/login";
        }
    }, [])





    const createBrand = async () => {

        if (!logoUrl) {
            setIsSuccess(false)
            setMessage("Cannot create brand. Please upload a logo first.")
            return
        }

        if (!name.trim()) {
            setIsSuccess(false);
            setMessage("Brand name is required.")
            return
        }

        try {

        const token = localStorage.getItem(
            "token"
        )

        const response = await fetch (
            "http://localhost:5000/brands",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name,
                    category,
                    logoUrl
                })
            }
        )

        const data = await response.json();

        if (!response.ok) {
            setIsSuccess(false)
            setMessage(
                data.message || "Failed to create brand")

            return;
        }

        setIsSuccess(true)
        setMessage("Brand created successfully ✅")
        setName("")
        setLogoUrl("")

    } catch (error) {

        setIsSuccess(false)
        setMessage (
            "Failed to create brand due to a network error"
        )
    }
}

    return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center p-10">

        <div className="w-full max-w-2xl">

        <h1 className="text-4xl font-bold mb-8">
            Brand Management
        </h1>

        <button
            className="flex w-full justify-end m-5"
        >
            Logout
        </button>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold mb-6">
            Add New Brand
            </h2>

            <input
            value={name}
            onChange={(e) =>
                setName(e.target.value)
            }
            placeholder="Brand Name"
            className="w-full p-3 bg-gray-800 rounded mb-4"
            />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded mb-4"
                >
                    <option>Entertainment</option>
                    <option>Consumer</option>
                    <option>Technology</option>
                    <option>Education</option>
                    <option>Sports</option>
                    <option>Automobile</option>
                    <option>Fashion</option>

                </select>

            <ImageUploader
            onUpload={setLogoUrl}
            />

            {logoUrl && (
            <div className="mt-4">

                <p className="mb-2 text-gray-400">
                Logo Preview
                </p>

                <img
                src={logoUrl}
                alt="Preview"
                className="w-32 h-32 object-contain bg-white rounded p-2"
                />

            </div>
            )}

            {message && (
            <p className={`mt-4 ${isSuccess ?  'text-green-400' : 'text-red-400'}`}>
                {message}
            </p>
            )}

            <button
            onClick={createBrand}
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
            Create Brand
            </button>

        </div>

        </div>

    </div>
)
}
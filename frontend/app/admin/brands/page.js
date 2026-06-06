"use client"

import { useState } from "react"
import ImageUploader from "@/components/ImageUploader"

export default function AdminBrands() {
    const [name, setName] = useState("")
    const [logoUrl, setLogoUrl] = useState("")
    
    const createBrand = async () => {
        const token = localStorage.getItem(
            "token"
        )

        await fetch (
            "http://localhost:5000/brands",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name,
                    logoUrl
                })
            }
        )

    }

    return (
        <div className="p-8">

            <h1>Add Brand</h1>

            <input
                value={name}
                onChange={(e) => {
                    setName(
                        e.target.value
                    )
                }}
                placeholder="Brand Name"
            />

            <ImageUploader
                onUpload={
                    setLogoUrl
                }
            />

            <button
                onClick={createBrand}
            >
                Create Brand
            </button>

        </div>
    )
}
"use client";


import { useState } from "react";



export default function ImageUploader({
    onUpload
}) {
    const [loading, setLoading] = useState(false)

    const handleFileChange =async (
        e
    ) => {
        const file = e.target.files[0]

        if (!file) return

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            setLoading(true);

            const token = localStorage.getItem("token")

            const response = await fetch(
                "http://localhost:5000/upload/logo",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        image: reader.result
                    })
                }
            )

            const data = await response.json()

            onUpload(
                data.imageUrl
            )

            setLoading(false)
        }
    }

    return (
        <div>

            <input 
                type="text" 
                accept="image/*"
                onChange={
                    handleFileChange
                }    
            />

            {
                loading && (
                    <p>
                        Uploading...
                    </p>
                )
            }

        </div>
    )
}

"use client";


import { useState } from "react";



export default function ImageUploader({
    onUpload
}) {
    const [loading, setLoading] = useState(false)
    const [uploadError, setUploadError] = useState("")


    const handleFileChange =async ( e ) => {
        const file = e.target.files[0]

        if (!file) return

        setUploadError("")

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            setLoading(true);


            try {
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

            if (!response.ok) {
                throw new Error(data.message || "Upload failed on server")
            }

            if (data.logoUrl) {
                    onUpload(data.logoUrl)
                } else {
                    throw new Error("Sever did not return logoUrl")
                }

            } catch (err) {
                console.error("Upload error details:", err);
                setUploadError(err.message);
                onUpload("");
            } finally {   
            setLoading(false)
            }
        }
    }

   return (
  <div className="mt-4">

    <label className="block mb-2 text-gray-400">
      Brand Logo
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-300"
    />

    {loading && (
      <p className="mt-2 text-blue-400">
        Uploading to server...
      </p>
    )}
    {uploadError && (
      <p className="mt-2text-red-400">Error: {uploadError}
      </p>
    )}

  </div>
);
}

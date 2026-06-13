"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import BackToTopButton from "@/components/BackToTopButton"


export default function BrandsPage()  {

    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState("All")



    const categories = [
            "All",
            "Entertainment",
            "Consumer",
            "Automobile",
            "Sports",
            "Fashion",
            "Technology",
            "Education"
        ];



    const fetchBrands = async () => {

        try {
            
            const response = await fetch(
                `http://localhost:5000/brands?category=${category}`
            )

            const data = await response.json()

            setBrands(data)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        let voterId = localStorage.getItem("voterId");

        if (!voterId) {
            voterId = crypto.randomUUID()

            localStorage.setItem(
                "voterId",
                voterId
            )
        }

        fetchBrands()
    }, [category]);

    const vote = async (
        brandId,
        voteType
    ) => {

        try {
            const voterId = localStorage.getItem("voterId")

            const response = await fetch(`http://localhost:5000/brands/${brandId}/vote`, {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    userId: voterId,
                    vote: voteType
                })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message)
                return
            }

            fetchBrands();
        } catch (error) {
            console.error(error)
        } 

    }

    if(loading) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">

                Loading Brands...
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">



        <header className="mb-11 ">
            <h1 className="text-5xl font-bold mb-10">Brand Voting</h1>
            <p>Vote for your favorites Brands</p>
            
            <Navbar/>

            <BackToTopButton/>
    </header>


                <div className="flex flex-wrap gap-3 mb-8">

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-lg transition ${
                                category === cat
                                        ? "bg-blue-600"
                                        : "bg-gray-800"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}

                </div>



            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">

                    {
                        brands.map((brand) => (
                            <div
                                key={brand._id}
                                className="bg-green-900 rounded-xl p-5 text-center shadow-lg"
                            >
                                <h2 className="font-bold text-lg mb-4">{brand.name}</h2>


                                <img
                                    src={brand.logoUrl}
                                    alt={brand.name}
                                    className="w-24 h-24 object-contain mx-auto mb-4 bg-white rounded-lg p-2"
                                />

                                <p className="text-xs text-gray-400 mb-3">{brand.category}</p>

                                <p className="text-2xl font-bold text-green-400 mb-4">
                                    {brand.percentage}%
                                </p>

                                <div className="flex justify-center gap-4">

                                    <button
                                        onClick={() => vote(brand._id, "like")}
                                        className="text-2xl hover:scale-110 transition"
                                    >
                                            👍
                                    </button>

                                    <button
                                        onClick={() => vote(brand._id, "dislike")}
                                        className="text-2xl hover:scale-110 transition"
                                    >
                                        👎
                                    </button>

                                </div>

                                <div className="mt-4 text-sm text-taupe-400">

                                    <p>Likes: {brand.likes}</p>

                                    <p>Dislikes: {brand.dislikes}</p>
                                </div>

                            </div>
                        ))
                    }

            </div>
        </div>
    )
};

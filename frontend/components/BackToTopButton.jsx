import { useEffect, useState } from "react";


export default function BackToTopButton() {
    
    const [visible, setVisible] = useState(false)

    useEffect(() => {

        const handleScroll = () => {
            
            if (window.scrollY > 500) {
                setVisible(true)
            } else {
                setVisible(false)
            }
        }

        window.addEventListener(
            "scroll",
            handleScroll
        )

        return () => 
            window.removeEventListener(
                "scroll",
                handleScroll
            )
    }, [])


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    if (!visible) return null

    return (

        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg z-50 text-xl" >
            ↑
        </button>
    )
}
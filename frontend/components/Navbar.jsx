import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="bg-gray-900 px-8 py-4 flex justify-between items-center rounded-2xl">

            <div className="flex gap-4 justify-end w-full">

                <Link
                    href="/"
                    className="hover:text-blue-400"
                >
                    Events
                </Link>
                <Link
                    href="/brand"
                    className="hover:text-blue-400"
                >
                    Brand Voting
                </Link>
            </div>
        </nav>
    )
}
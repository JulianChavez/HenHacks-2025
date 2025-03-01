import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <div>
            <div id = "header" className="rounded-box">
                <div id = "subsection">
                    <p> Welcome, User</p>
                </div>
                <div id ="Logout-section">
                    <Link href="/" className="px-4 py-2 rounded-md bg-black text-white hover:underline hover:bg-gray-800">Logout</Link>
                </div>
                
            </div>
        </div>
    )
}

import React from "react";
import blood_logo from "../../public/blood_logo.png";
import Link from "next/link";
//Landing page
export default function Home() {
  return (
    <div>
      <div id = "header" className="rounded-box">
        <div id = "Logo">
          <img src={blood_logo.src} alt="Blood Logo" width={100} height={100} />
        </div>
        <div id = "subsection">
          <nav className="flex gap-6">
            <a href="#main-section" className="hover:underline">Home</a>
            <a href="#about-section" className="hover:underline">About</a>
            <a href="#about-us-section" className="hover:underline">About Us</a>
          </nav>
        </div>
        <div id = "login">
          <Link href="/login" className="px-4 py-2 rounded-md bg-blue-500 text-white hover:underline hover:bg-blue-600">Login</Link>
        </div>
      </div>
      <div id = "main-section">

      </div>
      <div id = "about-section">
      </div>
      <div id = "about-us-section">
      </div>
    </div>
  );
}
 
import React from "react";
import blood_logo from "../../public/blood_logo.png";
import Link from "next/link";
import Bell_headshot from "../../public/Bell_headshot.jpg";
import Julian_headshot from "../../public/Julian_headshot.jpg";
import Jack_headshot from "../../public/Jack_headshot.jpg";
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
        <h1 className = "text-center text-2xl font-bold">Welcome to Bloodlens</h1>
        <p className = "text-center text-lg">Your AI-powered blood analysis tool, Login and upload your blood test results to generate a report and summary.</p>
        <p className = "text-center text-lg">Learn more about your health!</p>
      </div>
      <div id = "about-section">
      </div>
      <div id = "about-us-section">
        <h1 className = "text-center text-2xl font-bold">About Us</h1>
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex flex-col items-center">
            <img 
              src={Bell_headshot.src} 
              alt="Team Member 1"
              className="w-48 h-48 rounded-full object-cover shadow-lg shadow-amber-300"
            />
            <h3 className="mt-4 font-semibold text-lg">Bella Goltser</h3>
            <p className="text-gray-600">TIKTOK DANCE CHAMPION</p>
          </div>

          <div className="flex flex-col items-center">
            <img 
              src={Julian_headshot.src}
              alt="Team Member 2" 
              className="w-48 h-48 rounded-full object-cover shadow-lg shadow-amber-300"
            />
            <h3 className="mt-4 font-semibold text-lg">Julian Chavez</h3>
            <p className="text-gray-600">FRONTEND DEVELOPER</p>
          </div>

          <div className="flex flex-col items-center">
            <img 
              src={Jack_headshot.src}
              alt="Team Member 3"
              className="w-48 h-48 rounded-full object-cover shadow-lg shadow-amber-300"
            />
            <h3 className="mt-4 font-semibold text-lg">Jack Winkler</h3>
            <p className="text-gray-600">BACKEND DEVELOPER</p>
          </div>
        </div>
          
      </div>
    </div>
  );
}
 
import React from "react";
import blood_logo from "../../public/blood_logo.png";
import Link from "next/link";
import Bell_headshot from "../../public/Bell_headshot.jpeg";
import Julian_headshot from "../../public/Julian_headshot.jpg";
<<<<<<< HEAD
import Jack_headshot from "../../public/JackNew.png";
=======
import Jack_headshot from "../../public/Jack_headshot.png";
>>>>>>> main

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-black overflow-hidden font-mono">
      {/* Updated Background Image */}
      <div className="absolute inset-0 bg-black before:content-[''] before:absolute before:inset-0 before:bg-[url('/Friday.jpg')] before:bg-cover before:bg-center before:opacity-70">
      </div>

      <div id="header" className="relative rounded-box p-4 bg-opacity-90 bg-gray-400 z-10">
        <div id="Logo">
          <img src={blood_logo.src} alt="Blood Logo" width={100} height={100} />
        </div>
        <div id="subsection">
          <nav className="flex gap-6">
            <a href="#main-section" className="px-4 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600">Home</a>
            <a href="#about-section" className="px-4 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600">About</a>
            <a href="#about-us-section" className="px-4 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600">About Us</a>
          </nav>
        </div>
        <div id="login">
          <div className="flex gap-4">
            <Link href="/signup" className="px-6 py-3 rounded-full bg-green-600 text-white font-bold shadow-lg hover:bg-green-500">
              Sign Up
            </Link>
            <Link href="/login" className="px-6 py-3 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-600">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div id="main-section" className="relative text-center mt-14 z-10">
        <h1 className="text-2xl font-bold">Welcome to BloodLens!<br/><br/></h1>
        <div className="bg-gray-400 p-1 max-w-lg mx-auto rounded-xl shadow-md mt-14 z-8">
        <p className="text-lg">Your AI-powered blood analysis tool. Login and upload your blood test results to generate a report and summary.</p>
        <p className="text-lg">Our cutting-edge AI technology provides insights into your health by analyzing your blood test results.<br/>Our goal is to make blood test data more accessible and understandable for everyone.</p>
        <p className="text-lg">Learn more about your health with BloodLens!</p>
        </div>
      </div>

      <div id="about-us-section" className="relative mt-24 z-10">
        <h1 className="text-center text-2xl font-bold">About Us</h1>
        <div className="flex justify-center gap-8 mt-8">
          {[{img: Bell_headshot, name: "Bella Goltser", role: "BACKEND DEVELOPER"},
            {img: Julian_headshot, name: "Julian Chavez", role: "TIKTOK WATCHER"},
            {img: Jack_headshot, name: "Jack Winkler", role: "DATABASE MANAGER"}].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={member.img.src} 
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover shadow-lg shadow-gray-700"
              />
              <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-700">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

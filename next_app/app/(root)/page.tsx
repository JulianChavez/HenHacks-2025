import React from "react";
import blood_logo from "../../public/logo_NEW_.png";
import Link from "next/link";
import Bell_headshot from "../../public/Bell_headshot.jpeg";
import Julian_headshot from "../../public/Julian_headshot.jpg";
import Jack_headshot from "../../public/Jack_headshot.png";
import henHacksPic from "../../public/henHacksPic.jpg";


export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-black overflow-hidden font-mono">
      {/* Updated Background Image */}
      <div className="absolute inset-0 bg-black before:content-[''] before:absolute before:inset-0 before:bg-[url('/vertical-gradient-2.png')] before:bg-cover before:bg-center before:opacity-100">
      </div>

      <div id="header" className="relative rounded-box p-4 bg-opacity-90 bg-gray-400 z-10">
        <div id="Logo">
          <img src={blood_logo.src} alt="Blood Logo" width={100} height={100} />
        </div>
        <div id="subsection">
          <nav className="flex gap-6">
            <a href="#main-section" className="px-5 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600 transition-transform transform hover:scale-110 hover:shadow-xl">Home</a>
            <a href="#about-section" className="px-5 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600 transition-transform transform hover:scale-110 hover:shadow-xl">Overview</a>
            <a href="#about-us-section" className="px-5 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600 transition-transform transform hover:scale-110 hover:shadow-xl">About Us</a>
            <a href="#future-plans-section" className="px-5 py-2 rounded-full bg-gray-700 text-white font-bold shadow-md hover:bg-gray-600 transition-transform transform hover:scale-110 hover:shadow-xl">Future Plans</a>
          </nav>
        </div>
        <div id="login">
          <div className="flex gap-4">
            <Link href="/signup" className="px-6 py-3 rounded-full bg-green-600 text-white font-bold shadow-lg hover:bg-green-500 transition-transform transform hover:scale-110 hover:shadow-xl">
              Sign Up
            </Link>
            <Link href="/login" className="px-6 py-3 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-110 hover:shadow-xl">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div id="main-section" className="relative text-center mt-14 z-10">
        <h1 className="text-6xl font-bold mb-3">Welcome to BloodQwuirk!<br/></h1>
        <h3 className="text-2xl font-bold">Understanding your blood work, made simple</h3>
        <div className="bg-gray-400 p-1 max-w-3xl mx-auto rounded-xl shadow-md mt-20 z-8">
          <p className="text-lg">Your AI-powered blood analysis tool. Easily upload your blood test results and receive a detailed report with clear, AI-driven insights.</p>
          <p className="text-lg">Our advanced AI technology breaks down complex medical data, helping you understand key health indicators and what they mean for your well-being. Whether you're tracking changes over time or simply curious about your results, we make bloodwork more accessible and easier to interpret.</p>
          <p className="text-lg">Take control of your health with BloodQwuirk—because understanding your body shouldn't be complicated!</p>
        </div>
      </div>

      <div id="about-us-section" className="relative mt-27 z-10">
        <h1 className="text-center text-3xl font-bold">About Us</h1>
        <div className="flex justify-center gap-8 mt-8">
          {[{img: Bell_headshot, name: "Bella Goltser", role: "BACKEND DEVELOPER"},
            {img: Julian_headshot, name: "Julian Chavez", role: "FRONTEND DEVELOPER"},
            {img: Jack_headshot, name: "Jack Winkler", role: "DATABASE MANAGER"}].map((member, index) => (
              <div key={index} className="flex flex-col items-center group">  {/* Added group here */}
                <img 
                  src={member.img.src} 
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover shadow-lg shadow-gray-700 transition-transform transform group-hover:scale-110 group-hover:shadow-xl"
                />
                <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
                <p className="text-white">{member.role}</p>
              </div>
          ))}
        </div>

        <div id="future-plans-section" className="relative text-center mt-27 z-10">
        <h3 className="text-2xl font-bold">Future Plans</h3>
        <div className="bg-gray-400 p-1 max-w-3xl mx-auto rounded-xl shadow-md mt-14 z-8">
          <p className="text-lg">The future of the Bloodwork AI website includes exciting advancements aimed at enhancing user experience and security.</p>
          <p className="text-lg"> We would develop a mobile app, allowing users to access their reports and insights seamlessly on the go. </p>
          <p className="text-lg">Additionally, the platform will expand its capabilities by integrating more personalized health insights, enabling users to gain deeper understanding and recommendations based on their bloodwork.</p>
        </div>
      </div>

        <div className="flex justify-center mt-16">
          <img 
            src={henHacksPic.src} 
            alt="New Image"
            className="w-120 h-auto shadow-lg shadow-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

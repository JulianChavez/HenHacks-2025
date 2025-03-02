'use client';

import React from "react";
import blood_logo from "../../public/logo_NEW_.png";
import Link from "next/link";
import Bell_headshot from "../../public/Bell_headshot.jpeg";
import Julian_headshot from "../../public/Julian_headshot.jpg";
import Jack_headshot from "../../public/Jack_headshot.png";
import henHacksPic from "../../public/henHacksPic.jpg";
import ClientWrapper from "../components/ClientWrapper";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-black overflow-hidden font-mono">
      {/* Blood Cells Background */}
      <ClientWrapper />

      <div id="header" className="relative rounded-box p-4 bg-opacity-90 bg-gray-200 z-10">
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
        <h1 className="text-6xl font-bold mb-3 font-extrabold" style={{ color: "maroon" }}>Welcome to BloodQwuirk!<br/></h1>
        <h3 className="text-2xl font-bold mb-6">Understanding your blood work, made simple</h3>
        <div className="bg-gray-200 p-6 max-w-4xl mx-auto rounded-xl shadow-md mt-16 z-8">
          <p className="text-xl font-georgia mb-4">Your AI-powered blood analysis tool designed with you in mind. Simply upload your blood test results and receive a comprehensive report with clear, AI-driven insights that help you understand what your numbers really mean.</p>
          
          <p className="text-xl font-georgia mb-4">Our advanced AI technology breaks down complex medical data, helping you understand key health indicators and what they mean for your well-being. Whether you're tracking changes over time, managing a chronic condition, or simply curious about your results, we make bloodwork more accessible and easier to interpret.</p>
          
          <p className="text-xl font-georgia mb-4">BloodQwuirk's intelligent system identifies patterns and potential concerns in your bloodwork that might otherwise go unnoticed, providing you with a deeper understanding of your health status and trends over time.</p>
          
          <p className="text-xl font-georgia">Take control of your health journey with BloodQwuirk—because understanding your body shouldn't require a medical degree. Start making informed decisions about your health today!</p>
        </div>
      </div>

      <div id="about-us-section" className="relative mt-27 z-10">
        <h1 className="text-center text-4xl font-bold mb-6">About Us</h1>
        <div className="bg-gray-200 p-6 max-w-4xl mx-auto rounded-xl shadow-md mb-12 z-8">
          <p className="text-xl font-georgia mb-4">At BloodQwuirk, we're a team of passionate healthcare technology enthusiasts dedicated to making medical information more accessible and understandable for everyone.</p>
          <p className="text-xl font-georgia mb-4">Our mission is to bridge the gap between complex medical data and everyday understanding, empowering you to take control of your health journey with confidence and clarity.</p>
          <p className="text-xl font-georgia">We believe that everyone deserves to understand their health data without needing a medical degree, and we're committed to making that possible through innovative AI technology and user-friendly design.</p>
        </div>
        
        <div className="flex justify-center gap-8 mt-8">
          {[{img: Bell_headshot, name: "Bella Goltser", role: "BACKEND DEVELOPER", linkedin: "https://www.linkedin.com/in/isabella-goltser-bb1b21284/"},
            {img: Julian_headshot, name: "Julian Chavez", role: "FRONTEND DEVELOPER", linkedin: "https://www.linkedin.com/in/julian-chavez-b82a13254/"},
            {img: Jack_headshot, name: "Jack Winkler", role: "DATABASE MANAGER", linkedin: "https://www.linkedin.com/in/jack-winkler1/"}].map((member, index) => (
              <div key={index} className="flex flex-col items-center group">
                <img 
                  src={member.img.src} 
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover shadow-lg shadow-gray-700 transition-transform transform group-hover:scale-110 group-hover:shadow-xl"
                />
                <h3 className="mt-4 font-semibold text-xl font-georgia">{member.name}</h3>
                <p className="text-white text-lg font-georgia">{member.role}</p>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-full flex items-center hover:bg-blue-700 transition-transform transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" className="mr-1">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
          ))}
        </div>

        <div id="future-plans-section" className="relative text-center mt-27 z-10">
        <h3 className="text-4xl font-bold mb-6 mt-16">Future Plans</h3>
        <div className="bg-gray-200 p-6 max-w-4xl mx-auto rounded-xl shadow-md mt-14 z-8">
          <p className="text-xl font-georgia mb-4">The future of BloodQwuirk includes exciting advancements aimed at enhancing user experience and security while expanding our capabilities to serve you better.</p>
          <p className="text-xl font-georgia mb-4">We're developing a comprehensive mobile app, allowing you to access your reports and insights seamlessly on the go. This will include features like report history tracking, trend analysis, and personalized health notifications.</p>
          <p className="text-xl font-georgia mb-4">Our AI technology will continue to evolve, offering more detailed and personalized health insights based on your unique bloodwork patterns and medical history. We're working with healthcare professionals to ensure our analysis remains accurate and helpful.</p>
          <p className="text-xl font-georgia">Additionally, we plan to introduce community features where users can connect with others who have similar health profiles, creating a supportive environment for sharing experiences and knowledge under the guidance of healthcare professionals.</p>
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

      {/* Footer Section */}
      <footer className="relative mt-20 pb-8 z-10 text-center">
        <div className="bg-gray-800 p-6 max-w-full mx-auto rounded-t-lg shadow-md">
          <div className="flex flex-col items-center justify-center">
            <p className="text-white font-georgia text-lg mb-4">© 2025 BloodQwuirk. All rights reserved.</p>
            
            <div className="flex items-center">
              <a 
                href="https://github.com/JulianChavez/HenHacks-2025" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-white hover:text-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="mr-2">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Visit our GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

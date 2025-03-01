import React from "react";
import "./login.css";  // Import CSS file directly
import Link from "next/link";

export default function Login() {
    return (
        <div className="login-page-container">
            <div id="Login-section" className="Login-section">
                <h1>Login Page</h1>
                
                {/* Login form would go here */}
                <div className="w-full max-w-xs mt-4">
                    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Link href="/report_analysis" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</Link>
                        </div>
                    </form>
                </div>
                
                <div className="mt-4">
                    <Link href="/">
                        <button className="px-4 py-2 rounded-md bg-gray-500 text-white">Back to Home</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


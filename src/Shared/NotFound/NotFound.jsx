import React from "react";
import { Link } from "react-router-dom";
import notFound from '../../assets/notfound1.png';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-4">
      <img src={notFound} alt="Not Found" className="w-96 mb-6" />
      <h1 className="text-4xl  font-bold mb-2">404</h1>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-[#EF9B28] text-white rounded  transition"
      >
        go to Dashboard
      </Link>
    </div>
  );
}

"use client";

import React from "react";

export default function BloodLoader() {
  const bloodTypes = ["A+", "B+", "O−"];

  return (
    <div className="flex space-x-3 justify-center items-center bg-white h-screen">
      <span className="sr-only">Loading...</span>

      {bloodTypes.map((type, index) => (
        <div
          key={type}
          className={`relative h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm animate-bounce`}
          style={{
            animationDelay: `${index * 0.15}s`,
            clipPath:
              "polygon(50% 0%, 90% 30%, 100% 70%, 50% 100%, 0% 70%, 10% 30%)", // drop shape
          }}
        >
          {type}
        </div>
      ))}
    </div>
  );
}

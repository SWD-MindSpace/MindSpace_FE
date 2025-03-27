"use client";

import React from "react";

export default function FeaturesGrid() {
  const features = [
    {
      title: "HD Video Quality",
      description: "High-definition video for clear communication",
      icon: "📹",
    },

    {
      title: "Secure Rooms",
      description: "Private rooms with unique IDs for secure communication",
      icon: "🔒",
    },

    {
      title: "Easy to Use",
      description: "Simple interface for easy navigation",
      icon: "👩‍💻",
    },
  ];

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-xl font-medium text-black mb-6">Features</h1>
      <div className="row flex flex-row">
        {features.map((feature, index) => (
          <div key={index} className="col-span-1">
            <div className="bg-white p-6 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-medium text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

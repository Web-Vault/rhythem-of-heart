import React from "react";

const ArtistProfile = () => (
  <div className="p-8 max-w-xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Artist Profile</h2>
    <div className="bg-white rounded shadow p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
        <div>
          <div className="font-semibold text-gray-700">Artist Name</div>
          <div className="text-sm text-gray-500">artist@email.com</div>
        </div>
      </div>
      <div className="mb-2"><span className="font-medium">Art Type:</span> Singer</div>
      <div className="mb-2"><span className="font-medium">Bio:</span> This is a sample artist bio.</div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-purple-600 text-white rounded mr-2">My Posts</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">Edit Profile</button>
      </div>
    </div>
  </div>
);

export default ArtistProfile; 
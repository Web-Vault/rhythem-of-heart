import React from "react";

const ArtistPosts = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">My Posts</h2>
    <div className="space-y-4">
      {[1, 2].map((n) => (
        <div key={n} className="bg-white rounded shadow p-6">
          <div className="font-semibold text-purple-700 mb-2">My Post {n}</div>
          <div className="text-gray-700">This is a placeholder for your post content.</div>
        </div>
      ))}
    </div>
  </div>
);

export default ArtistPosts; 
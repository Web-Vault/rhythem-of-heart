import React from "react";

const OtherArtistList = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Other Artists</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="bg-white rounded shadow p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
          <div className="font-semibold text-gray-700">Artist {n}</div>
          <div className="text-sm text-gray-500">Art Type</div>
        </div>
      ))}
    </div>
  </div>
);

export default OtherArtistList; 
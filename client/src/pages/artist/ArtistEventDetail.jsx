import React from "react";

const soldTickets = [
  { id: 1, user: "User A" },
  { id: 2, user: "User B" },
];

const ArtistEventDetail = () => (
  <div className="p-8 max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Event Details</h2>
    <div className="bg-white rounded shadow p-6 mb-4">
      <div className="font-semibold text-purple-700 mb-2">Event Title</div>
      <div className="text-gray-700 mb-2">Event description and details go here.</div>
      <div className="text-sm text-gray-500">Venue: Sample Venue</div>
      <div className="text-sm text-gray-500">Date: 2024-06-10</div>
    </div>
    <div className="bg-white rounded shadow p-6">
      <h3 className="font-bold mb-2">Sold Tickets</h3>
      <ul className="list-disc pl-5 text-gray-700">
        {soldTickets.map(ticket => (
          <li key={ticket.id}>Ticket #{ticket.id} - {ticket.user}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ArtistEventDetail; 
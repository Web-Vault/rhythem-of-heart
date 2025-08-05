import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RefundPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-12">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-red-600">
          Refund & Event Policy
        </h1>
        <p className="text-gray-600 text-center">
          Please read our policies and event rules carefully before registering.
        </p>

        {/* Refund Policy Section */}
        <section id="refund-policy" className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Refund Policy</h2>
          <p className="text-gray-600">
            All registrations and ticket purchases for our events are
            <strong> non-refundable and non-transferable</strong>.
            Once a ticket is purchased, it cannot be canceled or refunded under
            any circumstances, including no-shows, late arrivals, or event
            removal due to misconduct.
          </p>
          <p className="text-gray-600">
            By registering for our event, you acknowledge and agree to our
            <strong> No-Refund & No-Cancellation Policy.</strong>
          </p>
        </section>

        {/* Event Rules Section */}
        <section id="event-rules" className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Event Registration & Participation Rules
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Registration:</strong> Mandatory for both participants (₹150) and audience (₹100).</li>
            <li><strong>Non-Refundable:</strong> Registration is non-refundable and non-transferable.</li>
            <li><strong>Original Shayari Only:</strong> Participants must perform only their own, original work. Copied or published work leads to disqualification.</li>
            <li><strong>Time Limit:</strong> 5 minutes per participant. Exceeding the limit may result in disqualification.</li>
            <li><strong>Dress Code:</strong> Avoid white clothing. Dress modestly and appropriately.</li>
            <li><strong>Language & Respect:</strong> No abusive, offensive, or disrespectful language. Avoid religion, caste, politics, or personal attacks.</li>
            <li><strong>Mobile Usage:</strong> Keep phones on silent during the event.</li>
            <li><strong>Video & Content Policy:</strong> 
              <ul className="list-disc list-inside ml-6">
                <li>No full video recording by attendees.</li>
                <li>Short snaps or few-second clips allowed for memories only.</li>
                <li>Only organizers can upload official stories or content.</li>
                <li>Event recordings may be uploaded online for promotional purposes.</li>
              </ul>
            </li>
            <li><strong>Exit Policy:</strong> No one can leave the venue before the event concludes.</li>
            <li><strong>Behaviour:</strong> 
              Attendees must behave respectfully. Misbehavior or disruption will lead to removal
              <strong> without any refund.</strong>
            </li>
          </ul>
        </section>
        
      </div>
    </div>
  );
};

export default RefundPolicy;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChair,
  FaArrowRight,
} from "react-icons/fa";

const AppEvents = () => {
  return (
    <>
      {/* UPCOMING EVENTS SECTION */}
      <section className="events-tile-section">
        <div className="events-tile-header flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-4 md:px-12 gap-4 md:gap-0">
          <div className="flex flex-col items-start">
            <h2 className="events-tile-title events-tile-title-enhanced">
              Upcoming Events
            </h2>
            <div className="events-tile-title-underline events-tile-title-underline-animated"></div>
            <div className="events-tile-subheading">
              Don't miss the next poetry gatherings in Rajkot. Reserve your seat
              now!
            </div>
          </div>
        </div>
        <div className="events-tile-header-divider"></div>
        <div className="events-tile-carousel-wrap relative">
          <div className="events-tile-fade-left"></div>
          <div className="events-tile-fade-right"></div>
          <div className="events-tile-carousel flex gap-10 overflow-x-auto pb-2 snap-x justify-center mx-auto max-w-6xl px-4 md:px-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="event-tile-item group relative min-w-[340px] md:min-w-[400px] max-w-[90vw] snap-start"
              >
                <div className="event-tile-img-wrap relative">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                    alt="Event"
                    className="event-tile-img event-tile-img-taller"
                  />
                  <div className="event-tile-img-fade-short"></div>
                  <div className="event-tile-date-badge">
                    <FaCalendarAlt className="mr-1" /> 12 July 2024, 7:00 PM
                  </div>
                  <div className="event-tile-img-title">Poetry Night {i}</div>
                </div>
                <div className="event-tile-content event-tile-content-gradient rounded-b-[16px] px-7 pt-4 pb-6 flex flex-col gap-3 relative border border-[#e0e7ff]">
                  <p className="event-tile-desc mb-2">
                    A magical evening of poetry and music. Join us for an
                    unforgettable experience with renowned poets and artists
                    from Rajkot and beyond.
                  </p>
                  <div className="event-tile-meta flex items-center gap-6 text-xs text-gray-500 mt-1 mb-2">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt /> Rajkot Auditorium
                    </span>
                    <span className="flex items-center gap-1">
                      <FaChair /> 42 / 100 seats
                    </span>
                  </div>
                  <div className="event-tile-progress-wrap mt-2 mb-3">
                    <div className="event-tile-progress-bg">
                      <div
                        className="event-tile-progress-fill"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                    <span className="event-tile-progress-label">
                      42% booked
                    </span>
                  </div>
                  <Link
                    to={`/events/1`}
                    className="event-tile-details-btn-wrap mt-2"
                  >
                    <button className="event-tile-details-btn w-full flex items-center justify-center gap-2">
                      More Details <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
/* --- Copy styles from AppHome.vue for events section --- */
.events-tile-section {
  width: 100%;
  position: relative;
  background: #f8fafc;
  padding: 0;
  padding-top: 4.5rem;
  padding-bottom: 4.5rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
}
.events-tile-header {
  margin: 0 auto 1.5rem auto;
}
.events-tile-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #232046;
  letter-spacing: -0.01em;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}
.events-tile-title-underline {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
  border-radius: 2px;
  margin-bottom: 1.2rem;
  margin-top: 0.1rem;
  box-shadow: 0 2px 12px #6366f144;
  border: 1.5px solid rgba(255,255,255,0.35);
}
.events-tile-title-underline-animated {
  transform: scaleX(0);
  transform-origin: left;
  animation: eventsTileUnderlineGrow 1.1s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
}
@keyframes eventsTileUnderlineGrow {
  0% {
    transform: scaleX(0);
    opacity: 0.2;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
.events-tile-subheading {
  color: #6366f1;
  font-size: 1.13rem;
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  max-width: 340px;
  text-align: left;
  letter-spacing: 0.01em;
}
.events-tile-header-divider {
  max-width: 1600px;
  margin: 0 auto 2.5rem auto;
  height: 1.5px;
  background: linear-gradient(90deg, #e0e7ff 0%, #6366f1 50%, #e0e7ff 100%);
  opacity: 0.18;
  border-radius: 1px;
}
.events-tile-carousel-wrap {
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
}
.events-tile-fade-left, .events-tile-fade-right {
  position: absolute;
  top: 0; bottom: 0;
  width: 60px;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.2s;
}
.events-tile-fade-left {
  left: 0;
  background: linear-gradient(90deg, #f8fafc 80%, transparent 100%);
}
.events-tile-fade-right {
  right: 0;
  background: linear-gradient(270deg, #f8fafc 80%, transparent 100%);
}
.events-tile-carousel {
  max-width: 100%;
  margin: 0 auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
}
.event-tile-item {
  flex: 0 0 auto;
  width: 100%;
  max-width: 400px;
  min-width: 340px;
  position: relative;
  border-radius: 16px;
  background: transparent;
  box-shadow: none;
  border: 1.5px solid #e0e7ff;
  transition: box-shadow 0.22s, border-color 0.18s;
  margin-bottom: 1.5rem;
  overflow: hidden;
}
.event-tile-item:hover, .event-tile-item:focus-within {
  box-shadow: 0 8px 32px #6366f144, 0 1.5px 0 #e0e7ff inset;
  border-color: #6366f1;
}
.event-tile-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  min-height: 220px;
  max-height: 280px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  background: #e0e7ff;
  z-index: 1;
}
.event-tile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: none;
}
.event-tile-img-taller {
  min-height: 300px;
  max-height: 340px;
}
.event-tile-img-fade-short {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 45%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(30,27,75,0.7) 100%);
  z-index: 3;
  pointer-events: none;
}
.event-tile-img-title {
  position: absolute;
  left: 1.3rem;
  bottom: 1.1rem;
  z-index: 4;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 800;
  text-shadow: 0 2px 12px #23204699, 0 1.5px 0 #23204644;
  letter-spacing: -0.01em;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}
.event-tile-date-badge {
        display: flex; 
        align-items:center;
        gap: 10px;
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(255,255,255,0.82);
        color: #3730a3;
        font-size: 0.98rem;
        font-weight: 600;
        padding: 0.28rem 1rem;
        border-radius: 0.9rem;
        box-shadow: 0 2px 8px #6366f122;
        z-index: 2;
         pointer-events: none;
         border: 1.2px solid #e0e7ff;
}
.event-tile-content-gradient {
  background: linear-gradient(120deg, #fff 80%, #f1f5ff 100%);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: none;
  padding-bottom: 1.5rem;
  position: relative;
}
.event-tile-desc {
  font-size: 1.01rem;
  color: #6366f1;
  font-weight: 400;
  margin-bottom: 0.1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
}
.event-tile-meta {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  color: #6366f1;
  gap: 1.8rem;
}
.event-tile-meta i {
  color: #a5b4fc;
  font-size: 1.1em;
}
.event-tile-progress-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.2rem;
}
.event-tile-progress-bg {
  width: 60%;
  height: 6px;
  background: #e0e7ff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1.5px 6px #23204611;
}
.event-tile-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
  border-radius: 6px;
  transition: width 0.7s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 1.5px 6px #6366f144;
}
.event-tile-progress-label {
  font-size: 0.97rem;
  color: #6366f1;
  font-weight: 600;
  min-width: 60px;
}
.event-tile-details-btn-wrap {
  width: 100%;
  margin-top: 0.5rem;
}
.event-tile-details-btn {
  background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 1.5rem;
  padding: 0.95rem 0;
  font-size: 1.08rem;
  border: none;
  outline: none;
  box-shadow: 0 2px 8px #23204611;
  transition: background 0.18s, color 0.18s, transform 0.13s, box-shadow 0.18s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.event-tile-details-btn i {
  font-size: 1.1em;
  margin-left: 0.2em;
  transition: transform 0.18s;
}
.event-tile-details-btn:hover, .event-tile-details-btn:focus {
  color: #e0e7ff;
  box-shadow: 0 4px 16px #6366f133;
}
.event-tile-details-btn:hover i {
  transform: translateX(4px);
}
      `}</style>
    </>
  );
};

export default AppEvents;

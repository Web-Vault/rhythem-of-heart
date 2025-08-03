import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaUsers, FaMicrophone, FaClock, FaEdit, FaTrash, FaQrcode, FaCreditCard } from "react-icons/fa";
import { getEventById } from "../../services/eventService";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../context/AuthContext";

const TicketRegistration = () => {
  const { type, id } = useParams(); // 'audience' or 'performer', event id
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user data from AuthContext

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.message || "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);
  
  // Audience form state
  const [audienceForm, setAudienceForm] = useState({
    userName: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobileNumber || '',
    numberOfPeople: 1,
    peopleNames: [user?.name || '']
  });

  // Performer form state
  const [performerForm, setPerformerForm] = useState({
    userName: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobileNumber || '',
    artType: '',
    duration: ''
  });

  // UI state
  const [showQR, setShowQR] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [editingSeats, setEditingSeats] = useState(false);



  // Audience form handlers
  const handleAudienceInputChange = (field, value) => {
    setAudienceForm(prev => {
      const updatedForm = {
        ...prev,
        [field]: value
      };
      
      // If userName is being updated, also update the first person's name
      if (field === 'userName' && prev.peopleNames.length > 0) {
        const newPeopleNames = [...prev.peopleNames];
        newPeopleNames[0] = value; // Update first person's name
        updatedForm.peopleNames = newPeopleNames;
      }
      
      return updatedForm;
    });
  };

  const handleNumberOfPeopleChange = (value) => {
    const num = parseInt(value) || 1;
    const newPeopleNames = Array(num).fill('').map((_, index) => {
      if (index === 0) {
        // First person should be the main user's name
        return audienceForm.userName || '';
      }
      return audienceForm.peopleNames[index] || '';
    });
    
    setAudienceForm(prev => ({
      ...prev,
      numberOfPeople: num,
      peopleNames: newPeopleNames
    }));
  };

  const handlePersonNameChange = (index, value) => {
    const newPeopleNames = [...audienceForm.peopleNames];
    newPeopleNames[index] = value;
    setAudienceForm(prev => ({
      ...prev,
      peopleNames: newPeopleNames
    }));
  };

  const removePerson = (index) => {
    if (audienceForm.numberOfPeople > 1) {
      const newPeopleNames = audienceForm.peopleNames.filter((_, i) => i !== index);
      setAudienceForm(prev => ({
        ...prev,
        numberOfPeople: prev.numberOfPeople - 1,
        peopleNames: newPeopleNames
      }));
    }
  };

  // Performer form handlers
  const handlePerformerInputChange = (field, value) => {
    setPerformerForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate totals and available seats
  const audienceTotal = audienceForm.numberOfPeople * (event?.price || 0);
  const performerTotal = event?.price || 0; // Performer pays same as audience
  const availableSeats = event ? event.totalSeats - event.bookedSeats : 0;

  // Form validation
  const isAudienceFormValid = () => {
    return audienceForm.userName && 
           audienceForm.email && 
           audienceForm.mobile && 
           audienceForm.peopleNames.every(name => name.trim());
  };

  const isPerformerFormValid = () => {
    return performerForm.userName && 
           performerForm.email && 
           performerForm.mobile && 
           performerForm.artType && 
           performerForm.duration;
  };

  // Action handlers
  const handleConfirmSeats = () => {
    if (type === 'audience' && isAudienceFormValid()) {
      setIsConfirmed(true);
    } else if (type === 'performer' && isPerformerFormValid()) {
      setIsConfirmed(true);
    }
  };

  const handlePay = async () => {
    try {
      const bookingData = {
        event: id,
        username: type === "audience" ? audienceForm.userName : performerForm.userName,
        email: type === "audience" ? audienceForm.email : performerForm.email,
        mobileNumber: type === "audience" ? audienceForm.mobile : performerForm.mobile,
        numberOfSeats: type === "audience" ? audienceForm.numberOfPeople : 1,
        membersName: type === "audience" ? audienceForm.peopleNames : [],
        isPerformer: type === "performer",
        artType: type === "performer" ? performerForm.artType : undefined,
        duration: type === "performer" ? performerForm.duration : undefined
      };
      await createBooking(bookingData);
      navigate("/my-profile");
    } catch (err) {
      alert(err.message || "Booking failed");
    }
  };

  const handleEditSeats = () => {
    setEditingSeats(true);
    setIsConfirmed(false);
  };

  const handleEditDetails = () => {
    setIsConfirmed(false);
  };

  const handleBackToEvent = () => {
    navigate(-1);
  };

  // Loading and error handling for fetched event
  if (loading) {
    return <div className="text-center py-20">Loading event...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }
  if (!event) {
    return <div className="text-center py-20">Event not found</div>;
  }


  return (
    <div className="ticket-registration-container">
      {/* Header */}
      <div className="registration-header">
        <button onClick={handleBackToEvent} className="back-btn">
          ← Back to Event
        </button>
        <h1 className="registration-title">
          {type === 'audience' ? 'Audience Registration' : 'Performer Registration'}
        </h1>
        <div className="event-info">
          <h2>{event.name}</h2>
          <p>₹{event.price} per seat</p>
        </div>
      </div>

      <div className="registration-content">
        {type === 'audience' ? (
          // AUDIENCE FORM
          <div className="registration-form">
            {!isConfirmed ? (
              <>
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label><FaUser /> User Name</label>
                      <input
                        type="text"
                        value={audienceForm.userName}
                        onChange={(e) => handleAudienceInputChange('userName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label><FaEnvelope /> Email</label>
                      <input
                        type="email"
                        value={audienceForm.email}
                        onChange={(e) => handleAudienceInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label><FaPhone /> Mobile Number</label>
                    <input
                      type="tel"
                      value={audienceForm.mobile}
                      onChange={(e) => handleAudienceInputChange('mobile', e.target.value)}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Seat Details</h3>
                  <div className="form-group">
                    <label><FaUsers /> Number of People</label>
                    <input
                      type="number"
                      min="1"
                      max={availableSeats}
                      value={audienceForm.numberOfPeople}
                      onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                    />
                    <small>Available seats: {availableSeats}</small>
                  </div>

                                     <div className="people-names">
                     <h4>Names of People Attending</h4>
                     {audienceForm.peopleNames.map((name, index) => (
                       <div key={index} className="person-name-row">
                         <input
                           type="text"
                           value={name}
                           onChange={(e) => handlePersonNameChange(index, e.target.value)}
                           placeholder={index === 0 ? "Your name (auto-filled)" : `Person ${index + 1} name`}
                           disabled={index === 0}
                           className={index === 0 ? "attendees-input disabled-input" : ""}
                         />
                         {audienceForm.numberOfPeople > 1 && index > 0 && (
                           <button 
                             type="button" 
                             className="remove-person-btn"
                             onClick={() => removePerson(index)}
                           >
                             <FaTrash />
                           </button>
                         )}
                       </div>
                     ))}
                   </div>
                </div>

                <button 
                  className="confirm-btn"
                  onClick={handleConfirmSeats}
                  disabled={!isAudienceFormValid()}
                >
                  Confirm Seats
                </button>
              </>
            ) : (
              // CONFIRMATION VIEW
              <div className="confirmation-view">
                <div className="confirmation-header">
                  <h3>Seat Confirmation</h3>
                  <button onClick={handleEditSeats} className="edit-btn">
                    <FaEdit /> Edit Seats
                  </button>
                </div>

                <div className="booking-summary">
                  <div className="summary-item">
                    <span>Total Seats:</span>
                    <span>{audienceForm.numberOfPeople}</span>
                  </div>
                  <div className="summary-item">
                    <span>Price per Seat:</span>
                    <span>₹{event.price}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Amount:</span>
                    <span>₹{audienceTotal}</span>
                  </div>
                </div>

                <div className="people-list">
                  <h4>Attendees</h4>
                  {audienceForm.peopleNames.map((name, index) => (
                    <div key={index} className="person-item">
                      <span>Seat {index + 1}: {name}</span>
                    </div>
                  ))}
                </div>

                {!showQR ? (
                  <button className="pay-btn" onClick={handlePay}>
                    <FaCreditCard /> Pay ₹{audienceTotal}
                  </button>
                ) : (
                  <div className="qr-section">
                    <h3>Scan QR Code to Pay</h3>
                    <div className="qr-code">
                      <FaQrcode />
                      <p>QR Code Placeholder</p>
                    </div>
                    <p className="qr-note">Scan this QR code with your payment app to complete the transaction</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // PERFORMER FORM
          <div className="registration-form">
            {!isConfirmed ? (
              <>
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label><FaUser /> User Name</label>
                      <input
                        type="text"
                        value={performerForm.userName}
                        onChange={(e) => handlePerformerInputChange('userName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label><FaEnvelope /> Email</label>
                      <input
                        type="email"
                        value={performerForm.email}
                        onChange={(e) => handlePerformerInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label><FaPhone /> Mobile Number</label>
                    <input
                      type="tel"
                      value={performerForm.mobile}
                      onChange={(e) => handlePerformerInputChange('mobile', e.target.value)}
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Performance Details</h3>
                  <div className="form-group">
                    <label><FaMicrophone /> Type of Art</label>
                    <select
                      value={performerForm.artType}
                      onChange={(e) => handlePerformerInputChange('artType', e.target.value)}
                    >
                      <option value="">Select art type</option>
                      <option value="poetry">Poetry</option>
                      <option value="music">Music</option>
                      <option value="dance">Dance</option>
                      <option value="comedy">Comedy</option>
                      <option value="storytelling">Storytelling</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label><FaClock /> Duration (Approximate)</label>
                    <input
                      type="text"
                      value={performerForm.duration}
                      onChange={(e) => handlePerformerInputChange('duration', e.target.value)}
                      placeholder="e.g., 10 minutes, 15-20 minutes"
                    />
                  </div>
                </div>

                <button 
                  className="confirm-btn"
                  onClick={handleConfirmSeats}
                  disabled={!isPerformerFormValid()}
                >
                  Confirm Registration
                </button>
              </>
            ) : (
              // CONFIRMATION VIEW
              <div className="confirmation-view">
                <div className="confirmation-header">
                  <h3>Registration Confirmation</h3>
                  <button onClick={handleEditDetails} className="edit-btn">
                    <FaEdit /> Edit Details
                  </button>
                </div>

                <div className="booking-summary">
                  <div className="summary-item">
                    <span>Registration Type:</span>
                    <span>Performer</span>
                  </div>
                  <div className="summary-item">
                    <span>Art Type:</span>
                    <span>{performerForm.artType}</span>
                  </div>
                  <div className="summary-item">
                    <span>Duration:</span>
                    <span>{performerForm.duration}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Registration Fee:</span>
                    <span>₹{performerTotal}</span>
                  </div>
                </div>

                {!showQR ? (
                  <button className="pay-btn" onClick={handlePay}>
                    <FaCreditCard /> Pay ₹{performerTotal}
                  </button>
                ) : (
                  <div className="qr-section">
                    <h3>Scan QR Code to Pay</h3>
                    <div className="qr-code">
                      <FaQrcode />
                      <p>QR Code Placeholder</p>
                    </div>
                    <p className="qr-note">Scan this QR code with your payment app to complete the transaction</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .ticket-registration-container {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          padding: 2rem 0;
        }

        .registration-header {
          max-width: 800px;
          margin: 0 auto 3rem auto;
          padding: 0 2rem;
          text-align: center;
        }

        .back-btn {
          background: transparent;
          color: #6366f1;
          border: 2px solid #6366f1;
          border-radius: 2rem;
          padding: 0.8rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 2rem;
        }

        .back-btn:hover {
          background: #6366f1;
          color: #fff;
        }

        .registration-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #232046;
          margin-bottom: 1rem;
        }

        .event-info {
          background: #fff;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 16px #6366f122;
          border: 1px solid #e0e7ff;
        }

        .event-info h2 {
          color: #232046;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .event-info p {
          color: #6366f1;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .registration-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .registration-form {
          background: #fff;
          border-radius: 2rem;
          padding: 3rem;
          box-shadow: 0 8px 32px #6366f122;
          border: 1px solid #e0e7ff;
        }

        .form-section {
          margin-bottom: 2.5rem;
        }

        .form-section h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #232046;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #232046;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .attendees-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e0e7ff;
          border-radius: 1rem;
          font-size: 1rem;
          transition: border-color 0.2s;
        }


         .form-group input:focus,
         .form-group select:focus
         .attendees-input:focus {
           outline: none;
           border-color: #6366f1;
         }

         .disabled-input {
           background-color: #f8fafc;
           color: #6b7280;
           cursor: not-allowed;
         }

        .form-group small {
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 0.3rem;
          display: block;
        }

        .people-names h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #232046;
          margin-bottom: 1rem;
        }

        .person-name-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          align-items: center;
        }

        .person-name-row input {
          flex: 1;
        }

        .remove-person-btn {
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.8rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .remove-person-btn:hover {
          background: #dc2626;
        }

                 .confirm-btn {
           background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
           color: #fff;
           font-weight: 700;
           border: none;
           border-radius: 2rem;
           padding: 1.2rem 2.5rem;
           font-size: 1.1rem;
           cursor: pointer;
           transition: all 0.2s;
           width: 100%;
           margin-top: 1rem;
         }

         .pay-btn {
           background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
           color: #fff;
           font-weight: 700;
           border: none;
           border-radius: 2rem;
           padding: 1.2rem 2.5rem;
           font-size: 1.1rem;
           cursor: pointer;
           transition: all 0.2s;
           width: 100%;
           margin-top: 2rem;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 0.8rem;
         }

        .confirm-btn:hover,
        .pay-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px #6366f144;
        }

        .confirm-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .confirmation-view {
          background: #f8fafc;
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid #e0e7ff;
        }

        .confirmation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .confirmation-header h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #232046;
        }

        .edit-btn {
          background: transparent;
          color: #6366f1;
          border: 2px solid #6366f1;
          border-radius: 1rem;
          padding: 0.8rem 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .edit-btn:hover {
          background: #6366f1;
          color: #fff;
        }

        .booking-summary {
          background: #fff;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid #e0e7ff;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 0;
          border-bottom: 1px solid #f1f5ff;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item.total {
          font-weight: 800;
          font-size: 1.2rem;
          color: #232046;
          border-top: 2px solid #e0e7ff;
          margin-top: 0.5rem;
          padding-top: 1rem;
        }

        .people-list {
          background: #fff;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid #e0e7ff;
        }

        .people-list h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #232046;
          margin-bottom: 1rem;
        }

        .person-item {
          padding: 0.8rem;
          background: #f8fafc;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .qr-section {
          text-align: center;
          background: #fff;
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid #e0e7ff;
        }

        .qr-section h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #232046;
          margin-bottom: 1.5rem;
        }

        .qr-code {
          background: #f8fafc;
          border-radius: 1rem;
          padding: 3rem;
          margin: 1.5rem 0;
          border: 2px dashed #e0e7ff;
        }

        .qr-code svg {
          font-size: 8rem;
          color: #6366f1;
          margin-bottom: 1rem;
        }

        .qr-code p {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .qr-note {
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .registration-form {
            padding: 2rem 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .confirmation-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .registration-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TicketRegistration;
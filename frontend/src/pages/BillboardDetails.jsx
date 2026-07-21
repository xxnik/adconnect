import "../styles/BillboardDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function BillboardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBillboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBillboard = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get(`/billboard/details/${id}`);
      if (response.data.success) {
        
        setBoard(response.data.billboard);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="billboard-details">
        <div className="details-container">
          <div className="details-skeleton-image" />
          <div className="details-skeleton-body">
            <div className="skeleton-line skeleton-title" />
            <div className="skeleton-line skeleton-short" />
            <div className="skeleton-line skeleton-medium" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="billboard-details">
        <div className="details-error">
          <h2>Billboard not found</h2>
          <p>This listing may have been removed or the link is incorrect.</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  const isAvailable = board.isActive === true || board.isActive === "Available";

  return (
    <div className="billboard-details">
      <div className="details-container">
        {/* Back link */}
        <button className="back-link" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Image */}
        <div className="details-image">
          {board.imageUrl ? (
            <img
              src={`http://localhost:3000${board.imageUrl}`}
              alt={board.title}
            />
          ) : (
            <span>No Image</span>
          )}
          <span
            className={`status-pill ${isAvailable ? "is-available" : "is-booked"}`}
          >
            {board.status || (isAvailable ? "Available" : "Booked")}
          </span>
        </div>

        {/* Body */}
        <div className="details-body">
          <div className="details-main">
            <div className="details-top">
              <h1>{board.title}</h1>
              <p className="details-city">📍 {board.city}</p>
            </div>

            {board.description && (
              <div className="details-section">
                <h3>About this space</h3>
                <p>{board.description}</p>
              </div>
            )}

            <div className="details-section">
              <h3>Specifications</h3>
              <div className="spec-grid">
                {board.dimensions && (
                  <div className="spec-item">
                    <span className="spec-label">Dimensions</span>
                    <span className="spec-value">{board.dimensions}</span>
                  </div>
                )}
                {board.type && (
                  <div className="spec-item">
                    <span className="spec-label">Type</span>
                    <span className="spec-value">{board.type}</span>
                  </div>
                )}
                {board.address && (
                  <div className="spec-item">
                    <span className="spec-label">Address</span>
                    <span className="spec-value">{board.address}</span>
                  </div>
                )}
                {board.city && (
                  <div className="spec-item">
                    <span className="spec-label">City</span>
                    <span className="spec-value">{board.city}</span>
                  </div>
                )}
              </div>
            </div>

            {board.owner && (
              <div className="details-section">
                <h3>Listed by</h3>
                <p className="owner-name">
                  {board.owner.name || board.owner.email || "Verified Owner"}
                </p>
              </div>
            )}
          </div>

          {/* Booking sidebar */}
          <aside className="booking-card">
            <p className="booking-price">
              ₹{board.pricePerDay}
              <span>/day</span>
            </p>

            <button
              className="booking-btn"
              disabled={!board.isActive}
              onClick={() => navigate(`/book/${board.id || id}`)}
            >
              {board.isActive ? "Book This Billboard" : "Currently Unavailable"}
            </button>

            <p className="booking-note">
              You won't be charged yet. Confirm details on the next step.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
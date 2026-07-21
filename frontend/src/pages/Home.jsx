import "../styles/Home.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const SKYLINE_HEIGHTS = [
  38, 62, 44, 80, 30, 56, 70, 42, 90, 34, 58, 48, 74, 40,
];

export default function Home() {
  const navigate = useNavigate();

  const [billboards, setBillboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBillboards();
  }, []);

  const fetchBillboards = async () => {
    try {
      const response = await api.get("/billboard");
      console.log(response);
      if (response.data.success) {
        setBillboards(response.data.billboards);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBillboards = useMemo(() => {
    if (!query.trim()) return billboards;
    const q = query.trim().toLowerCase();
    return billboards.filter((b) => b.city?.toLowerCase().includes(q));
  }, [billboards, query]);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-sky">
          <div className="skyline" aria-hidden="true">
            {SKYLINE_HEIGHTS.map((h, i) => (
              <span key={i} style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>

        <div className="billboard-sign">
          <div className="sign-frame">
            <span className="sign-eyebrow">
              AdConnect · Outdoor Advertising
            </span>
            <h1>Find the Perfect Billboard for Your Advertisement</h1>
            <p>
              Connect with verified billboard owners and book advertising space
              anywhere in India.
            </p>

            <form
              className="search-console"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Search by city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="sign-posts" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
      </section>

      {/* Featured Billboards */}
      <section className="featured">
        <div className="section-heading">
          <h2>Featured Billboards</h2>
          <p>Handpicked, verified spaces ready to book today.</p>
        </div>

        {loading ? (
          <div className="billboard-grid">
            {[1, 2, 3].map((n) => (
              <div className="card card-skeleton" key={n} />
            ))}
          </div>
        ) : filteredBillboards.length === 0 ? (
          <div className="empty-state">
            <p>No billboards match “{query}”.</p>
            <button onClick={() => setQuery("")}>Clear search</button>
          </div>
        ) : (
          <div className="billboard-grid">
            {filteredBillboards.map((board) => {
              const isAvailable =
                board.isActive === true || board.isActive === "Available";

              return (
                <div className="card" key={board.id}>
                  <div className="card-image">
                    {board.imageUrl ? (
                      <img
                        src={`http://localhost:3000${board.imageUrl}`}
                        alt={board.title}
                        className="billboard-image"
                      />
                    ) : (
                      <span>No Image</span>
                    )}

                    {isAvailable && (
                      <span className="status-pill is-available">
                        Available
                      </span>
                    )}
                  </div>

                  <div className="card-body">
                    <div className="card-top">
                      <h3>{board.title}</h3>
                    </div>

                    <p className="card-city">📍 {board.city}</p>

                    <p className="card-price">
                      ₹{board.pricePerDay}
                      <span>/day</span>
                    </p>

                    <div className="card-buttons">
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/billboard/${board.id}`)}
                      >
                        View Details
                      </button>

                      <button
                        className="book-btn"
                        disabled={!board.isActive}
                        onClick={() => navigate(`/book/${board.id}`)}
                      >
                        {board.isActive ? "Book" : "Inactive"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-heading">
          <h2>Why Choose Us?</h2>
        </div>

        <div className="feature-container">
          <div className="feature-card">
            <span className="feature-icon">📍</span>
            <h3>Verified Owners</h3>
            <p>Trusted billboard owners across India.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Easy Booking</h3>
            <p>Book your billboard in just a few clicks.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Best Pricing</h3>
            <p>Transparent pricing with no hidden charges.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Own a Billboard?</h2>
        <p>List your billboard and start earning from advertisers.</p>
        <button onClick={() => navigate("/createBillboard")}>
          Post Your Billboard
        </button>
      </section>

      <footer>© 2026 AdConnect | All Rights Reserved</footer>
    </div>
  );
}
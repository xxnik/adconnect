import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const billboards = [
    {
      id: 1,
      title: "Patna Junction Billboard",
      city: "Patna",
      price: "₹5,000/day",
      status: "Available",
    },
    {
      id: 2,
      title: "Airport Road Billboard",
      city: "Delhi",
      price: "₹8,000/day",
      status: "Booked",
    },
    {
      id: 3,
      title: "Marine Drive Billboard",
      city: "Mumbai",
      price: "₹12,000/day",
      status: "Available",
    },
  ];

  return (
    <div className="home">
      {/* Navbar */}
      
      

      {/* Hero */}
      <section className="hero">
        <h1>Find the Perfect Billboard for Your Advertisement</h1>

        <p>
          Connect with verified billboard owners and book advertising space
          anywhere in India.
        </p>

        <div className="search-box">
          <input type="text" placeholder="Search by city..." />

          <button>Search</button>
        </div>
      </section>

      {/* Featured Billboards */}
      <section className="featured">
        <h2>Featured Billboards</h2>

        <div className="billboard-grid">
          {billboards.map((board) => (
            <div className="card" key={board.id}>
              <div className="image-placeholder">Billboard Image</div>

              <h3>{board.title}</h3>

              <p>{board.city}</p>

              <p className="price">{board.price}</p>

              <span
                className={
                  board.status === "Available" ? "available" : "booked"
                }
              >
                {board.status}
              </span>

              <button className="view-btn" disabled={board.status === "Booked"}>
                {board.status === "Booked" ? "Booked" : "View Details"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>📍 Verified Owners</h3>
            <p>Trusted billboard owners across India.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Easy Booking</h3>
            <p>Book your billboard in just a few clicks.</p>
          </div>

          <div className="feature-card">
            <h3>💰 Best Pricing</h3>
            <p>Transparent pricing with no hidden charges.</p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="cta">
        <h2>Own a Billboard?</h2>

        <p>List your billboard and start earning from advertisers.</p>

        <button>Post Your Billboard</button>
      </section>

      {/* Footer */}

      <footer>© 2026 AdsPlatform | All Rights Reserved</footer>
    </div>
  );
}

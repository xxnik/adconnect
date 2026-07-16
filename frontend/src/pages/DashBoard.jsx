import {useState,React,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashBoard.css";
import { Link } from "react-router-dom";
import api from "../api/api";

function DashBoard() {
  const navigate = useNavigate();
  const [billboards, setBillboards] = useState([]);
  const fetchBillboards = async () => {
    try {
      const response = await api.get("/billboard/getMyBillboard");

      setBillboards(response.data.billboards);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBillboards();
  }, []);


  return (
    <div className="host-dashboard">
      <div className="dashboard-header">
        <h1>My Billboards</h1>

        <button className="add-btn" onClick={() => navigate("/AddListing")}>
          + Add Listing
        </button>
      </div>

      <div className="listing-grid">
        {billboards.map((billboard) => (
          <div className="listing-card" key={billboard.id}>
            <div className="listing-image">Image Coming Soon</div>

            <div className="listing-content">
              <h2>{billboard.title}</h2>

              <p>{billboard.location}</p>

              <h3>₹{billboard.pricePerDay}/day</h3>

              <div className="card-actions">
                <button className="edit-btn">Edit</button>

                <button className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashBoard;

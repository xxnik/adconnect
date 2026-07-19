import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashBoard.css";
import api from "../api/api";
import { toast } from "react-toastify";

function DashBoard() {
  const navigate = useNavigate();
  const [billboards, setBillboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBillboards = async () => {
    try {
      const response = await api.get("/billboard/getMyBillboard");
      setBillboards(response.data.billboards);
      console.log(billboards);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load your billboards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillboards();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this billboard? This can't be undone.",
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const response = await api.delete(`/billboard/deleteBillboard/${id}`);

      if (response.data.success) {
        setBillboards((prev) => prev.filter((b) => b.id !== id));
        toast.success("Billboard deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="host-dashboard">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">AdConnect · Host Panel</span>
          <h1>My Billboards</h1>
          <p className="dashboard-subtext">
            {loading
              ? "Loading your listings..."
              : `${billboards.length} listing${
                  billboards.length === 1 ? "" : "s"
                } live on AdConnect`}
          </p>
        </div>

        <button
          className="add-btn"
          onClick={() => navigate("/CreateBillboard")}
        >
          + Add Listing
        </button>
      </div>

      {loading ? (
        <div className="listing-grid">
          {[1, 2, 3].map((n) => (
            <div className="listing-card listing-skeleton" key={n} />
          ))}
        </div>
      ) : billboards.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🖼️</span>
          <h3>No billboards yet</h3>
          <p>List your first space and start earning from advertisers.</p>
          <button
            className="add-btn"
            onClick={() => navigate("/CreateBillboard")}
          >
            + Add Listing
          </button>
        </div>
      ) : (
        <div className="listing-grid">
          {billboards.map((billboards) => (
            <div className="listing-card" key={billboards.id}>
              <div className="listing-image">
                {billboards.imageUrl ? (
                  <img
                    src={`http://localhost:3000${billboards.imageUrl}`}
                    alt={billboards.title}
                    className="billboard-image"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              <div className="listing-content">
                <h2>{billboards.title}</h2>
                <p className="listing-location">📍 {billboards.location}</p>
                <h3 className="listing-price">
                  ₹{billboards.pricePerDay}
                  <span>/day</span>
                </h3>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/editBillboard/${billboards.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    disabled={deletingId === billboards.id}
                    onClick={() => handleDelete(billboards.id)}
                  >
                    {deletingId === billboards.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashBoard;

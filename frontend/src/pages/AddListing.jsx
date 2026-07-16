import "../styles/AddListing.css";
import {useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


function AddListing() {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    title: "",
    location: "",
    city: "",
    width: "",
    height: "",
    pricePerDay: "",
    description: "",
  });

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    });
  }

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await api.post("/billboard/createBillboard",formData);
      console.log(response.data);
      if(response.data.success){
        navigate("/DashBoard");
        toast.success("Billboard Created successfully");
      }
      console.log(response);
    }catch(error){
      toast.error(error.response?.data?.message || "Login Failed");
    }
  }

  


  return (
    <div className="add-listing-container">
      <div className="add-listing-card">
        <h1>Add New Billboard</h1>

        <form className="listing-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Billboard Title</label>
            <input
              type="text"
              name="title"
              placeholder="Patna Bypass Billboard"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Near Bypass Chowk"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Patna"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Width (ft)</label>
              <input
                type="number"
                name="width"
                placeholder="20"
                value={formData.width}
              onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Height (ft)</label>
              <input
                type="number"
                name="height"
                placeholder="10"
                value={formData.height}
              onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Price Per Day (₹)</label>
            <input
              type="number"
              name="pricePerDay"
              placeholder="1500"
              value={formData.pricePerDay}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              name="description"
              placeholder="Describe your billboard location and visibility..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button className="submit-btn" type="submit">
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
import "../styles/CreateBillboard.css";
import { useState } from "react";

function BillboardForm({
  formData,
  setFormData,
  image,
  setImage,
  onSubmit,
  buttonText,
  isSubmitting = false,
  heading,
}) {
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-listing-page">
      <div className="add-listing-sky" aria-hidden="true" />

      <div className="add-listing-container">
        <div className="add-listing-card">
          <span className="form-eyebrow">AdConnect · Host Panel</span>
          <h1>{heading || buttonText}</h1>
          <p className="form-subtext">
            Give advertisers the details they need to book with confidence.
          </p>

          <form className="listing-form" onSubmit={onSubmit}>
            <div className="form-section">
              <h4>Basics</h4>

              <div className="form-group">
                <label htmlFor="title">Billboard Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Patna Bypass Billboard"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Patna"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Near Bypass Chowk"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Dimensions</h4>

              <div className="row">
                <div className="form-group">
                  <label htmlFor="width">Width (ft)</label>
                  <input
                    id="width"
                    type="number"
                    min="0"
                    name="width"
                    placeholder="20"
                    value={formData.width}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="height">Height (ft)</label>
                  <input
                    id="height"
                    type="number"
                    min="0"
                    name="height"
                    placeholder="10"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Pricing & Description</h4>

              <div className="form-group">
                <label htmlFor="pricePerDay">Price Per Day</label>
                <div className="prefixed-input">
                  <span>₹</span>
                  <input
                    id="pricePerDay"
                    type="number"
                    min="0"
                    name="pricePerDay"
                    placeholder="1500"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="5"
                  name="description"
                  placeholder="Visibility, footfall, nearby landmarks, illumination — anything that helps an advertiser decide."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BillboardForm;

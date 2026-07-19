import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import BillboardForm from "../components/BillboardForm";

function CreateBillboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    city: "",
    width: "",
    height: "",
    pricePerDay: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("city", formData.city);
      data.append("width", formData.width);
      data.append("height", formData.height);
      data.append("pricePerDay", formData.pricePerDay);
      data.append("description", formData.description);

      if (image) {
        data.append("image", image);
      }

      const response = await api.post("/billboard/createBillboard", data);
      console.log(response.data);

      if (response.data.success) {
        toast.success("Billboard Created Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Creation Failed");
    }
  };

  return (
    <BillboardForm
      formData={formData}
      setFormData={setFormData}
      image={image}
      setImage={setImage}
      onSubmit={handleSubmit}
      buttonText="Create Billboard"
    />
  );
}

export default CreateBillboard;

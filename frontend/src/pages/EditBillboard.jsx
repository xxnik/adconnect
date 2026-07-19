import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import BillboardForm from "../components/BillboardForm";

function EditBillboard() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchBillboard();
  }, []);

  const fetchBillboard = async () => {
    try {
      const response = await api.get(`/billboard/${id}`);
      setFormData(response.data.billboard);
    } catch (error) {
      toast.error("Unable to fetch billboard");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/billboard/${id}`,
        formData
      );
      
      if (response.data.success) {
        toast.success("Billboard Updated Successfully");
        navigate("/Dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  return (
    <BillboardForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleUpdate}
      buttonText="Update Billboard"
    />
  );
}

export default EditBillboard;
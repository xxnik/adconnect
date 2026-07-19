import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../Layout/Layout"
import DashBoard from "../pages/DashBoard"
import CreateBillboard  from "../pages/CreateBillboard"

import EditBillboard  from "../pages/EditBillboard"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >  
                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Dashboard" element={<DashBoard />} />
                    <Route path="/CreateBillboard" element={<CreateBillboard/>} />
                    <Route path="/editBillboard/:id" element={<EditBillboard/>} />
                    {/* <Route path="/updateBillboard/:id" element={<UpdateBillboard/>} /> */}

                </Route>
            </Routes>
        </BrowserRouter>
    );
}
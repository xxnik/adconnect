import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../Layout/Layout"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >  
                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
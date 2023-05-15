import React from "react";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./component/Layout/Layout";
import Login from "./pages/Login/Login";
import Service from "./pages/Service/Service";

import { useAppDispatch } from "./redux/hooks";
import axios from "axios";
import { setUser } from "./redux/userSlice";

import PATHS from "./data/paths";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./util/ScrollToTop";

import './App.css';
import Profile from "./pages/Profile/Profile";

export default function App() {

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        var email = localStorage.getItem("email")
        if (email !== null) axios.get(`/api/account/getnickname/${email}`).then(({ data }) => dispatch(setUser({ nickname: data })))
    }, [])


    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path={PATHS.MAIN} element={<Layout />}>
                        <Route path="" element={<Main />} />
                        <Route path={PATHS.PROFILE} element={<Profile />} />
                        <Route path={PATHS.LOGIN} element={<Login />} />
                        <Route path={PATHS.SERVICES} element={<Service />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}


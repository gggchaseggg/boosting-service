import React from "react";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./component/Layout/Layout";
import Login from "./pages/Login/Login";
import Service from "./pages/Service/Service";

import axios from "axios";

import PATHS from "./data/paths";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScrollToTop from "./util/ScrollToTop";

import './App.css';
import Profile from "./pages/Profile/Profile";
import {userStore} from "./mobx";

export default function App() {


    React.useEffect(() => {
        axios.get('/api/account/getUserInfo')
            .then(({data}) => {
                userStore.setAll(data.nickname, data.email, data.role, data.phone, data.avatar)
            })
            .catch(() => userStore.clear())

    }, [userStore])


    return (
        <>
            <Router>
                <ScrollToTop/>
                <Routes>
                    <Route path={PATHS.MAIN} element={<Layout/>}>
                        <Route path="" element={<Main/>}/>
                        <Route path={PATHS.PROFILE} element={<Profile/>}/>
                        <Route path={PATHS.LOGIN} element={<Login/>}/>
                        <Route path={PATHS.SERVICES} element={<Service/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}


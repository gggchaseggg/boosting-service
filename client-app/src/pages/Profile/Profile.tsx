import React from "react";
import style from "./Profile.module.scss";
import UserProfile from "./UserProfile/UserProfile";
import AdminProfile from "./AdminProfile/AdminProfile";
import BoosterProfile from "./BoosterProfile/BoosterProfile";
import { useNavigate } from "react-router-dom";
import {userStore} from "../../mobx";
import {observer} from "mobx-react-lite";
import axios from "axios";

const Profile = () => {

    const navigate = useNavigate();

    return (
        <div className={style.wrapper}>
            <button className={style.exitButton} onClick={
                () => {
                    axios.get("/api/account/logout")
                    userStore.clear()
                    navigate("/");
                }
            }>Выйти
            </button>
            {(userStore.role === "admin")
                ? <AdminProfile/>
                : !(userStore.role === "booster")
                    ? <UserProfile />
                    : <BoosterProfile />
            }
        </div>
    )
}
export default observer(Profile);
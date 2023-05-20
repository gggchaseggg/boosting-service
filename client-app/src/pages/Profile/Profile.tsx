import axios from "axios";
import React from "react";
import style from "./Profile.module.scss";
import UserProfile from "./UserProfile/UserProfile";
import AdminProfile from "./AdminProfile/AdminProfile";
import BoosterProfile from "./BoosterProfile/BoosterProfile";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { dropUser } from "../../redux/userSlice";

type UserProfileTypes = {
    id: number;
    nickname: string;
    email: string;
    phone: string;
    password: null;
    role: string;
}


const Profile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [user, setUser] = React.useState<UserProfileTypes>();

    React.useEffect(() => 
    { axios.get(`api/account/getUserInfo`).then(({data})=>setUser(data))}, [])

    return (
        <div className={style.wrapper}>
            <button className={style.exitButton} onClick={
                () => {
                    dispatch(dropUser())
                    localStorage.clear();
                    navigate("/");
                }
            }>Выйти
            </button>
            {(user?.role === "admin")
                ? <AdminProfile/>
                : !(user?.role === "booster")
                    ? <UserProfile />
                    : <BoosterProfile />
            }
        </div>
    );
}
export default Profile;
import React from 'react';
import style from "./HeaderLogin.module.scss";
import PATHS from "../../../../data/paths";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from '../../../../redux/hooks';

type UserProfileTypes = {
    id: number;
    nickname: string;
    email: string;
    phone: string;
    password: null;
    role: string;
}

const HeaderLogin = () => {

    const user = useAppSelector(state => state.user)

    return (
        <>
            {user.nickname ?
                <Link to={PATHS.PROFILE} className={style.colorLink}>
                    <div>
                    <span>{
                            user.nickname
                        }</span>
                    </div>
                </Link>
                :
                <Link to={PATHS.LOGIN} className={style.colorLink}>
                    <div>
                    <span>Войти</span>
                    </div>
                </Link>
            }


        </>
    );
};

export default HeaderLogin;

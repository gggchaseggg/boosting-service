import React, { useEffect, useState } from "react";
import style from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../../data/paths";
import logo from "./logo.png";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";

export default function Header(){
   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isServiceVisible, setIsServiceVisible] = useState(true);

    const user = useAppSelector(state => state.user)

    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    useEffect(() => {
        let email = localStorage.getItem("email")
        if (email !== null) axios.get(`/api/account/getUserInfo`).then((r) => {
            if (r.data.role === "booster") setIsServiceVisible(false)
            else setIsServiceVisible(true)
        })
        else setIsServiceVisible(true)
    }, [user])

    return (
        <div className={style.wrapper}>
            <nav className={style.navigation}>
                <ul className={style.navList}>
                    <li className={style.navItem}>
                        <Link to={PATHS.MAIN}>
                            <img src={logo} className={style.navItem} />
                        </Link>
                    </li>
                    {isServiceVisible &&
                        <li className={style.navItem}>
                            <NavLink to={PATHS.SERVICES} className={style.colorLink}>Услуги</NavLink>
                        </li>
                    }

                    <li className={style.navItem}>
                        <NavLink to={PATHS.WARRANTY} className={style.colorLink}>Гарантии</NavLink>
                    </li>
                    <li className={style.navItem}>
                        <NavLink to={PATHS.MONITORING} className={style.colorLink}>Мониторинг</NavLink>
                    </li>
                    <li className={style.navItem}>
                        <NavLink to={PATHS.COMMAND} className={style.colorLink}>Наша команда</NavLink>
                    </li>
                    <li className={style.navItem}>
                        <NavLink to={PATHS.WORK} className={style.colorLink}>Работа</NavLink>
                    </li>
                    <div>
                        <div>
                            <HeaderLogin />
                            {/*<navlink to={paths.login} classname={style.colorlink}>войти</navlink>*/}
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
     );
};
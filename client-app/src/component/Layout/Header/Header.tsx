import React from "react";
import style from "./Header.module.scss";
import {Link, NavLink} from "react-router-dom";
import PATHS from "../../../data/paths";
import logo from "./logo.png";
import HeaderLogin from "./HeaderLogin/HeaderLogin";
import {userStore} from "../../../mobx";
import {observer} from "mobx-react-lite";


const Header = () => {
    return (
        <div className={style.wrapper}>
            <nav className={style.navigation}>
                <ul className={style.navList}>
                    <li className={style.navItem}>
                        <Link to={PATHS.MAIN}>
                            <img alt="лого" src={logo} className={style.navItem}/>
                        </Link>
                    </li>
                    {(userStore.role !== "booster") &&
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
                    <li className={style.navItem}>
                        <NavLink to={PATHS.REVIEW} className={style.colorLink}>Отзывы</NavLink>
                    </li>
                    <div>
                        <div>
                            <HeaderLogin/>
                            {/*<navlink to={paths.login} classname={style.colorlink}>войти</navlink>*/}
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default observer(Header);
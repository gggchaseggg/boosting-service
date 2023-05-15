import React from "react";
import style from "./Footer.module.scss";
import { info } from "../../../data/footerInfo";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../../data/paths";
import logo from "./logo.png";

const Footer = () => {
    return (
        <div className={style.wrapper}>
            <div>
                <div className={style.footer}>
                    <div className={style.information}>
                        <h4>Информация</h4>
                        <ul>
                            <li className={style.navItem}>
                                <NavLink to={PATHS.ABOUT} className={style.colorLink}>О нас</NavLink>
                            </li>
                            <li className={style.navItem}>
                                <NavLink to={PATHS.COMMAND} className={style.colorLink}>Команда</NavLink>
                            </li>
                            <li className={style.navItem}>
                                <NavLink to={PATHS.WORK} className={style.colorLink}>Работа</NavLink>
                            </li>
                            <li className={style.navItem}>
                                <NavLink to={PATHS.USER_AGREEMENT} className={style.colorLink}>Пользовательское соглашение</NavLink>
                            </li>
                            <li className={style.navItem}>
                                <NavLink to={PATHS.SUPPORT} className={style.colorLink}>Обратная связь</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={style.information}>
                        <a href="tel:+7-929-087-55-05" className={style.tel}>
                            +7-929-087-55-05
                        </a>
                        <a href="tel:+7-901-698-96-48" className={style.tel}>
                            +7-901-698-96-48
                        </a>
                        <a href="mailto:kborisova.priv@gmail.com" className={style.mail}>kborisova.priv@gmail.com</a>
                        <br></br>
                        <li className={style.icon}>
                            <Link to={PATHS.MAIN}>
                                <img src={logo}/>
                            </Link>
                        </li>
                    </div>
                </div>

                <div>
                </div>

                <div>
                    <p className={style.info}>Все названия продуктов, компаний, логотипы и товарные знаки являются собственностью корпораций
                        Valve и WarGaming, а также их лицензиаров. Данный сайт функционирует как торговая площадка и не является собственником
                        продаваемых товаров/услуг. Все права принадлежат их владельцам.</p>
                    <p className={style.info}>© BoostingService, 2022</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
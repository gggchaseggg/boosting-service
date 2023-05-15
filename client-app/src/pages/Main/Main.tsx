import React, { Component } from "react";
import style from "./Main.module.scss";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../data/paths";
import CarouselBox from "../../component/CarouselBox/CarouselBox";
import achiv1 from "./img/achiv2.png"
import achiv2 from "./img/achiv2.png"

export default class Main extends Component {
    render(){
        return (
            <div className={style.colorBack}>
                <CarouselBox />
                <div className={style.achivments}>
                    <div className={style.achiv_rect}>
                    </div>
                    <h1> Преимущества </h1>
                    <div className={style.achivments_elem}>
                        <div className={style.achivments_block}>
                            <img src="/img/protect.svg"/>
                            <p>Купить или продать - здесь безопасно!</p>
                        </div>
                        <div className={style.achivments_block}>
                            <img src="/img/stars.svg" />
                            <p>Осуществляем любые мечты</p>
                        </div>
                        <div className={style.achivments_block}>
                            <img src="/img/podium.svg" />
                            <p>Команда профессионалов!</p>
                        </div>
                        <div className={style.achivments_block}>
                            <img src="/img/cup.svg" />
                            <p >Многолетний стаж, тысячи клиентов!</p>
                        </div>
                    </div>
                </div>
                <div className={style.achivments2}>
                    <div className={style.achiv_rect2}>
                    </div>
                    <h1> Почему именно мы? </h1>
                    <div className={style.achivments_elem}>
                        <div className={style.achivments_block2}>
                            <p>На нашем сайте используется система безопасной сделки РОБОКАССА.
                                Это означает, что покупая у нас вы получаете гарантию выполнения
                                своего заказа. Подробнее читайте в разделе "Гарантии".</p>
                        </div>
                        <div className={style.achivments_block2}>
                            <p>Мы используем SSL шифрование данных, а так же пользуемся собственными
                                методами шифрования данных вашего аккаунта, так что злоумышленики никогда
                                не смогут получить доступ к ваши данным.</p>
                        </div>
                        <div className={style.achivments_block2}>
                            <p>Наша отзывчивая поддержка никогда не проигнорирует ваш вопрос.
                                Если у вас возникнут какие-либо вопросы по ходу выполнения вашего заказа,
                                вы можете смело написать нам, мы решим любой вопрос в кратчайшие сроки!</p>
                        </div>
                        <div className={style.achivments_block2}>
                            <p>Благодаря продвинутой системе смены бустеров, наши заказы выполняются очень быстро.
                                Даже в самые загруженные дни, старт работы над заказом составляет от 15 минут до 3 часов,
                                а объем выполняемой работы - от 150 ММР в день. </p>
                        </div>
                    </div>
                    <div className={style.centerButton}>
                    <div className={style.colorbutton}>
                        <NavLink to={PATHS.WARRANTY} className={style.colorLink} >Гарантии</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
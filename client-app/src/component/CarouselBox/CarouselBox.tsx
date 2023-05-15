import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import carousel1 from "./img/carousel_1.jpg";
import carousel2 from "./img/carousel_2.jpg";
import carousel3 from "./img/carousel_3.jpg";
import style from "./CarouselBox.module.scss"

function Carouselbox() {
    return (
            <Carousel fade >
                <Carousel.Item>
                    <img className="d-block w-100"
                        src={carousel1}
                        alt="Carousel1" />
                <Carousel.Caption>
                    <div className={ style.fortext }>
                    <h2>Калибровка аккаунта</h2>
                    <p>Калибровка и перекалибровка аккаунта. Средний винрейт ~92%. Быстро и безопасно.</p>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100"
                        src={carousel2}
                        alt="Carousel2" />
                    <Carousel.Caption>
                        <h2>Буст ММР</h2>
                    <p>Профессиональный бустинг рейтинга ММР в Доте 2.
                        Скорость и качество. </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100"
                    src={carousel3}
                        alt="carousel3" />
                    <Carousel.Caption>
                        <h2>Loy Priority?</h2>
                        <p>Нестрашно! Быстро и дешево отыграем нужное количество игр</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    )
    }
export default Carouselbox;
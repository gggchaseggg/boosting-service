import React, { useEffect, useState } from "react";
import style from "./Service.module.scss";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PATHS from "../../data/paths";
import axios from "axios";

type FormType = {
    email: string;
    service: string;
    startMMR: number | null;
    endMMR: number | null;
    countLP: number | null;
    cost: number;
}

function AuthButton() {
    return (
        <Link to={PATHS.LOGIN} className={style.submit}>Авторизоваться</Link>
    )
}



export default function Service() {

    const navigate = useNavigate();

    const [width, setWidth] = useState(300);
    const [mmrnow, setMmrnow] = useState(0);
    const [lastmmr, setLastmmr] = useState(1);
    const [lpcountgame, setLpcountgame] = useState(3);
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("email"))
    const [canOrder, setCanOrder] = useState(true);

    function sendOrder(order: FormType) {
        axios.post("/api/order/create", order)
          .then(r => {
              console.log(r)
              setCanOrder(false)
          })
          .catch(e => console.info(e))
    }

    const changeWidth = (event: any) => {
        setWidth(event.target.value);
    };

    const changeMMR = (event: any) => {
        setMmrnow(event.target.value);
    };

    const lastMMR = (event: any) => {
        setLastmmr(event.target.value);
    };

    const lp = (event: any) => {
        setLpcountgame(event.target.value);
    };

    useEffect(() => {
        let email = localStorage.getItem("email")
        if (email !== null) axios.get(`/api/order/isUserHasOrders?email=${email}`).then((r) => {
            if (r.data) setCanOrder(false)
            else if (!r.data) setCanOrder(true)
            else console.log(r)
        })
    }, [])

    const {
        register: boostRegister,
        handleSubmit: boostHandleSubmit,
        reset: boostReset,
        setError: boostSetError
    } = useForm<FormType>();

    const onBoostSubmit: SubmitHandler<FormType> = async (data) => {
        if (!canOrder) alert("У вас уже есть заказ, завершите его или отмените")
        else if (confirm("Вы действительно хотите оформить заказ?")) {
            const boostOrder: FormType = {
                cost: +width * 2.5 * 0.66,
                countLP: 0,
                email: localStorage.getItem("email") as string,
                endMMR: +mmrnow + +width,
                service: data.service,
                startMMR: +mmrnow
            }
            sendOrder(boostOrder)

        }

    }

    const {
        register: calibrationRegister,
        handleSubmit: calibrationHandleSubmit,
        reset: calibrationReset,
        setError: calibrationSetError
    } = useForm<FormType>();

    const onCalibrationSubmit: SubmitHandler<FormType> = async (data) => {
        if (!canOrder) alert("У вас уже есть заказ, завершите его или отмените")
        else if (confirm("Вы действительно хотите оформить заказ?")) {
            const calibrationOrder: FormType = {
                cost: 1088,
                countLP: 0,
                email: localStorage.getItem("email") as string,
                // @ts-ignore
                startMMR: +data.startMMR,
                // @ts-ignore
                endMMR: +data.startMMR + 400,
                service: data.service
            }
            sendOrder(calibrationOrder)
        }

    }

    const {
        register: lpRegister,
        handleSubmit: lpHandleSubmit,
        reset: lpReset,
        setError: lpSetError
    } = useForm<FormType>();

    const onLpSubmit: SubmitHandler<FormType> = async (data) => {
        if (!canOrder) alert("У вас уже есть заказ, завершите его или отмените")
        else if (confirm("Вы действительно хотите оформить заказ?")) {
            const lpOrder: FormType = {
                // @ts-ignore
                cost: +data.countLP * 50,
                // @ts-ignore
                countLP: +data.countLP,
                email: localStorage.getItem("email") as string,
                startMMR: 0,
                endMMR: 0,
                service: data.service
            }
            sendOrder(lpOrder)
        }

    }

    return (
        <div className={style.wrapper}>
            <div className={style.radioButtons}>
                <input type="radio" name="logReg" id={style.boost} defaultChecked={true} />
                <label htmlFor={style.boost}
                    id={style.boostLabel}
                >Буст
                </label>
                <input type="radio" name="logReg" id={style.calibration} />
                <label htmlFor={style.calibration}
                    id={style.calibrationLabel}
                >Калибровка
                </label>
                <input type="radio" name="logReg" id={style.lp} />
                <label htmlFor={style.lp}
                    id={style.lpLabel}
                >LP
                </label>
            </div>

            <div className={style.boostForm}>
                <form onSubmit={boostHandleSubmit(onBoostSubmit)}>
                    <input type="hidden" value="boost" {...boostRegister("service")} />
                    <div className={style.forDisplay}>
                        <div className={style.forDisplay1}>
                            <label htmlFor="mmrnow">Текущий ММР: </label>
                            <input
                                className={style.ininput}
                                type="text"
                                id="mmrnow"
                                placeholder={"0"}
                                autoComplete={"off"}
                                value={mmrnow}
                                {...boostRegister("startMMR", { onChange: changeMMR })}
                            />
                        </div>
                        <div className={style.forDisplay2}>
                            <input
                                type='range'
                                onChange={changeWidth}
                                min={300}
                                max={7000}
                                step={50}
                                value={width}
                            >
                            </input>
                            <h5>+{width}</h5>
                        </div>
                        <div className={style.forDisplay3}>
                            <label>Конечный ММР: </label>

                            <input
                                type="hidden"
                                id="endMMR"
                                value={// @ts-ignore
                                    Number.parseInt(width) + Number.parseInt(mmrnow)
                                }
                                {...boostRegister("endMMR")}
                            />
                            <h5>{// @ts-ignore
                                Number.parseInt(width) + Number.parseInt(mmrnow)
                            }</h5>
                        </div>
                    </div>
                    <div className={style.forDisplay4}>
                        <h5>{width * 2.5 * 0.66} руб.</h5>
                        <h6 className={style.discount}>{width * 2.5} руб.</h6>
                        <h5>{5 * (Math.trunc(width / 1000) + 1)}-{5 * (Math.trunc(width / 1000) + 1) + 3} дней </h5>
                    </div>
                    {isAuth
                        ? <button type="submit" className={style.submit}>Оформить заказ</button>
                        : <AuthButton />}
                </form>
            </div>

            <div className={style.calibrationForm}>
                <form onSubmit={calibrationHandleSubmit(onCalibrationSubmit)}>
                    <input type="hidden" value="calibration" {...calibrationRegister("service")} />
                    <div className={style.forDisplayCalibration}>
                        <div className={style.forDisplay1}>
                            <label htmlFor="lastmmr">Предыдущий ММР: </label>
                            <input
                                className={style.ininput}
                                type="text"
                                id="mmrnow"
                                placeholder={"0"}
                                autoComplete={"off"}
                                value={lastmmr}
                                {...calibrationRegister("startMMR", { onChange: lastMMR })}
                            />
                        </div>
                        <div className={style.forDisplay5}>
                            <label>Конечный ММР: </label>
                            <h5>{// @ts-ignore
                                Number.parseInt(lastmmr) + 400
                            }</h5>
                            <label> или больше:) </label>
                        </div>
                    </div>
                    <div className={style.forDisplay4}>
                        <h5>1088 руб.</h5>
                        <h6 className={style.discount}>1200 руб.</h6>
                        <h5>от 1 до 3 дней</h5>
                    </div>
                    {isAuth
                        ? <button type="submit" className={style.submit}>Оформить заказ</button>
                        : <AuthButton />}
                </form>
            </div>

            <div className={style.lpForm}>
                <form onSubmit={lpHandleSubmit(onLpSubmit)}>
                    <input type="hidden" value="lp" {...lpRegister("service")} />
                    <div className={style.forDisplayCalibration}>

                        <div className={style.forDisplayCountGames}>
                            <label>Количество игр:</label>
                            <input
                                type='range'
                                min={3}
                                max={5}
                                step={1}
                                value={lpcountgame}
                                {...lpRegister("countLP", { onChange: lp })}
                            >
                            </input>
                            <h5>{lpcountgame}</h5>
                        </div>
                    </div>
                    <div className={style.forDisplay4}>
                        <h5>{lpcountgame * 50} руб.</h5>
                        <h6 className={style.discount}>{lpcountgame * 60} руб.</h6>
                        <h5>от 1 до 2 дней</h5>
                    </div>
                    {isAuth
                        ? <button type="submit" className={style.submit}>Оформить заказ</button>
                        : <AuthButton />}
                </form>
            </div>
        </div>
    );
}
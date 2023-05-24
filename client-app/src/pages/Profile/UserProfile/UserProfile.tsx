import axios from "axios";
import React from "react";
import style from "./UserProfile.module.scss";
import {EditProfile} from "../components/EditProfile";
import {userStore} from "../../../mobx";

type UserProfileTypes = {
    nickname: string;
    email: string;
    phone: string;
    orders: OrderWaitingTypes[];
}

type OrderWaitingTypes = {
    id: number;
    startMMR: number | null;
    endMMR: number | null;
    countLP: number | null;
    cost: number;
    status: string;
}


const UserProfile = () => {

    const [user, setUser] = React.useState<UserProfileTypes>();
    const [newOrder, setNewOrder] = React.useState<OrderWaitingTypes>();
    const [canReloadOrder, setCanReloadOrder] = React.useState<boolean>(false)

    React.useEffect(() => {
        axios.get(`api/user/getUserInfo`).then(({ data }) => setUser(data))
        axios.get(`api/user/getNewOrderInfo`).then(({ data }) => setNewOrder(data))
    }, [canReloadOrder])

    return (
        <div>
            <div className={style.wrapper_row}>
                <div className={style.wrapper1_1}>
                    <div>
                        <img src={userStore.avatar === "" ? "/img/Profile/logo.jpg" : userStore.avatar} alt="лого" className={style.logo} />
                    </div>
                    <div className={style.infoUser}>
                        <h3>
                            {user?.nickname + "   "}
                            <EditProfile/>
                        </h3>
                        <h5>{user?.email}</h5>
                        <h5>{user?.phone}</h5>
                    </div>
                </div>
                <div className={style.wrapper1_2}>
                    <div>
                        <h4>Текущий заказ</h4>
                        <h5>Начальный ММР: {newOrder?.startMMR}</h5>
                        <h5>Конечный ММР: {newOrder?.endMMR}</h5>
                        <h5>Количество игр SD: {newOrder?.countLP}</h5>
                        <h5>Стоимость: {newOrder?.cost} руб.</h5>
                        <h5>{newOrder?.status}</h5>
                        
                    </div>
                    <div>
                        {
                            newOrder?.status == "Ожидает оплаты"
                                ? 
                                <div><button type="submit" className={style.submit} onClick={() => {
                                    axios.get(`/api/user/getStatusInProcess`).then(() => setCanReloadOrder(prevState => !prevState))
                                }}><span>Оплатить</span></button>
                                    <button type="submit" className={style.submit_cancel} onClick={() => {
                                        axios.get(`/api/user/getStatusDelete`).then(() => setCanReloadOrder(prevState => !prevState))
                                    }}><span>Отменить</span></button>
                                </div>
                                : newOrder?.status == "Ожидает подтверждения" 
                                    ? <button type="submit" className={style.submit_cancel} onClick={() => {
                                        axios.get(`/api/user/getStatusDelete`).then(() => setCanReloadOrder(prevState => !prevState))

                                    }}><span>Отменить</span></button>
                                    : <button type="submit" className={style.submit} ><span>Задать вопрос</span></button>
                        }
                    </div>
                </div>
            </div>
            <div className={style.wrapper}>
                <div className={style.achiv_rect}>
                </div>
                <h1> История заказов </h1>
                <div className={style.achiv_rect}>
                </div>
                {user?.orders?.length !== 0 ? <table className={style.table}>
                    <thead>
                        <tr>
                            <td>Начальный ММР</td>
                            <td>Конечный ММР</td>
                            <td>Количество игр SingleDraft</td>
                            <td>Стоимость</td>
                            <td>Статус</td>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.orders?.map((item, idx) => <tr key={idx + "userKey"} className={style.userItem}>
                            <td className={style.userItem__login}>{item.startMMR}</td>
                            <td className={style.userItem__login}>{item.endMMR}</td>
                            <td className={style.userItem__login}>{item.countLP}</td>
                            <td className={style.userItem__login}>{item.cost}</td>
                            <td className={style.userItem__login}>{item.status}</td>

                        </tr>)}
                    </tbody>
                </table> : <h2>Нет заказов</h2>}
            </div>
        </div>
    );
}
export default UserProfile;
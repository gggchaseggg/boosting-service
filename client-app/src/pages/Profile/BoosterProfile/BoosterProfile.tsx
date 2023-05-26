import axios from "axios";
import React from "react";
import style from "./BoosterProfile.module.scss";
import {userStore} from "../../../mobx";
import {EditProfile,OrdersTable} from "../components";

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

const BoosterProfile = () => {

    const [user, setUser] = React.useState<UserProfileTypes>();
    const [newOrder, setNewOrder] = React.useState<UserProfileTypes>();
    const [orderNow, setOrderNow] = React.useState<OrderWaitingTypes>();
    const [canReloadOrder, setCanReloadOrder] = React.useState<boolean>(false)


    React.useEffect(() => {
        axios.get(`api/booster/getBoosterInfo`).then(({data}) => setUser(data))
        axios.get(`api/booster/getNewBoosterInfo`).then(({data}) => setNewOrder(data))
        axios.get(`api/booster/check`).then(({data}) => setOrderNow(data))
    }, [userStore, canReloadOrder])

    console.log(newOrder)

    return (
        <div>
            <div className={style.wrapper_row}>
                <div className={style.wrapper1_1}>
                    <div>
                        <img src={userStore.avatar === "" ? "/img/Profile/logo.jpg" : userStore.avatar} alt="лого"
                             className={style.logo}/>
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
                    {!!orderNow
                        ? <div>
                            <h4>Текущий заказ</h4>
                            <h5>Начальный ММР: {orderNow?.startMMR}</h5>
                            <h5>Конечный ММР: {orderNow?.endMMR}</h5>
                            <h5>Количество игр SD: {orderNow?.countLP}</h5>
                            <h5>Стоимость: {orderNow?.cost} руб.</h5>
                            <h5>{orderNow?.status}</h5>
                        </div>
                        : <h4>Заказов нет</h4>
                    }
                    <div>
                        {
                            orderNow?.status == "Выполняется"
                            &&
                            <div>
                                <button type="submit" className={style.submit} onClick={() => {
                                    axios.get(`/api/booster/getStatusComplete`).then(() => setCanReloadOrder(prevState => !prevState))
                                }}><span>Выполнен</span></button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {!orderNow &&
                <div className={style.wrapper}>
                    <div className={style.achiv_rect}>
                    </div>
                    <h1>Новые заявки</h1>
                    <div className={style.achiv_rect}>
                    </div>

                    {
                        newOrder && newOrder.orders.length !== 0
                            // @ts-ignore
                            ? <OrdersTable data={newOrder.orders} isBooster canUpdate={setCanReloadOrder}/>
                            : <h2>Нет новых заказов</h2>

                    }
                </div>}
            <div className={style.wrapper}>
                <div className={style.achiv_rect}>
                </div>
                <h1>История заказов</h1>
                <div className={style.achiv_rect}>
                </div>
                {
                    user?.orders
                        // @ts-ignore
                        ? <OrdersTable data={user.orders}/>
                        : <h2>Нет заказов</h2>
                }
            </div>


        </div>
    );
}
export default BoosterProfile;

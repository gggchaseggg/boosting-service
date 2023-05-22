import React from 'react';
import style from "./HeaderLogin.module.scss";
import PATHS from "../../../../data/paths";
import { Link} from "react-router-dom";
import {userStore} from "../../../../mobx";
import {observer} from "mobx-react-lite";

const HeaderLogin = () => {

    return (
        <>
            {userStore.nickname ?
                <Link to={PATHS.PROFILE} className={style.colorLink}>
                    <div>
                    <span>{
                            userStore.nickname
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

export default observer(HeaderLogin);

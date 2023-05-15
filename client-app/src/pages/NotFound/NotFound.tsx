import React from "react";
import style from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <div className={style.tide}>
            <div>
                <p className={style.error}>404</p>
                <p className={style.maybe}>Возможно, эту страницу кто-то уволок...</p>
            </div>
            <div>
            <img src="/img/NotFound.png" />
            </div>

        </div>
    );
}
export default NotFound;
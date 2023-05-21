import axios from "axios";
import React, { useState } from "react";
import style from "./AdminProfile.module.scss";

const UserProfile = () => {

    const [emailForBlock, setEmail] = useState();

    const changeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    return (
        <div className={style.wrapper}>
                <input type="email"
                    className={style.forinputs}
                    placeholder={"E-mail"}
                    autoComplete={"off"}
                    value={emailForBlock}
                    onChange={changeEmail}
            />
            <div className={style.forbuttons}>
                <button type="submit" className={style.submit} onClick={() => { axios.get(`/api/admin/blockUser?email=${emailForBlock}`) }}><span>Заблокировать</span></button>
                <button type="submit" className={style.submit} onClick={() => { axios.get(`/api/admin/unblockUser?email=${emailForBlock}`) }}><span>Разблокировать</span></button>
                <button type="submit" className={style.submit} onClick={() => { axios.get(`/api/admin/setrolebooster?email=${emailForBlock}`) }}><span>Сделать бустером</span></button>
            </div>

        </div>
    );
}
export default UserProfile;

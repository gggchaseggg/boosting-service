import React from "react";
import axios from "axios";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import style from "./Login.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";

type FormRegisterValueType = {

    regEmail: string;
    regNickname: string;
    regPhone: string;
    regPassword: string;

}

type FormLoginValueType = {
    logEmail: string;
    logPassword: string;
}

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {
        register: registerRegister,
        handleSubmit: registerHandleSubmit,
        reset: registerReset,
        setError: registerSetError,
        formState: {
            errors: registerErrors
        }
    } = useForm<FormRegisterValueType>();

    const onRegisterSubmit: SubmitHandler<FormRegisterValueType> = async (data) => {
        const usersWithEmail = await axios.get("api/account/existsemail", { params: { email: data.regEmail } }).then(({ data }) => data)
        if (!usersWithEmail) {
            registerSetError("regEmail", { type: "custom", message: "userEmail is using" })
        } else {
            await axios.post("/api/account/register", data);
            registerReset();
            navigate("/");
        }
    }

    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        reset: loginReset,
        setError: loginSetError,
        formState: {
            errors: loginErrors
        }
    } = useForm<FormLoginValueType>();

    const onLoginSubmit: SubmitHandler<FormLoginValueType> = async (data) => {
        const accountRole = await axios.post("/api/account/login", data).then(({ data }) => data);
        if (accountRole === "err") {
            localStorage.clear();
            loginSetError("logEmail", { type: "custom", message: "chto-to ne tak" })
        }
        else {
            localStorage.setItem("email", data.logEmail);
            axios.get(`/api/account/getnickname/${data.logEmail}`).then(({ data }) => dispatch(setUser({ nickname: data })))
            document.cookie = `role=${accountRole};`
            loginReset();
            navigate("/profile");
        }
    }

    return (

        <div className={style.wrapper}>
            <div className={style.radioButtons}>
                <input type="radio" name="logReg" id={style.login} defaultChecked={true} />
                <label htmlFor={style.login}
                    id={style.loginLabel}
                    >Вход
                </label>
                <input type="radio" name="logReg" id={style.register} />
                <label htmlFor={style.register}
                    id={style.registerLabel}
                    >Регистрация
                </label>
            </div>
            <div className={style.loginForm}>
                <form onSubmit={loginHandleSubmit(onLoginSubmit)}>
                    {
                        loginErrors.logEmail && <span className={style.loginError}>Что-то пошло не так</span>
                    }
                    <input type="email"
                        className={style.input}
                        {...loginRegister("logEmail", { required: true })}
                        placeholder={"E-mail"}
                        autoComplete={"off"} />
                    <input type="password"
                        className={style.input}
                        {...loginRegister("logPassword", { required: true })}
                        placeholder={"Пароль"}
                        autoComplete={"off"} />
                    <button type="submit" className={style.submit}>Войти</button>
                </form>
            </div>
            <div className={style.registerForm}>
                <form onSubmit={registerHandleSubmit(onRegisterSubmit)}>
                    {
                        registerErrors.regEmail && <span className={style.registerError}>Адрес электронной почты уже зарегистирован</span>
                    }
                    <input type="nickname"
                        className={style.input}
                        {...registerRegister("regNickname", { required: true })}
                        placeholder={"Имя пользователя"}
                        autoComplete={"off"} />
                    <input type="email"
                        className={style.input}
                        {...registerRegister("regEmail", { required: true })}
                        placeholder={"E-mail"}
                        autoComplete={"off"} />
                    
                    <input type="phone"
                        className={style.input}
                        {...registerRegister("regPhone", { required: true })}
                        placeholder={"Номер телефона"}
                        autoComplete={"off"} />
                    <input type="password"
                        className={style.input}
                        {...registerRegister("regPassword", { required: true })}
                        placeholder={"Пароль"}
                        autoComplete={"off"} />
                    <button type="submit" className={style.submit}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}
export default Login;

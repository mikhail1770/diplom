import React from "react";
import '../App.css';
import {BrowserRouter, NavLink} from "react-router-dom";
import s from './Authorization.module.css';
import univDoc from "../Header/UnivDoc.svg";

function Authorization() {
    return (
        <div className={`${s.background} container App`}>
            <div className="row">

                <img className={`${s.univDoc}`} src={univDoc}/>

            </div>

                <div className={`row ${s.margin}`}>
                    <span className={`row ${s.title}`}>Выполнить вход</span>
                </div>
                <div className={`row ${s.margin}`}>

                    <input type="login"  className={`form-control ${s.w}`} id="exampleInputPassword1" placeholder="Введите логин"/>
                </div>
                <div className={`row ${s.margin}`}>
                    <input type="password"  className={`form-control ${s.w}`} id="exampleInputPassword1" placeholder="Введите пароль"/>

                </div>
            <div className={`row ${s.logIn}`}>
                <div ><NavLink to='/' className={`${s.linkDoc}`}>Войти</NavLink></div>
            </div>
            <div className={`row ${s.signIn}`}>
                <div><NavLink to='/registration' className={`${s.linkDoc}`}>Регистрация</NavLink></div>
            </div>

        </div>
    );
}

export default Authorization;

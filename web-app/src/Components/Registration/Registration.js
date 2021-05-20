import React from "react";
import '../App.css';
import s from "../Authorization/Authorization.module.css";
import univDoc from "../Header/UnivDoc.svg";
import {NavLink} from "react-router-dom";


function Registration() {
    return (
        <div className={`${s.background} container App`}>
            <div className="row">

                <img className={`${s.univDoc}`} src={univDoc}/>

            </div>

            <div className={`row ${s.margin}`}>
                <span className={`row ${s.title}`}>Введите данные для регистрации</span>
            </div>
            <div className={`row ${s.margin}`}>

                <input type="login"  className={`form-control ${s.w}`} id="exampleInputPassword1" placeholder="Введите логин"/>
            </div>
            <div className={`row ${s.margin}`}>


            </div>
            <div className={`row ${s.logIn}`}>
                <div ><NavLink to='/' className={`${s.linkDoc}`}>Зарегистрироваться</NavLink></div>
            </div>
            <div className={`row ${s.signIn}`}>
                <div><NavLink to='/' className={`${s.linkDoc}`}>Войти</NavLink></div>
            </div>

        </div>
    );
}

export default Registration;

import React from "react";
import '../App.css';
import s from "../Registration/Registration.module.css";
import univDoc from "../Header/UnivDoc.svg";
import {NavLink} from "react-router-dom";


function Registration() {
    return (
        <div className={`${s.background} container App`}>
            <div className="row">
                <img className={`${s.univDoc}`} src={univDoc}/>

            </div>

            <div className={`row ${s.margin2}`}>
                <span className={`row ${s.title}`}>Введите данные для регистрации</span>
            </div>

            <div className={`row ${s.margin2}`}>
                <div ><input type="text" className={`form-control ${s.w}`} id="exampleInputPassword1"
                                     placeholder="Имя"/></div>
                <div ><input type="text" className={`form-control ${s.w}`} id="exampleInputPassword1"
                                     placeholder="Введите логин"/></div>
            </div>
            <div className={`row ${s.margin2}`}>
                <div  ><input autoComplete='false' type="text" className={`form-control ${s.w}`} id="exampleInputPassword1"
                                     placeholder="Фамилия" /></div>
                <div ><input type="password" className={`form-control ${s.w}`} id="exampleInputPassword1"
                                     placeholder="Введите пароль"/></div>
            </div>
            <div className={`row ${s.margin2}`}>
                <div ><input type="Text" className={`form-control ${s.w}`} id="exampleInputPassword1"
                                     placeholder="Отчество"/></div>
                <div ><input type="password" className={`form-control ${s.w}`} id="exampleInputPassword1"
                                     placeholder="Повторите пароль"/></div>
            </div>


            <div className={`row ${s.logIn}`}>
                <div><NavLink to='/registration' className={`${s.linkDoc}`}>Зарегистрироваться</NavLink></div>
            </div>
            <div className={`row ${s.signIn}`}>
                <div><NavLink to='/' className={`${s.linkDoc}`}>Войти</NavLink></div>
            </div>
        </div>
    );
}

export default Registration;

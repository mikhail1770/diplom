import React from "react";
import '../../App.css';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <div className={`${s.background}`}>
            <div className={`${s.header} row`}>
                <div className="col-md-2">
                    <NavLink  to='/' activeClassName={s.activeLink}>Документы кафедры</NavLink>
                </div>
                <div className="col-md-2">

                </div>
                <div className="col-md-8 text-right">
                    Личный кабинет
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                </div>
            </div>
        </div>
    );
}

export default Header;

import React from 'react';
import './../App.css';
import s from './Main.module.css';
import {Link, NavLink} from "react-router-dom";


function Main() {
    return (
        <div>
            <div className={`${s.nav} row`}>
                <div className="col-md-2">
                    <NavLink to='/navigation' activeClassName={s.active}>Новый документ</NavLink>
                </div>
                <div className="col-md-10">
                    <NavLink to='/MyDocuments' activeClassName={s.active}>Мои документы</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Main;

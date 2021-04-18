import React from "react";
import '../../App.css';
import s from './Header.module.css';

function Header() {
    return (
        <div className={`${s.background}`}>
            <div className={`${s.header} row`}>
                <div className="col-md-6">
                    Logo
                </div>
                <div className="col-md-6 text-right">
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

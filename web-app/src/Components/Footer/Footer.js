import React from "react";
import '../../App.css';
import s from './Footer.module.css';

function Footer() {
    return (
        <div className={`${s.footer} row`}>
            <div className="col-md-12">
                Контакты, авторство, ссылки и т.д.
            </div>
        </div>

);
}

export default Footer;

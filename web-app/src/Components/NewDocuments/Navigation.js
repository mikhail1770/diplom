import React from "react";
import '../../App.css';
import s from './Navigation.module.css';
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-3`}>
                    <div><p>Регистрация работ студентов</p></div>
                </div>
                <div className="col-md-9">
                    <ul>
                        <li><Link to='/Doc_1'> Учет контрольных и курсовых работ студентов заочной
                            формы обучения</Link></li>
                        <li><a href="#">Учет курсовых работ студентов очной формы обучения</a>
                        </li>
                        <li><a href="#">Учет отчетов по практике</a></li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-3`}>
                    <div><p>Учет учебной нагрузки</p></div>
                </div>
                <div className="col-md-9">
                    <ul>
                        <li><a href="#">Нагрузка преподавателей</a></li>
                        <li><a href="#">Нагрузка преподавателей-почасовиков</a></li>
                        <li><a href="#">Нагрузка преподавателей, работающих на условиях
                            договора об оказании услуг</a></li>
                        <li><a href="#">Учет дополнительной учебной нагрузки
                            преподавателей</a></li>
                        <li><a href="#">Заявление о приеме (почас.оплата)</a></li>
                        <li><a href="#">Заявление на оплату (почас.оплата)</a></li>
                        <li><a href="#">Договор оказания услуг</a></li>
                        <li><a href="#">Отчет о выполнении дополнительного объема работ</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-3`}>
                    <div><p>Учет посещений мероприятий</p></div>
                </div>
                <div className="col-md-9">
                    <ul>
                        <li><a href="#">Учет участия профессорско-преподавательского состава в
                            мероприятиях</a></li>
                        <li><a href="#">Учет взаимных посещений занятий преподавателями</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-3`}>
                    <div><p>Другое</p></div>
                </div>
                <div className="col-md-9">
                    <ul>
                        <li><a href="#">Журнал оценки знаний студентов</a></li>
                        <li><a href="#">Журнал регистрации приказов и распоряжений кафедры</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
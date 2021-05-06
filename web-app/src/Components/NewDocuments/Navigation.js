import React from "react";
import '../../App.css';
import s from './Navigation.module.css';
import {Link} from "react-router-dom";

function Navigation(props) {
    return (
        <div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-3`}>
                    <div><p>Регистрация работ студентов</p></div>
                </div>
                <div className="col-md-9">
                    <ul>
                        <li><Link to={'/1'}> Учет контрольных и курсовых работ студентов заочной
                            формы обучения</Link></li>
                        <li><Link to={'/2'}>Учет курсовых работ студентов очной формы обучения</Link>
                        </li>
                        <li><Link to={'/3'}>Учет отчетов по практике</Link></li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-3`}>
                    <div><p>Учет учебной нагрузки</p></div>
                </div>
                <div className="col-md-9">
                    <ul>
                        <li><Link to={'/4'}>Нагрузка преподавателей</Link></li>
                        <li><Link to={'/5'}>Нагрузка преподавателей-почасовиков</Link></li>
                        <li><Link to={'/6'}>Нагрузка преподавателей, работающих на условиях
                            договора об оказании услуг</Link></li>
                        <li><Link to={'/7'}>Учет дополнительной учебной нагрузки
                            преподавателей</Link></li>
                        <li><Link to={'/8'}>Заявление о приеме (почас.оплата)</Link></li>
                        <li><Link to={'/9'}>Заявление на оплату (почас.оплата)</Link></li>
                        <li><Link to={'/10'}>Договор оказания услуг</Link></li>
                        <li><Link to={'/11'}>Отчет о выполнении дополнительного объема работ</Link>
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
                        <li><Link to={'/12'}>Учет участия профессорско-преподавательского состава в
                            мероприятиях</Link></li>
                        <li><Link to={'/13'}>Учет взаимных посещений занятий преподавателями</Link>
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
                        <li><Link to={'/14'}>Журнал оценки знаний студентов</Link></li>
                        <li><Link to={'/15'}>Журнал регистрации приказов и распоряжений кафедры</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
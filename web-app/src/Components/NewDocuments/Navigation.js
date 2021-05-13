import React from "react";
import '../App.css';
import s from './Navigation.module.css';
import {Link} from "react-router-dom";

function Navigation(props) {
    return (
        <div>
            <div className='line row'>
                <div className='nameDepartment col-md-6'>
                    <span>Кафедра информационных систем и технологий</span>
                </div>
                <div className='listDoc col-md-6'>
                    <span>Перечень документов ведения учетов</span>
                </div>
            </div>
            <div className='lineBlack row'>

            </div>
            <div className={`${s.categories} ${s.shadowUpper} row`}>
                <div className={`${s.category} col-md-4 `}>
                    <div><p>Регистрация работ студентов</p></div>
                </div>
                <div className={`${s.listDoc} col-md-8`}>
                    <ul>
                        <li className={`${s.noPaddingTop}`}><Link to={'/1'}> Учет контрольных и курсовых работ студентов заочной
                            формы обучения</Link></li>
                        <li><Link to={'/2'}>Учет курсовых работ студентов очной формы обучения</Link>
                        </li>
                        <li className={`${s.noPaddingBottoom}`}><Link to={'/3'} className={`${s.noBorder}`}>Учет отчетов по практике</Link></li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-4`}>
                    <div><p>Учет учебной нагрузки</p></div>
                </div>
                <div className={`${s.listDoc} col-md-8`}>
                    <ul>
                        <li className={`${s.noPaddingTop}`}><Link to={'/4'}>Нагрузка преподавателей</Link></li>
                        <li><Link to={'/5'}>Нагрузка преподавателей-почасовиков</Link></li>
                        <li><Link to={'/6'}>Нагрузка преподавателей, работающих на условиях
                            договора об оказании услуг</Link></li>
                        <li><Link to={'/7'}>Учет дополнительной учебной нагрузки
                            преподавателей</Link></li>
                        <li><Link to={'/8'}>Заявление о приеме (почас.оплата)</Link></li>
                        <li><Link to={'/9'}>Заявление на оплату (почас.оплата)</Link></li>
                        <li><Link to={'/10'}>Договор оказания услуг</Link></li>
                        <li className={`${s.noPaddingBottoom}`}><Link to={'/11'} className={`${s.noBorder}`}>Отчет о выполнении дополнительного объема работ</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} row`}>
                <div className={`${s.category} col-md-4`}>
                    <div><p>Учет посещений мероприятий</p></div>
                </div>
                <div className={`${s.listDoc} col-md-8`}>
                    <ul>
                        <li className={`${s.noPaddingTop}`}><Link to={'/12'}>Учет участия профессорско-преподавательского состава в
                            мероприятиях</Link></li>
                        <li className={`${s.noPaddingBottoom}`}><Link to={'/13'} className={`${s.noBorder}`}>Учет взаимных посещений занятий преподавателями</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${s.categories} ${s.shadowBelow} row`}>
                <div className={`${s.category} col-md-4`}>
                    <div><p>Другое</p></div>
                </div>
                <div className={`${s.listDoc} col-md-8`}>
                    <ul>
                        <li className={`${s.noPaddingTop}`}><Link to={'/14'}>Журнал оценки знаний студентов</Link></li>
                        <li  className={`${s.noPaddingBottoom}`}><Link to={'/15' } className={`${s.noBorder}`}>Журнал регистрации приказов и распоряжений кафедры</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
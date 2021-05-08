import React from "react";
import '../../App.css';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import doc from './doc.png';
import user from './user.png';

function Header() {
    return (
        <div className={`${s.header}`}>
            <div className={`${s.upperBlock} row`}>
                <div className='col-md-4'>
                    <div className={`${s.upperBlocdfgk} row`}>
                        <div className='col-md-12'>
                            <img className={`${s.iconDoc}`} src={doc}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <NavLink to='/' activeClassName={`${s.activeLink}`} className={`${s.textLink}`}> <div className={`${s.linkDoc}`}>Документы кафедры</div></NavLink>
                        </div>
                    </div>

                </div>
                <div className='col-md-4'>
                    <span className={`${s.logo}`}>UnivDoc</span>
                </div>
                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <img className={`${s.iconUser}`} src={user}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className={`${s.linkUser}`}><NavLink to='/' className={`${s.textLink}`}>Личный
                                кабинет</NavLink></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`${s.line} row`}>
                <div className={`${s.nameKafedra} col-md-6`}>
                    <span>Кафедра информационных систем и технологий</span>
                </div>
                <div className={`${s.listDoc} col-md-6`}>
                    <span>Перечень документов </span>
                </div>
            </div>
            <div className={`${s.lineBlack} row`}>

            </div>
        </div>
    );
}

export default Header;

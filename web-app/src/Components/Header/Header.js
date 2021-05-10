import React from "react";
import '../../App.css';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import doc from './doc.svg';
import user from './user.svg';
import univDoc from './UnivDoc.svg';
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
                            <div ><NavLink to='/' className={`${s.linkDoc} ${s.mar1}`}>Документы кафедры</NavLink></div>
                        </div>
                    </div>

                </div>
                <div className='col-md-4'>
                    <img className={`${s.univDoc}`} src={univDoc}/>
                </div>
                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <img className={`${s.iconUser}`} src={user}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div  className={`${s.mar} col-md-12}`}>
                           <div><NavLink to='/' className={`${s.linkUser}`}> Личный кабинет </NavLink></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`${s.line} row`}>
                <div className={`${s.nameKafedra} col-md-6`}>
                    <span>Кафедра информационных систем и технологий</span>
                </div>
                <div className={`${s.listDoc} col-md-6`}>
                    <span>Перечень документов ведения учета</span>
                </div>
            </div>
            <div className={`${s.lineBlack} row`}>

            </div>
        </div>
    );
}

export default Header;

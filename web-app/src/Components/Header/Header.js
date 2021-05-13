import React from "react";
import '../App.css';
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
                    <div className={` row`}>
                        <div className={`${s.mar} col-md-12`}>
                            <div ><NavLink to='/' className={`${s.linkDoc}`}>Документы кафедры</NavLink></div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <img className={`${s.univDoc}`} src={univDoc}/>
                </div>
                <div className='col-md-4'>
                    <div className={`${s.mar1} row`}>
                        <div  className={`col-md-12}`}>
                           <div className={`${s.linkUser}`} ><span className='a'>Чуйко Ольга Игоревна</span> </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Header;

import React from "react";
import '../App.css';
import {BrowserRouter, NavLink} from "react-router-dom";
import s from './Authorization.module.css';
import univDoc from "../Header/UnivDoc.svg";

class Authorization extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: ''
        }
        this.onAuto = this.onAuto.bind(this);
    }

    onAuto(){
        this.props.onAuto(this.state);
    }

    render(){
        return (
            <div className={`${s.background} container App`}>
                <div className="row">
    
                    <img className={`${s.univDoc}`} src={univDoc}/>
    
                </div>
    
                <div className={`row ${s.margin}`}>
                    <span className={`row ${s.title}`}>Выполнить вход</span>
                </div>
                <div className={`row ${s.margin}`}>
    
                    <input onChange={e => this.setState({login: e.target.value})} type="login" className={`form-control ${s.w}`} id="exampleInputPassword1"
                           placeholder="Введите логин"/>
                </div>
                <div className={`row ${s.margin}`}>
                    <input type="password" onChange={e => this.setState({password: e.target.value})} className={`form-control ${s.w}`} id="exampleInputPassword1"
                           placeholder="Введите пароль"/>
                </div>

                <div className={`row ${s.logIn}`}>
                    <div className={`${s.linkDoc} cursor`} onClick={this.onAuto}>Войти</div>
                </div>
                <div className={`row ${s.signIn}`}>
                    <div><NavLink to='/registration' className={`${s.linkDoc}`}>Регистрация</NavLink></div>
                    {console.log(this.onAuto)}
                </div>
    
            </div>
        );
    }
    
}

export default Authorization;

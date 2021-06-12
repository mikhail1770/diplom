import React from "react";
import '../App.css';
import {Link} from "react-router-dom";
import s from './Authorization.module.css';
import univDoc from "../Header/UnivDoc.svg";

class Authorization extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            error: this.props.error,
            isLogin: true,
            error2:''
        }
        this.onAuto = this.onAuto.bind(this);
    }

    onAuto() {
        if (this.state.login !== '' && this.state.password !== '') {
                this.props.onAuto(this.state);
        }
        else {
            this.setState({error: "Введите ваш логин и пароль"})
            return;
        }
        this.setState({error: this.props.error})
    }

    render(){
        return (
            <div className={`${s.background} container App`}>
                <div className="row">
                    <img className={`${s.univDoc}`} src={univDoc} alt="Логотип"/>
                </div>

                <div className={`row ${s.margin}`}>
                    <span className={`row ${s.title}`}>Выполнить вход</span>
                </div>
                <div className={`row ${s.margin}`}>
                    <input
                        onChange={e => this.setState({login: e.target.value})}
                        type="login"
                        className={`form-control ${s.w}`}
                        placeholder="Введите логин"/>
                </div>
                <div className={`row ${s.margin}`}>
                    <input
                        type="password"
                        onChange={e => this.setState({password: e.target.value})}
                        className={`form-control ${s.w}`}
                        placeholder="Введите пароль"/>
                </div>
               <div className={`row `}><p className='textRegRed'>{this.state.error}</p> </div>
                    <div className={`row ${s.logIn}`}>
                    <div className={`${s.linkDoc} cursor`} onClick={this.onAuto}>Войти</div>
                </div>
                <div className={`row ${s.signIn}`}>
                    <div><Link to='/registration' className={`${s.linkDoc}`}>Регистрация</Link></div>
                </div>
            </div>
        );
    }
    
}

export default Authorization;

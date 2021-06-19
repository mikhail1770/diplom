import React from "react";
import '../App.css';
import s from "../Registration/Registration.module.css";
import univDoc from "../Header/UnivDoc.svg";
import {NavLink} from "react-router-dom";
import axios from "axios";



export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName:true,
            firstName:true,
            patronymic:true,
            login:true,
            password:true,
            repeatPassword:true,
            error:''
        };
    }

    onChangeLastName = e => {
        this.setState({lastName:e.target.value})
    }

    onChangeFirstName = e => {
        this.setState({firstName:e.target.value})
    }

    onChangePatronymic = e => {
        this.setState({patronymic:e.target.value})
        console.log(this.state.patronymic)
    }

    onChangeLogin = e => {
        this.setState({login:e.target.value})
        console.log(this.state.login)
    }

    onChangePassword = e => {
        this.setState({password:e.target.value})
        console.log(this.state.password)
    }

    onChangeRepeatPassword = e => {
        this.setState({repeatPassword:e.target.value})
        console.log(this.state.repeatPassword)
    }

    onRegistration = e => {
        if(this.state.firstName === true){
            this.setState({firstName: ''})
        }
         if (this.state.lastName === true) {
            this.setState({lastName: ''})
        }
        if (this.state.patronymic === true) {
            this.setState({patronymic: ''})
        }
         if (this.state.login === true) {
            this.setState({login: ''})
        }
         if (this.state.password === true) {
            this.setState({password: ''})
        }
         if (this.state.repeatPassword === true) {
            this.setState({repeatPassword: ''})
        }
        if ((this.state.login !== true && this.state.login !== '')&& (this.state.password !== true && this.state.password !== '')&& (this.state.lastName !== true && this.state.lastName !== '' )
            && (this.state.firstName !== true && this.state.firstName !== '')&& (this.state.patronymic !== true && this.state.patronymic !== '' )) {

            if(this.state.password === this.state.repeatPassword) {
                axios.post(`http://localhost:3001/registration/newUser/`, {
                    login: this.state.login,
                    password: this.state.password,
                    fio: this.state.lastName + ' ' + this.state.firstName + ' ' + this.state.patronymic,
                }).then(res => {
                    console.log(res.data)
                    this.setState({error: res.data})
                })
            }
            else {
                this.setState({error: 'Пароли не совпадают'})
            }
        }
        else {
            this.setState({error: 'Заполните все поля'})
        }

    }

    render() {
        return (
            <div className={`${s.background} container App`}>
                <div className="row">
                    <img className={`${s.univDoc}`} src={univDoc}/>

                </div>
                <div className={`row ${s.margin2}`}>
                    <span className={`row ${s.title}`}>Введите данные для регистрации</span>
                </div>
                <div className={`row ${s.margin2}`}>
                    <div>{this.state.firstName === ''   ?
                        <input
                        type="text"
                        className={`form-control ${s.w} inputError`}
                        placeholder="Имя"
                        onChange={(e) => this.onChangeFirstName(e)}/> :
                        <input
                            type="text"
                            className={`form-control ${s.w}`}
                            placeholder="Имя"
                            onChange={(e) => this.onChangeFirstName(e)}/>}
                    </div>
                    <div>{this.state.login === '' || this.state.error === 'Используйте только латинские символы'  ?
                        <input
                        type="text"
                        className={`form-control ${s.w} inputError`}
                        placeholder="Введите логин"
                        onChange={(e) => this.onChangeLogin(e)}/> : <input
                        type="text"
                        className={`form-control ${s.w}`}
                        id="example"
                        placeholder="Введите логин"
                        onChange={(e) => this.onChangeLogin(e)}/>}
                    </div>
                </div>
                <div className={`row ${s.margin2}`}>
                    <div>{this.state.lastName === ''   ?
                        <input
                        type="text"
                        className={`form-control ${s.w} inputError`}
                        placeholder="Фамилия"
                        onChange={(e) => this.onChangeLastName(e)}/>: <input
                        type="text"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Фамилия"
                        onChange={(e) => this.onChangeLastName(e)}/>}</div>
                    <div>{this.state.password === ''   ?
                        <input
                        type="password"
                        className={`form-control ${s.w} inputError`}
                        id="exampleInputPassword1"
                        placeholder="Введите пароль"
                        onChange={(e) => this.onChangePassword(e)}/>: <input
                        type="password"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Введите пароль"
                        onChange={(e) => this.onChangePassword(e)}/>}</div>
                </div>
                <div className={`row ${s.margin2}`}>
                    <div>{this.state.patronymic === ''   ?
                        <input
                        type="Text"
                        className={`form-control ${s.w} inputError`}
                        id="exampleInputPassword1"
                        placeholder="Отчество"
                        onChange={(e) => this.onChangePatronymic(e)}/> : <input
                        type="Text"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Отчество"
                        onChange={(e) => this.onChangePatronymic(e)}/>}</div>
                    <div>{this.state.repeatPassword === ''   ?
                        <input
                        type="password"
                        className={`form-control ${s.w} inputError`}
                        id="exampleInputPassword1"
                        placeholder="Повторите пароль"
                        onChange={(e) => this.onChangeRepeatPassword(e)}/> : <input
                        type="password"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Повторите пароль"
                        onChange={(e) => this.onChangeRepeatPassword(e)}/>} </div>
                </div>
                {this.state.error === 'Используйте только латинские символы' ? <div className={`row `}><p className='textRegRed'>{this.state.error}</p> </div> : this.state.error == 'Вы успешно зарегистрированы' ? <div className={`row `}><p className='textReg'>{this.state.error}</p> </div> :
                    this.state.error === 'Заполните все поля' ? <div className={`row `}><p className='textRegRed'>{this.state.error}</p> </div> :  this.state.error == 'Пароли не совпадают' ? <div className={`row `}><p className='textRegRed'>{this.state.error}</p> </div> : <div className={`row `}><p ></p> </div>}

                <div className={`row ${s.logIn}`}>
                    <div onClick={this.onRegistration} className={`${s.linkDoc}`}>Зарегистрироваться</div>
                </div>
                <div className={`row ${s.signIn}`}>
                    <div ><NavLink to='/' className={`${s.linkDoc}`}>Войти</NavLink></div>
                </div>
            </div>
        );
    }
}



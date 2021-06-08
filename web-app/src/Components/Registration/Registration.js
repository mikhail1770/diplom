import React from "react";
import '../App.css';
import s from "../Registration/Registration.module.css";
import univDoc from "../Header/UnivDoc.svg";
import {NavLink} from "react-router-dom";
import {post} from "../Documents/axios";
import axios from "axios";



export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName:'',
            firstName:'',
            patronymic:'',
            login:'',
            password:'',
            repeatPassword:''
        };
    }

    onChangeLastName = e => {
        this.setState({lastName:e.target.value})
        console.log(this.state.lastName)
    }

    onChangeFirstName = e => {
        this.setState({firstName:e.target.value})
        console.log(this.state.firstName)
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
        axios.post(`http://localhost:3001/registration/newUser/`, {
           login: this.state.login,
            password: this.props.password,
            fio: this.state.lastName + this.state.firstName + this.state.patronymic,
        }).then(res => {
            console.log(res.data)
        })
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
                    <div><input
                        type="text"
                        className={`form-control ${s.w}`}
                        placeholder="Имя"
                        onChange={(e) => this.onChangeFirstName(e)}/>
                    </div>
                    <div><input
                        type="text"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Введите логин"
                        onChange={(e) => this.onChangeLogin(e)}/>
                    </div>
                </div>
                <div className={`row ${s.margin2}`}>
                    <div><input
                        type="text"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Фамилия"
                        onChange={(e) => this.onChangeLastName(e)}/></div>
                    <div><input
                        type="password"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Введите пароль"
                        onChange={(e) => this.onChangePassword(e)}/></div>
                </div>
                <div className={`row ${s.margin2}`}>
                    <div><input
                        type="Text"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Отчество"
                        onChange={(e) => this.onChangePatronymic(e)}/></div>
                    <div><input
                        type="password"
                        className={`form-control ${s.w}`}
                        id="exampleInputPassword1"
                        placeholder="Повторите пароль"
                        onChange={(e) => this.onChangeRepeatPassword(e)}/></div>
                </div>

                {false ? <div className={`row textReg`}>Вы успешно зарегистрированы! </div> :  <div className={`row textReg`}><p></p></div>}

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



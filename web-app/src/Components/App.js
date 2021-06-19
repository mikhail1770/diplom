import React from 'react';
import './App.css';
import Header from './Header/Header.js';
import Navigation from './NewDocuments/Navigation.js';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import DocumentRender from "./DocumentRender";
import Authorization from "./Authorization/Authorization";
import Registration from "./Registration/Registration";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            error: ''
        }
        this.onAuthorization = this.onAuthorization.bind(this);
    }

    componentWillMount() {
        if (!localStorage.getItem('token')) {
            this.setState({isLogin: false})
            this.props.history.push('/')
        } else {
            this.setState({isLogin: true})
        }
    }

    onAuthorization = (data) => {
        axios.post(`http://localhost:3001/account/token`, data).then(res => {
            localStorage.setItem('token', res.data.detail);
            window.location.reload();
            return new Promise((resolve, rej) => {
                resolve(res)
            })
        }).catch((err) => {
            return new Promise((resolve, reject) => {
                reject(err);
                this.setState({error: err.response.data.detail})
            });
        });
    }

    onExit = () => {
        this.setState({isLogin: false})
        localStorage.removeItem('token');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLogin !== nextState) {
            return true;
        }
        return false;
    }


    render() {
        if (this.state.isLogin === true) {
            return (
                <BrowserRouter>
                    <div className="container App">
                        <Header onExit={this.onExit}/>
                        <div className="content">
                            <Route exact path="/" component={Navigation}/>
                            <Route exact path="/:documentId" component={DocumentRender}/>
                        </div>
                    </div>
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter>
                        <Route exact path="/" render={(props) => <Authorization
                            onAuto={this.onAuthorization} error={this.state.error}{...props}/>}/>
                        <Route exact path="/registration" component={Registration}/>}/>
                </BrowserRouter>
            );
        }
    }
}

export default withRouter(App);

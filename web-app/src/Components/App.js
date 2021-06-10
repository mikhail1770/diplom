import React from 'react';
import './App.css';
import Header from './Header/Header.js';
import Navigation from './NewDocuments/Navigation.js';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import DocumentRender from "./DocumentRender";
import Authorization from "./Authorization/Authorization";
import Registration from "./Registration/Registration";
import {post} from "../Components/Documents/axios"


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,

        }
        this.onAuthorization = this.onAuthorization.bind(this);
    }

    componentWillMount(){
        if(!localStorage.getItem('token')){
            this.setState({isLogin: false})
            this.props.history.push('/')
        }else{
            this.setState({isLogin: true})
        }
    }

    onAuthorization = (data) => {
        console.log('отправляем на сервер', data)
        post(`account/token`, data).then(res => { 
            //console.log(res.data.detail) 
            localStorage.setItem('token', res.data.detail);
            window.location.reload();
        })
        //this.setState({isLogin: true})
        //console.log(this.state.isLogin);

    }

    onExit = () => {
        this.setState({isLogin: false})
        localStorage.removeItem('token');
        console.log(this.state.isLogin);

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLogin !== nextState) {
            return true;
        }
        return false;
    }


    render() {

        if (this.state.isLogin == true) {
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
                    <Switch>
                        <Route exact path="/" render={(props) => <Authorization onAuto={this.onAuthorization} {...props}/>}/>
                        <Route exact path="/registration"  component={Registration}/>}/>
                    </Switch>
                </BrowserRouter>
            );
        }
    }
}

export default withRouter(App);

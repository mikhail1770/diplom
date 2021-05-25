import React from 'react';
import './App.css';
import Header from './Header/Header.js';
import Navigation from './NewDocuments/Navigation.js';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DocumentRender from "./DocumentRender";
import Authorization from "./Authorization/Authorization";
import Registration from "./Registration/Registration";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,

        }
        this.onAuthorization = this.onAuthorization.bind(this);
    }

    onAuthorization = () => {
        this.setState({isLogin: true})
        console.log(this.state.isLogin);

    }

    onExit = () => {
        this.setState({isLogin: false})
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
                            <Switch>
                                <Route exact path="/" component={Navigation}/>
                                <Route exact path="/:documentId" component={DocumentRender}/>
                            </Switch>
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

export default App;

import React from 'react';
import './App.css';
import Header from './Header/Header.js';
import Navigation from './NewDocuments/Navigation.js';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from "./Footer/Footer.js";
import DocumentRender from "./DocumentRender";
import Authorization from "./Authorization/Authorization";
import Registration from "./Registration/Registration";


function App() {
    if (true) {
        return (
            <BrowserRouter>
                <div className="container App">
                    <Header/>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Navigation}/>
                            <Route exact path="/:documentId" component={DocumentRender}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
    else {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Authorization}/>
                    <Route exact path="/registration" component={Registration}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

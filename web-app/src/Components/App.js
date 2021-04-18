import React from 'react';
import './../App.css';
import Header from './Header/Header.js';
import Main from './Nav/Main.js';
import Navigation from './NewDocuments/Navigation.js';
import s from './App.module.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MyDocuments from "./MyDocuments/MyDocuments";
import Footer from "./Footer/Footer.js";
import Doc_1 from "./Documents/Doc_1";

function App() {
    return (
        <BrowserRouter>
            <div className="container App">
                <Header />
                <Main />
                <div className="content">
                <Switch>
                    <Route  exact path="/" component={MyDocuments}/>
                    <Route  exact path="/myDocuments" component={MyDocuments}/>
                    <Route  path="/navigation" component={Navigation}/>
                    <Route  exact path="/Doc_1" component={Doc_1}/>
                </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;

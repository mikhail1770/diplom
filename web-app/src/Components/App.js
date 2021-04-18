import React from 'react';
import './../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Navigation from './Navigation.js';
import s from './App.module.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="container App">
                <Header />
                <Main />
                <Switch>
                    <Route exact path="/navigation" component={Navigation}/>
                    <Route exact path="/navigation:id" component={Navigation}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

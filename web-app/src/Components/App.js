import React from 'react';
import './App.css';
import Header from './Header/Header.js';
import Main from './Nav/Main.js';
import Navigation from './NewDocuments/Navigation.js';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from "./Footer/Footer.js";
import DocumentRender from "./DocumentRender";


function App() {



    return (
        <BrowserRouter>
            <div className="container App">
                <Header/>
                <div className="content">
                <Switch>
                    <Route  exact path="/"  component={Navigation}/>
                    <Route  exact path="/:documentId" component={DocumentRender}/>
                </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;

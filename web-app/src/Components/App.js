import React from 'react';
import './../App.css';
import Header from './Header/Header.js';
import Main from './Nav/Main.js';
import Navigation from './NewDocuments/Navigation.js';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MyDocuments from "./MyDocuments/MyDocuments";
import Footer from "./Footer/Footer.js";
import Doc1_1 from "./Documents/Doc1_1/Doc1_1";
import Doc1_2 from "./Documents/Doc1_2/Doc1_2.js";
import Doc1_3 from "./Documents/Doc1_3/Doc1_3.js";
import Doc2_1 from "./Documents/Doc2_1/Doc2_1.js";
import Doc2_2 from "./Documents/Doc2_2/Doc2_2.js";
import Doc2_3 from "./Documents/Doc2_3/Doc2_3.js";
import Doc2_4 from "./Documents/Doc2_4/Doc2_4.js";
import Doc2_5 from "./Documents/Doc2_5/Doc2_5.js";
import Doc2_6 from "./Documents/Doc2_6/Doc2_6.js";
import Doc2_7 from "./Documents/Doc2_7/Doc2_7.js";
import Doc2_8 from "./Documents/Doc2_8/Doc2_8.js";
import Doc3_1 from "./Documents/Doc3_1/Doc3_1.js";
import Doc3_2 from "./Documents/Doc3_2/Doc3_2.js";
import Doc4_1 from "./Documents/Doc4_1/Doc4_1.js";
import Doc4_2 from "./Documents/Doc4_2/Doc4_2.js";

function App() {

    return (
        <BrowserRouter>
            <div className="container App">
                <Header />
                <Main />
                <div className="content">
                <Switch>
                    <Route  exact path="/" component={MyDocuments}/>
                    <Route  exact path="/navigation"  component={Navigation}/>
                    <Route  exact path="/navigation/1" component={Doc1_1}/>
                    <Route  exact path="/navigation/2" component={Doc1_2}/>
                    <Route  exact path="/navigation/3" component={Doc1_3}/>
                    <Route  exact path="/navigation/4" component={Doc2_1}/>
                    <Route  exact path="/navigation/5" component={Doc2_2}/>
                    <Route  exact path="/navigation/6" component={Doc2_3}/>
                    <Route  exact path="/navigation/7" component={Doc2_4}/>
                    <Route  exact path="/navigation/8" component={Doc2_5}/>
                    <Route  exact path="/navigation/9" component={Doc2_6}/>
                    <Route  exact path="/navigation/10" component={Doc2_7}/>
                    <Route  exact path="/navigation/11" component={Doc2_8}/>
                    <Route  exact path="/navigation/12" component={Doc3_1}/>
                    <Route  exact path="/navigation/13" component={Doc3_2}/>
                    <Route  exact path="/navigation/14" component={Doc4_1}/>
                    <Route  exact path="/navigation/15" component={Doc4_2}/>
                </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;

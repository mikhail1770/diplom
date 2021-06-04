import React from "react";
import '../App.css';
import s from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import exit from './exit.svg';
import user from './user.svg';
import jwt_decode from "jwt-decode";
import univDoc from './UnivDoc.svg';
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: ''}
    }

    componentWillMount(){
        if(!localStorage.getItem('token')){
            localStorage.removeItem('token');
            window.location.reload();
        }else{
            let tokendecode = jwt_decode(localStorage.getItem('token'));
            //console.log(tokendecode.fio)
            this.setState({username: tokendecode.fio})
        }
    }
    render(){
        return (
            <div className={`${s.header}`}>
                <div className={`${s.upperBlock} row`}>
                    <div className='col-md-5'>
                        <Link to={'/'}> <img className={`${s.univDoc}`} src={univDoc}/></Link>
                    </div>
                    <div className='col-md-4'>
                        <div className={`row`}>
                            <div className={`${s.marName} col-md-12`}>
                                <img className={`${s.iconUser}`} src={user}/> <div className={`${s.linkDoc}`}>{this.state.username}</div>
                            </div>
                        </div>
                    </div>
    
                    <div className='col-md-3'>
                        <div className={`${s.marExit} row`}>
                            <div  className={`col-md-12}`}>
                                <div  className={`${s.linkExit}`}><NavLink to='/' onClick={this.props.onExit}>Выйти</NavLink></div> <div className={`${s.iconExit}`}><img  src={exit}/></div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
        );
    }
    
}

export default Header;

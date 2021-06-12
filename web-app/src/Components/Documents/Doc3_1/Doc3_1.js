import React from 'react';
import '../../App.css';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Table3_1 from "./Table3_1";
import main from "../main.svg";
import top from "../top.svg";
import printBig from "../printBig.svg";
import {Link} from "react-router-dom";
import gif from '../1.gif';
import ScrollToTop from 'react-scroll-up'
import s from "./Doc3_1.module.css";
import Table1_2 from "../Doc1_2/Table1_2";

export default class Doc3_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullNameProf: null,
            date: '',
            professor: '',
            professors: [],
            printLoad: false,
            profName: '',
            profInEvents: [],
            professorName: '',
            currentGroup: [],
            test:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onAutocompleteChange = this.onAutocompleteChange.bind(this);
        this.onPrint = this.onPrint.bind(this);

    }

    handleChange = event => { //для того, чтобы использовать несколько input
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }


    onAutocompleteChange = (value, name, fullName) => {
        console.log('sdf');
        if (!value) {
            return this.setState({[name]: null, [fullName]: null});
        } else {
            return this.setState({[name]: value.id, [fullName]: value});
        }
    }

    onOpenModal = (obj) => {
        this.setState({
            open: true,
            currentGroup: obj
        });
    }

    onCloseModal = () => {
        this.setState({
            open: false,
            currentGroup: {}
        });
    }

    onPrint = event => {
        this.setState({printLoad: true})
        get('search/profInEvent/profName/?print=1', {
            params: {
                profId: this.state.profName
            }
        }).then(res => {
            console.log(res)
            window.open('http://localhost:3001/printdocs/' + res.data.filename, '_blank').focus();
            this.setState({printLoad: false})
        })
    }

    onSubmit = event => {

        get(`search/profInEvent/profName/`, {
            params: {
                profId: this.state.profName,
                    sortIncomingDate: 'ASC'
            }}).then(res => {  //получение дисциплин
            const profInEvents = res.data;
            this.setState({profInEvents, test: true});
            console.log(profInEvents)
            this.onCloseModal()
        })

        this.setState({})
    }

    componentDidMount() {

        get('professor').then(res => {
            const professors = res.data;
            this.setState({professors});
            console.log(professors)
        })

    }

    render() {
        return (
            <div>
                <div className='line row'>

                    <div className='nameDepartment col-md-6'>
                        <span>Кафедра информационных систем и технологий</span>
                    </div>
                    <div className='listDoc col-md-6'>
                        <span>Учет участия ППС в мероприятиях</span>
                    </div>
                </div>
                <div className='lineBlack row'></div>
                <form className='nav container main'>

                    <div className='form-row row center-block form'>
                        <div className='col-md-10 pad'>
                            <Autocomplete
                                className='bot'
                                value={this.state.fullNameProf}
                                id="discipline"
                                getOptionLabel={(option) => option.profName}
                                options={this.state.professors}
                                onChange={(e, v) => this.onAutocompleteChange(v, "profName", 'fullNameProf')}
                                style={{width: 200}}
                                renderInput={(params) => <TextField {...params} label='ФИО преподавателя'
                                                                    variant="outlined"/>}
                            />
                        </div>

                        <div className='col-md-2'>
                            <div className='margi'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="btn btn-primary btnFind"
                                    onClick={this.onSubmit} disabled={!this.state.profName}>
                                    <span>Найти</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='row topTable nav'>
                    <div className='col-md-12 pad padRig'>
                        <Table3_1
                            profInEvents={this.state. profInEvents}
                            onOpenModal={this.onOpenModal}
                            currentGroup={this.state.currentGroup}
                            close={this.onCloseModal}
                            state={this.state.open}
                            handleChange={this.handleChange}
                            onSave={this.onSave}
                            print={this.onPrint}
                            printLoad={this.state.printLoad}
                            professors={this.state.professors}
                            onSubmit={this.onSubmit}
                            profId={this.state.profName}
                            test={this.state.test}/>
                    </div>
                    <div className='navs'>
                        <Link to={'/'} ><img src={main} className='cursor' title="Вернуться к документам" className='btnRight'/></Link>
                        <Link to={'/2'} ><div className='cursor btnRight1'><img src={top} title="Вернуться к документам" /></div></Link>
                        {!this.state.printLoad ? <div className='cursor q' onClick={this.onPrint}><img src={printBig}/></div> : <img src={gif} className='wid' />}
                    </div>
                </div>
            </div>
        )
    }
}


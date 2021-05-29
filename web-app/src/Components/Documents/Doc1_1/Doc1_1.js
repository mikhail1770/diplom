import React from 'react';
import '../../App.css';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Table1_1 from "./Table1_1";
import top from "../top.svg"
import {Link} from "react-router-dom";
import main from "../main.svg";
import printBig from "../printBig.svg";
import gif from "../1.gif";


export default class Doc1_1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationResults: ['к защите', 'к доработке'],
            students: [],
            groups: {},
            fullTimesGroups: [],
            discipline: null,
            group: '',
            disciplines: [],
            studentName: null,
            dateOfReceipt: '',
            verificationResult: 'к защите',
            fail: '',
            open: false,
            currentGroup: {},
            deleteObj: '',
            num: 1,
            courseworks: [],
            studentsName: [],
            disciplineName: '',
            fullDiscipline: null,
            fullName: null,
            printLoad: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.onAutoDis = this.onAutoDis.bind(this);
        this.onAutocompleteChange = this.onAutocompleteChange.bind(this);
    }


    handleChange = event => { //для того, чтобы использовать несколько input
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    onAutoDis = (value, name, fullName) => {
        if (!value) {
            return this.setState({[name]: null, [fullName]: null});
        } else {
            if (value.id != '') {
                this.setState({
                    [name]: value.id,
                    [fullName]: value,
                    fullName: null,
                    studentName: null,
                });
                get(`search/studnets/disciplines/formOfStudy/${value.id}`).then(res => {  //Запрос на получение дисциплин определенной группы
                    const studentsName = res.data;
                    this.setState({studentsName});
                    console.log(studentsName)
                })
            }
        }
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
        get('search/courseworkszaoch/disciplines/univGroup/?print=1', {
            params: {
                byDiscipline: this.state.discipline,
                byStudent: this.state.studentName
            }
        }).then(res => {
            console.log(res)
            window.open('http://localhost:3001/printdocs/' + res.data.filename, '_blank').focus();
            this.setState({printLoad: false})
        })
    }

    onSubmit = event => {
        get('search/courseworkszaoch/disciplines/univGroup', {
            params: {
                byDiscipline: this.state.discipline,
                byStudent: this.state.studentName
            }
        }).then(res => {
            const courseworks = res.data;
            this.setState({courseworks});
            console.log(courseworks)
        })
        this.state.disciplineName = this.state.disciplines.find(name => name.id === this.state.discipline).name;
    }

    componentDidMount() {
        get('disciplines/').then(res => {
            const disciplines = res.data;
            this.setState({disciplines});
            console.log(disciplines)
            this.setState({pageLoaded: true})
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
                        <span>Учет курсовых работ заочной формы обучения</span>
                    </div>
                </div>
                <div className='lineBlack row'></div>
                {this.state.pageLoaded ?
                    <div>
                        <form className='nav container main'>
                            <div className="form-row row center-block form">
                                <div className='col-md-4 pad'>
                                    <Autocomplete
                                        className='col-md-3'
                                        className='bot'
                                        value={this.state.fullDiscipline}
                                        id="discipline"
                                        getOptionLabel={(option) => option.name}
                                        options={this.state.disciplines}
                                        onChange={(e, v) => this.onAutoDis(v, "discipline", 'fullDiscipline')}
                                        style={{width: 200}}
                                        renderInput={(params) => <TextField {...params} label='Дисциплина'
                                                                            variant="outlined"/>}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <Autocomplete
                                        value={this.state.fullName}
                                        id="studentName"
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, v) => this.onAutocompleteChange(v, "studentName", 'fullName')}
                                        options={this.state.studentsName}
                                        style={{width: 200}}
                                        renderInput={(params) => <TextField  {...params} label='ФИО студента'
                                                                             variant="outlined"/>}
                                    />

                                </div>
                                <div className='col-md-1'></div>

                                <div className='col-md-3'>
                                    <div className='b m1'>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="btn btn-primary btnFind"
                                            onClick={this.onSubmit} disabled={!this.state.discipline}>
                                            <span>Найти</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='row  nav topTable'>
                            <div className='col-md-12 pad padRig'>
                                <Table1_1
                                    disciplineName={this.state.disciplineName}
                                    courseworks={this.state.courseworks}
                                    onOpenModal={this.onOpenModal}
                                    currentGroup={this.state.currentGroup}
                                    verificationResult={this.state.verificationResult}
                                    close={this.onCloseModal}
                                    state={this.state.open}
                                    handleChange={this.handleChange}
                                    onSave={this.onSave}
                                    print={this.onPrint}
                                    printLoad={this.state.printLoad}/>
                            </div>
                            <div className='navs'>
                                <Link to={'/'}><img src={main} className='cursor' title="Вернуться к документам"
                                                    className='btnRight'/></Link>
                                <Link to={'/2'}>
                                    <div className='cursor btnRight1'><img src={top} title="Вернуться к документам"/>
                                    </div>
                                </Link>
                                {!this.state.printLoad ?
                                    <div className='cursor q' onClick={this.onPrint}><img src={printBig}/></div> :
                                    <img src={gif} className='wid'/>}
                            </div>
                        </div>
                    </div> : <img src={gif} className='gifCenter'/>
                }
            </div>


        )
    }
}




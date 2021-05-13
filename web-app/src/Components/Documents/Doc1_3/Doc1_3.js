import React from 'react';
import '../../App.css';
import axios from 'axios';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import ModalWin from "./ModalWin1_3";
import Table1_3 from "./Table1_3";
import {post} from "../axios";



export default class Doc1_2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationResults: ['к защите', 'к доработке'],
            students: [],
            groups: [],
            courses: ['1','2','3','4'],
            course: '',
            fullTimesGroups: [],
            discipline: '',
            group: '',
            disciplines: [],
            studentName: '',
            dateOfReceipt: '',
            verificationResult: 'к защите',
            fail: '',
            open: false,
            currentGroup: {},
            deleteObj: '',
            reports:[]
        };

        this.handleChange = this.handleChange.bind(this);
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

    onAutoGroup = (value, name) => {
        if (!value) {
            return this.setState({[name]: null});
        } else {
            if (value.id != '') {
                this.setState({
                    [name]: value.id,
                    fullDiscipline: null,
                    fullName: null,
                    discipline: null,
                    studentName: null
                });
                get(`search/disciplines/univGroup/${value.id}`).then(res => {  //Запрос на получение дисциплин определенной группы
                    const disciplines = res.data;
                    this.setState({disciplines});
                    console.log(disciplines)
                })
                get(`search/studnets/univGroup/${value.id}`).then(res => {  //Запрос на получение дисциплин определенной группы
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

    onClouseModal = () => {
        this.setState({
            open: false,
            currentGroup: {}
        });
    }

    onSave = event => {
        post('courseworks/add', {
            disciplines: this.state.discipline,
            univGroups: this.state.group,
            cours: this.state.course,
            student: this.state.studentName,
            incomingDate: this.state.incomingDate,
            checkingDate: this.state.checkingDate,
            professor: this.state.professor,
            courseworkresult: this.state.verificationResult,
            fileLink: this.state.fileLink
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onPrint = event => {

        get('search/courseworks/disciplines/univGroup/?print=1', {
            params: {
                byGroupID: this.state.group,
                byDescipline: this.state.discipline,
                byStudent: this.state.studentName
            }
        }).then(res => {
            console.log(res)
            window.open('http://localhost:3001/printdocs/' + res.data.filename, '_blank').focus();

        })
    }

    onSubmit = event => {
        event.preventDefault();

        const coursework = {
            disciplines: this.state.disciplines,
            studentName: this.state.studentName,
            group: this.state.group,
            dateOfReceipt: this.state.dateOfReceipt,
            verificationResult: this.state.verificationResult,
        };


        get('search/courseworks/disciplines/univGroup', {
            params: {
                byGroupID: this.state.group,
                byDescipline: this.state.discipline,
                byStudent: this.state.studentName
            }
        }).then(res => {  //получение дисциплин
            const courseworks = res.data;
            this.setState({courseworks});
            console.log(courseworks)
        })

        this.state.disciplineName = this.state.disciplines.find(disName => disName.id == this.state.discipline).disName;
        this.setState({})

    }


    componentDidMount() {



    }

    render() {

        return (
            <div>
                <div className='line row'>
                    <div className='nameDepartment col-md-6'>
                        <span>Кафедра информационных систем и технологий</span>
                    </div>
                    <div className='listDoc col-md-6'>
                        <span>Учет отчетов по практике</span>
                    </div>
                </div>
                <div className='lineBlack row'></div>
                <form className='nav container main'>
                    <div className='form-row row center-block form'>
                        <div className='col-md-3 pad'>
                            <Autocomplete
                                id="group"
                                getOptionLabel={(option) => option.GroupName}
                                options={this.state.groups}
                                onChange={(e, v) => this.onAutocompleteChange(v, "group")}
                                style={{width: 200}}
                                renderInput={(params) => <TextField  {...params} label='Группа'
                                                                     variant="outlined"/>}
                            />
                        </div>
                        <div className='col-md-3'>
                            <Autocomplete
                                id="course"
                                options={this.state.courses.map(course => course)}
                                onChange={(e, v) => this.onAutocompleteChange(v, "course")}
                                style={{width: 200}}
                                renderInput={(params) => <TextField {...params} label='Курс' variant="outlined"/>}
                            />
                        </div>
                        <div className='col-md-3'>
                            <Autocomplete
                                id="studentName"
                                onChange={(e, v) => this.onAutocompleteChange(v, "studentName")}
                                options={this.state.students.map(studentName => studentName.Name)}
                                style={{width: 200}}
                                renderInput={(params) => <TextField  {...params} label='ФИО студента'
                                                                     variant="outlined"/>}
                            />
                        </div>
                        <div className='col-md-3'>
                            <div className='b'>
                                <Button
                                    className='b'
                                    variant="contained"
                                    color="primary"
                                    className="btn btn-primary btnFind"
                                    onClick={this.onSubmit} disabled={!this.state.group || !this.state.discipline}>
                                    <span>Найти</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                </form>

                <div className='row topTable nav'>
                    <div className='col-md-12 pad padRig'>
                        <Table1_3
                            disciplineName={this.state.disciplineName}
                            reports={this.state.reports}
                            onOpenModal={this.onOpenModal}
                            clouse={this.onClouseModal}/>
                    </div>
                </div>
            </div>


        )
    }
}




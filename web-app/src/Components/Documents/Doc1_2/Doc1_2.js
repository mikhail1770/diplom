import React, {ReactHTML as todos} from 'react';
import '../../../App.css';
import axios from 'axios';
import {get, post} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";

import DeleteIcon from '@material-ui/icons/Delete';
import {Edit} from "@material-ui/icons";
import Table1_2 from "./Table1_2";



export default class Doc1_2 extends React.Component {
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
            open: false,
            courseworks: [],
            coursework: [],
            studentsName: [],
            disciplineName: '',
            fullDiscipline: null,
            fullName:null,
            course:'',
            incomingDate:'',
            checkingDate:'',
            professor:'',
            fileLink:'',
            currentGroup: []

        };

        this.handleChange = this.handleChange.bind(this);
        this.onAutoGroup = this.onAutoGroup.bind(this);
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

    onAutoGroup = (value, name) => {
        if (!value) {
            return this.setState({[name]: null});
        } else {
            if (value.id != '') {
                this.setState({[name]: value.id, fullDiscipline: null, fullName: null, discipline:null, studentName:null});
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
            disciplines:this.state.discipline,
            univGroups:this.state.group,
            cours:this.state.course,
            student:this.state.studentName,
            incomingDate:this.state.incomingDate,
            checkingDate:this.state.checkingDate,
            professor:this.state.professor,
            courseworkresult:this.state.verificationResult,
            fileLink:this.state.fileLink
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onPrint = event => {

        get('search/courseworks/disciplines/univGroup/?print=1',  {
            params: {
                byGroupID: this.state.group,
                byDescipline: this.state.discipline,
                byStudent: this.state.studentName
            }
        }).then(res => {
            console.log(res)
            window.open('http://localhost:3001/printdocs/'+res.data.filename, '_blank').focus();

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

        get('search/univGroups/formOfStudy/1').then(res => { //получение заочных групп
            const groups = res.data;
            this.setState({groups});
            console.log(groups)
        })


    }

    render() {

        return (
            <div>
                <form className=" container main">
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className='titleTab lead'>Очная форма обучения </h3>
                        </div>
                    </div>
                    <div className="form-row row center-block form">


                        <div className='col-md-3 pad'>

                            <Autocomplete

                                id="group"
                                getOptionLabel={(option) => option.groupName}
                                options={this.state.groups}
                                onChange={(e, v) => this.onAutoGroup(v, "group")}
                                style={{width: 200}}
                                renderInput={(params) => <TextField  {...params} label='Группа'
                                                                     variant="outlined"/>}
                            />

                        </div>
                        <div className='col-md-3'>
                            <Autocomplete
                                value={this.state.fullDiscipline}
                                id="discipline"
                                getOptionLabel={(option) =>  option.disName }
                                options={this.state.disciplines}
                                onChange={(e, v) => this.onAutocompleteChange(v, "discipline", 'fullDiscipline')}
                                style={{width: 200}}
                                renderInput={(params) => <TextField {...params} label='Дисциплина'
                                                                    variant="outlined"/>}
                            />
                        </div>
                        <div className='col-md-3'>
                            <Autocomplete
                                value={this.state.fullName}
                                id="studentName"
                                getOptionLabel={(option) => option.name}
                                onChange={(e, v) => this.onAutocompleteChange(v, "studentName",'fullName')}
                                options={this.state.studentsName}
                                style={{width: 200}}
                                renderInput={(params) => <TextField  {...params} label='ФИО студента'
                                                                     variant="outlined"/>}
                            />
                        </div>
                        <div className='col-md-3'>
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn btn-primary btnFind"
                                onClick={this.onSubmit} disabled={!this.state.group || !this.state.discipline}>
                                <span>Найти</span>
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                className="btn btn-primary btnFind"
                                onClick={this.onPrint} disabled={!this.state.group || !this.state.discipline}>
                                <span>Печать</span>
                            </Button>
                        </div>
                    </div>
                    {this.state.verificationResult}
                    <Table1_2
                        disciplineName = {this.state.disciplineName}
                        courseworks = {this.state.courseworks}
                        onOpenModal={this.onOpenModal}
                        currentGroup={this.state.currentGroup}
                        verificationResult={this.state.verificationResult}
                        clouse={this.onClouseModal}
                        state={this.state.open}
                        handleChange={this.handleChange}
                        onSave={this.onSave}/>
                </form>


            </div>


        )
    }
}




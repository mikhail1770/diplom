import React from 'react';
import '../../App.css';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Table1_1 from "./Table1_1";
import {post} from "../axios";


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
            coursework: '',
            studentsName: [],
            disciplineName: '',
            fullDiscipline: null,
            fullName: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.onAutoGroup = this.onAutoGroup.bind(this);
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
    onPrint = event => {

        get('search/courseworkszaoch/disciplines/univGroup/?print=1', {
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


        get('search/courseworkszaoch/disciplines/univGroup', {
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

        get('search/univGroups/formOfStudy/2').then(res => { //получение заочных групп
            const groups = res.data;
            this.setState({groups});
            console.log(groups)
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
                <form className='nav container main'>
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
                                getOptionLabel={(option) => option.disName}
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
                                onChange={(e, v) => this.onAutocompleteChange(v, "studentName", 'fullName')}
                                options={this.state.studentsName}
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
                <div className='row  nav topTable'>
                    <div className='col-md-12 pad padRig'>

                        <Table1_1
                            disciplineName={this.state.disciplineName}
                            courseworks={this.state.courseworks}
                            onOpenModal={this.onOpenModal}
                            currentGroup={this.state.currentGroup}
                            verificationResult={this.state.verificationResult}
                            clouse={this.onClouseModal}
                            state={this.state.open}
                            handleChange={this.handleChange}
                            onSave={this.onSave}
                            print={this.onPrint}/>
                    </div>
                </div>
            </div>


        )
    }
}




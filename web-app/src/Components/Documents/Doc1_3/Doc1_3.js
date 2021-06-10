import React from 'react';
import '../../App.css';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import Table1_3 from "../Doc1_3/Table1_3";
import {Link} from "react-router-dom";
import main from "../main.svg";
import top from "../top.svg";
import printBig from "../printBig.svg";
import gif from "../1.gif";



export default class Doc1_3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: ['1', '2', '3', '4'],
            course: '',
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
            reports: [],
            report: [],
            studentsName: [],
            disciplineName: '',
            fullDiscipline: null,
            fullName: null,
            incomingDate: '',
            checkingDate: '',
            professor: '',
            fileLink: '',
            currentGroup: [],
            name: 'rere[f',
            professors: [],
            printLoad: false,
            pageLoaded: '',
            test: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.onAutocompleteChange = this.onAutocompleteChange.bind(this);


    }

    handleChange = (event, name) => { //для того, чтобы использовать несколько input
        console.log(event)
        this.setState({
            [name]: event,
        });
        console.log(event)
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
                    studentName: null,
                    test: false
                });

                get(`search/studnets/univGroup/${value.id}`).then(res => {  //Запрос на получение дисциплин определенной группы
                    const studentsName = res.data;
                    this.setState({studentsName});
                    console.log(studentsName)
                })
            }
        }
    }

    onAutocompleteChange = (value, name, fullName) => {
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

        get('search/practiceReport/course/formOfStudy', {
            params: {
                byGroupID: this.state.group,
                byCourse: this.state.course,
                byStudent: this.state.studentName,
                sortIncomingDate: 'ASC'
            }
        }).then(res => {  //получение дисциплин
            const reports = res.data;
            this.setState({reports, test: true});
            console.log(reports)
        })
        console.log(this.state.reports)
    }

    componentDidMount() {
        get('search/univGroups/formOfStudy').then(res => { //получение заочных и очных групп
            const groups = res.data;
            this.setState({groups});
            this.setState({pageLoaded: true})
        })
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
                        <span>Учет отчетов по практике</span>
                    </div>
                </div>
                <div className='lineBlack row'></div>
                {this.state.pageLoaded ?
                    <div>
                        <form className='nav container main'>
                            <div className='form-row row center-block form'>
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
                                        id="course"
                                        options={this.state.courses.map(course => course)}
                                        onChange={(e, v) => this.handleChange(v, "course")}
                                        style={{width: 200}}
                                        renderInput={(params) => <TextField {...params} label='Курс'
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
                                            onClick={this.onSubmit} disabled={!this.state.group || !this.state.course}>
                                            <span>Найти</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='row topTable nav'>
                            <div className='col-md-12 pad padRig'>
                                <Table1_3
                                    reports={this.state.reports}
                                    currentGroup={this.state.currentGroup}
                                    verificationResult={this.state.verificationResult}
                                    state={this.state.open}
                                    handleChange={this.handleChange}
                                    onSave={this.onSave}
                                    print={this.onPrint}
                                    printLoad={this.state.printLoad}
                                    professors={this.state.professors}
                                    students={this.state.studentsName}
                                    onSubmit={this.onSubmit}
                                    onOpenModal={this.onOpenModal}
                                    close={this.onClouseModal}
                                    univGroups={this.state.group}
                                    disciplines={this.state.discipline}
                                    groups={this.state.groups}
                                    test={this.state.test}
                                    course={this.state.course}/>
                            </div>
                            <div className='navs'>
                                <Link to={'/'}><img src={main} className='cursor' title="Вернуться к документам"
                                                    className='btnRight'/></Link>
                                <Link to={'/2'}>
                                    <div className='cursor btnRight1'><img src={top} title="Вернуться к документам"/>
                                    </div>
                                </Link>
                                {!this.state.printLoad && this.state.group && this.state.course ?
                                    <div className='cursor q' onClick={this.onPrint}><img src={printBig}/>
                                    </div> : (this.state.printLoad) ?
                                        <img src={gif} className='wid'/> :
                                        <div className='q opac'><img src={printBig}/></div>}
                            </div>
                        </div>
                    </div> : <img src={gif} className='gifCenter'/>}
            </div>
        )
    }
}




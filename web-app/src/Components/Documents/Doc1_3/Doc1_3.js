import React from 'react';
import '../../../App.css';
import axios from 'axios';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import ModalWin from "./ModalWin1_3";
import DeleteIcon from '@material-ui/icons/Delete';
import {Edit} from "@material-ui/icons";



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
            deleteObj: ''
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

    onAutocompleteChange = (value, name) => {
        console.log('sdf');
        if (!value) {
            return this.setState({[name]: null});
        } else {
            return this.setState({[name]: value.id});
        }

    }

    onOpenModal = (obj) => {
        this.setState({
            open: true,
            currentGroup: obj
        });
    }

    deleteStr = (obj) => {
        this.setState({
            deleteObj: obj.id
        });
    }

    onClouseModal = () => {
        this.setState({
            open: false,
            currentGroup: {}
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const coursework = {
            course: this.state.course,
            disciplines: this.state.disciplines,
            studentName: this.state.studentName,
            group: this.state.group,
            dateOfReceipt: this.state.dateOfReceipt,
            verificationResult: this.state.verificationResult,
        };

        axios.post('http://localhost:3001/', {coursework})
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
            console.log(coursework)
        });
        this.setState({
            group: '',
            disciplines: '',
            studentName: '',
            dateOfReceipt: '',
            verificationResult: '',
            fail: '',
            students: []

        })

    }

    componentDidMount() {

        get('univGroups').then(res => {
            const groups = res.data;
            this.setState({groups});
        })

        get('students/').then(res => { //получение очных групп и их дисциплин
            const fullTimesGroups = res.data;
            this.setState({fullTimesGroups});
            console.log(fullTimesGroups)
        })

        get('students', {group: {}}).then(res => {  //получение групп, дисциплин и студентов
            const fullTimesGroups = res.data;
            this.setState({fullTimesGroups});
            console.log(fullTimesGroups)
        })
    }

    render() {

        return (
            <div>
                <form className=" container">
                    <div className="form-row row center-block form">
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
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn btn-primary btnFind"
                                onClick={this.onSubmit} disabled={!this.state.group || !this.state.course}>
                                {this.state.course}
                                <span>Найти</span>
                            </Button>
                        </div>
                    </div>

                    <div className='row'>
                        {this.state.deleteObj}
                        <div className='col-md-12'>
                                    <h3 className='titleTab lead text-right'>Отчеты по практике </h3>
                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>ФИО студента</th>
                                    <th>Группа</th>
                                    <th>Курс</th>
                                    <th>База практики</th>
                                    <th>Дата поступления</th>
                                    <th>Преподаватель</th>
                                    <th>Дата проверки</th>
                                    <th>Результаты проверки</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.fullTimesGroups.map(fullTimesGroup => (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className='text-center'></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td width='150px'>
                                            <Button
                                                onClick={() => this.onOpenModal(fullTimesGroup)}
                                                variant="contained"
                                                color="secondary"
                                                className='button colorButTab'
                                                startIcon={<Edit/>}
                                            >
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className='button '
                                                startIcon={<DeleteIcon/>}
                                                onClick={() => this.deleteStr(fullTimesGroup)}
                                            >
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
                <div>
                    <ModalWin
                        clouse={this.onClouseModal}
                        state={this.state.open}
                        handleChange={this.handleChange}
                        currentGroup={this.state.currentGroup}/>
                </div>
            </div>


        )
    }
}




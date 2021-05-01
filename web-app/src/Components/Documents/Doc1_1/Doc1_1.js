import React from 'react';
import '../../../App.css';
import axios from 'axios';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ModalWin from "./ModalWin";


export default class Doc1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationResults: ['к защите', 'к доработке'],
            students: [],
            groups: [],
            fullTimesGroups: [],
            discipline: '',
            group: '',
            disciplines: [],
            studentName: '',
            dateOfReceipt: '',
            verificationResult: 'к защите',
            fail: '',
            open: false,
            fullTimesGroup: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.onAutocompleteChange = this.onAutocompleteChange.bind(this);
        this.OnOpenModal = this.onOpenModal.bind(this);

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
        if (!value) return;
        console.log(value);
        return this.setState({[name]: value.id});
    }

    onOpenModal = event => {
        this.setState({
            open: true,
            fullTimesGroup: event.target.value
        });
    }

    onClouseModal = event => {
        console.log('уаыу')
        this.setState({
            open: false,

        });
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

        get('students').then(res => { //получение очных групп и их дисциплин
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
                <form className="form container">

                    <div className="form-row row">

                        <div className='col-md-3'>
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
                                id="discipline"
                                getOptionLabel={(option) => option.GroupName}
                                options={this.state.groups}
                                onChange={(e, v) => this.onAutocompleteChange(v, "discipline")}
                                style={{width: 200}}
                                renderInput={(params) => <TextField {...params} label='Дисциплина' variant="outlined"/>}
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
                            <Button variant="contained" color="primary" className="btn btn-primary"
                                    onClick={this.onSubmit} disabled={!this.state.group || !this.state.discipline}>
                                Найти
                            </Button>
                            {this.state.group}
                            {this.state.discipline}
                        </div>
                    </div>


                </form>
                <table class="table">
                    <thead class="thead-inverse">
                    <tr>
                        <th>ФИО</th>
                        <th>Группа</th>
                        <th>Дата поступления</th>
                        <th>Результат проверки</th>
                        <th>Срок возврата</th>
                        <th>Курсовая работа</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.fullTimesGroups.map(fullTimesGroup => (
                        <tr onClick={this.OnOpenModal}>
                            <td>{fullTimesGroup.Name}</td>
                            <td>{fullTimesGroup.UnivGroup}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Button variant="contained" color="primary" className="btn btn-primary center-block"
                        onClick={this.onSubmit}>
                    Отправить
                </Button>

                <div>
                    <ModalWin clouse={this.onClouseModal} state={this.state.open} handleChange={this.handleChange}/>
                </div>
            </div>


        )
    }
}




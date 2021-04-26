import React from 'react';
import '../../../App.css';
import axios from 'axios';
import SelectForm from "../SelectForm";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


export default class Doc1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationResults: ['к защите', 'к доработке'],
            students: [],
            groups: [],
            discipline: [],
            group: '',
            disciplines: '',
            studentName: '',
            dateOfReceipt: '',
            verificationResult: 'к защите',
            fail: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onStudentNameChange = this.onGroupChange.bind(this);
        this.onDisciplinesChange = this.onGroupChange.bind(this);
    }


    handleChange = event => { //для того, чтобы использовать несколько input
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    onGroupChange = (e, values) => {
        this.setState({group: values});
    }

    onStudentNameChange = (e, values) => {
        this.setState({studentName: values});
    }

    onDisciplinesChange = (e, values) => {
        this.setState({discipline: values});
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

    componentDidMount() {           //запрос к серверу
        axios.get(`http://localhost:3001/univGroups`)
            .then(res => {
                const groups = res.data;
                this.setState({groups});
                console.log(groups)
            })

        axios.get(`http://localhost:3001/students/1`)
            .then(res => {
                const students = res.data;
                this.setState({students});
                console.log(students)
            })


    }

    render() {
        return (

            <form className="form container">

                <div className="form-row row">

                    <div className='col-md-3'>
                        <Autocomplete
                            options={this.state.disciplines}
                            onChange={this.onDisciplinesChange}
                            style={{width: 200}}
                            renderInput={(params) => <TextField {...params} label='Дисциплина' variant="outlined"/>}
                        />
                    </div>

                    <div className='col-md-3'>
                        <Autocomplete
                            options={this.state.groups.map(group => group.GroupName)}
                            onChange={this.onGroupChange}
                            style={{width: 200}}
                            renderInput={(params) => <TextField name={'group'} {...params} label='Группа'
                                                                variant="outlined"/>}
                        />
                    </div>

                    <div className='col-md-3'>
                        <Autocomplete
                            onChange={this.onStudentNameChange}
                            options={this.state.students.map(studentName => studentName.Name)}
                            style={{width: 200}}
                            renderInput={(params) => <TextField  {...params} label='ФИО студента' variant="outlined"/>}
                        />
                    </div>

                    <div className='col-md-3 '>
                        <TextField
                            id="date"
                            label="Дата поступления"
                            onChange={this.handleChange}
                            name='dateOfReceipt'
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className='col-md-6'>
                        <FormControl variant="outlined" className='formControl'>
                            <InputLabel id="demo-simple-select-outlined-label">Результат проверки</InputLabel>
                            <Select
                                onChange={this.handleChange}

                                style={{width: 200}}
                                name="verificationResult"
                                label="Результат проверки"
                            >
                                {this.state.verificationResults.map(verificationResult =>
                                    <MenuItem value={verificationResult}>{verificationResult}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>

                    <div className='col-md-6'>
                        <p>Загрузить файл:</p>
                        <input type="file"/>
                    </div>
                    {this.state.verificationResult}
                    {this.state.group}
                    {this.state.studentName}
                </div>
                <input type="submit" value="Добавить" className="btn btn-primary" onClick={this.onSubmit}/>

            </form>


        )
    }
}




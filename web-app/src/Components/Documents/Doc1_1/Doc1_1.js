import React from 'react';
import '../../../App.css';
import axios from 'axios';
import {get} from '../axios.js'
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
            discipline: '',
            group: '',
            disciplines: ['История', 'Математика'],
            studentName: '',
            dateOfReceipt: '',
            verificationResult: 'к защите',
            fail: '',
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
        return this.setState({[name]: value});
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
    }

    render() {
        return (
            <div>
                <form className="form container">

                    <div className="form-row row">

                        <div className='col-md-3'>
                            <Autocomplete
                                options={this.state.disciplines}
                                onChange={this.state.groups.map(disciplines => disciplines.onAutocompleteChange)}
                                style={{width: 200}}
                                renderInput={(params) => <TextField {...params} label='Дисциплина' variant="outlined"/>}
                            />
                        </div>

                        <div className='col-md-3'>
                            <Autocomplete
                                id="group"
                                options={this.state.groups.map(group => group.GroupName)}
                                onChange={(e, v) => this.onAutocompleteChange(v, "group")}
                                style={{width: 200}}
                                renderInput={(params) => <TextField    {...params} label='Группа'
                                                                       variant="outlined"/>}
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

                        <div className='col-md-3 '>
                            <TextField
                                id="date"

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
                <table>
                    <caption>Курсовые работы заочной формы обучения</caption>
                    <thead>
                    <tr>
                        <th>№ п/п</th>
                        <th>Ф.И.О. студента</th>
                        <th>Группа</th>
                        <th>Дата поступления</th>
                        <th>Результат проверки</th>
                        <th>Срок возврата</th>
                        <th>Курсовая работа</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.groups.map(cours => (
                        <tr key={cours.id}>
                            <td>1</td>
                            <td>dfg</td>
                            <td>{cours.GroupName}</td>
                            <td><TextField
                                id="date"

                                onChange={this.handleChange}
                                name='dateOfReceipt'
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /></td>
                            <td>
                                <Select
                                    onChange={this.handleChange}

                                    style={{width: 200}}
                                    name="verificationResult"
                                    label="Результат проверки"
                                >
                                    {this.state.verificationResults.map(verificationResult =>
                                        <MenuItem value={verificationResult}>{verificationResult}</MenuItem>)}
                                </Select>
                           </td>
                            <td><TextField
                                id="date"

                                onChange={this.handleChange}
                                name='dateOfReceipt'
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /></td>
                            <td> <input type="file"/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        )
    }
}




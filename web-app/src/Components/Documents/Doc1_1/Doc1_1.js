import React from 'react';
import '../../../App.css';
import axios from 'axios';
import {get} from '../axios.js'
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import ModalWin from "./ModalWin1_1";
import DeleteIcon from '@material-ui/icons/Delete';
import {Edit} from "@material-ui/icons";


export default class Doc1_1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationResults: ['к защите', 'к доработке'],
            students: [],
            groups: {},
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
            num: 1,
            courseworks: [],
            coursework: '',
            studentsName:[]

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

    onAutoGroup = (value, name) => {                                //При выборе группы выводятся дисциплины
        if (!value) {
            return this.setState({[name]: null});
        } else {
            if (value.id != '') {
                this.setState({[name]: value.id});
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
            disciplines: this.state.disciplines,
            studentName: this.state.studentName,
            group: this.state.group,
            dateOfReceipt: this.state.dateOfReceipt,
            verificationResult: this.state.verificationResult,
        };

        get('search/courseworks/disciplines/univGroup', {
            params: {
                byGroupID: '1'
            }
        })
            .then(res => {  //получение дисциплин
                const courseworks = res.data;
                this.setState({courseworks});
                console.log(courseworks)
            })


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

        get('search/univGroups/formOfStudy/1').then(res => { //получение заочных групп
            const groups = res.data;
            this.setState({groups});
            console.log(groups)
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
                                id="discipline"
                                getOptionLabel={(option) => option.disName}
                                options={this.state.disciplines}
                                onChange={(e, v) => this.onAutocompleteChange(v, "discipline")}
                                style={{width: 200}}
                                renderInput={(params) => <TextField {...params} label='Дисциплина'
                                                                    variant="outlined"/>}
                            />
                        </div>
                        <div className='col-md-3'>
                            <Autocomplete
                                id="studentName"
                                getOptionLabel={(option) => option.name}
                                onChange={(e, v) => this.onAutocompleteChange(v, "studentName")}
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
                        </div>
                    </div>

                    <div className='row'>
                        {this.state.deleteObj}
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className='col-md-6 pad'>
                                    <h3 className='titleTab lead'>{this.state.discipline}</h3>
                                </div>
                                <div className='col-md-6'>
                                    <h3 className='titleTab lead text-right'>Заочная форма обучения </h3>
                                </div>
                            </div>
                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>ФИО</th>
                                    <th>Группа</th>
                                    <th>Дата поступления</th>
                                    <th>Результат проверки</th>
                                    <th>Срок возврата</th>
                                    <th>Курсовая работа</th>
                                    <th>#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.courseworks.map(coursework => (
                                    <tr>
                                        <td>{}</td>
                                        <td>{coursework.Name}</td>
                                        <td className='text-center'>{coursework.groupName}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td width='150px'>
                                            <Button
                                                onClick={() => this.onOpenModal(coursework)}
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
                                                onClick={() => this.deleteStr(coursework)}
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




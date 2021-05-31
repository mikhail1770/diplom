import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import cross from "../cross.svg"
import s from "../Doc1_2/Doc1_2.module.css";
import axios from "axios";
import moment from "moment";


class ModalWinNew1_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentName: 'sdds',
            studentId: '',
            checkingDate: moment(moment(new Date().toLocaleDateString(), 'DD.MM.YYYY')).format('YYYY-MM-DD'),
            incomingDate: moment(moment(new Date().toLocaleDateString(), 'DD.MM.YYYY')).format('YYYY-MM-DD'),
            result: 'к защите',
            resultID: '1',
            nameFile: '',
            professorId: '',
            professorName: '',
            test: this.props.test


        }


    }

    ChangeSelectedProfessor(e) {

        this.setState({professorName: e.target.value.name, professorId: e.target.value.id})
        console.log(e.target)
    }

    ChangeSelectedIncomingDate(e) {
        this.setState({incomingDate: e.target.value})
        console.log(e.target.value)

    }

    ChangeSelectedCheckingDate(e) {

        this.setState({checkingDate: e.target.value})
        console.log(e.target.value)

    }


    ChangeSelectedStudent(e) {
        this.setState({studentName: e.target.value.name, studentId: e.target.value.id})
        console.log(e.target)

    }

    ChangeSelectedResult(e) {
        if (e.target.value == 'к защите') {
            this.setState({resultID: 1})
        } else if (e.target.value == 'к доработке') {
            this.setState({resultID: 2})
        } else return 3
        console.log(this.props.onSubmit)
    }


    onSave = () => {


        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3002/upload", data, {})
            .then(res => {
                this.setState({nameFile: res.data.filename}, () => {
                    if (this.state.studentId !== '' && this.state.professorId !== '') {
                        axios.post(`http://localhost:3001/courseworks/add`, {
                            incomingDate: this.state.incomingDate,
                            disciplines: this.props.disciplines,
                            univGroups: this.props.univGroups,
                            cours: this.props.course,
                            student: this.state.studentId,
                            checkingDate: this.state.checkingDate,
                            professor: this.state.professorId,
                            courseworkresult: this.state.resultID,
                            filelink: this.state.nameFile
                        }).then(res => {
                            this.props.onSubmit();
                        })
                    } else {
                        alert("Заполните все поля")


                    }

                })
            })
    }

    onChangeHandler = event => {  // загрузка файла
        this.setState({selectedFile: event.target.files[0]}, () => {
            console.log(this.state.selectedFile)
        })
    }


    componentDidMount() {
        console.log(this.props.students)
    }


    render() {
        return (
            <Modal
                open={this.props.state}
                onClose={this.props.close}

            >
                <div className='paper modalForm modal-content'>
                    <div className="modal-header">
                        <span className="modal-title">Новая запись</span>
                        <img onClick={this.props.close} className='cursor' src={cross}/>
                    </div>
                    <div className='modal-body'>
                        <div className='row modalRow'>
                            <div className='col-6 titleModal v'>
                                <span>ФИО студента:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <FormControl className='formControl'>
                                    <Select
                                        onChange={(e) => this.ChangeSelectedStudent(e)}

                                    >

                                        {this.props.students.map(student => <MenuItem
                                            value={student}> {student.name ? student.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ') : ''} </MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>ФИО преподавателя:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <Select
                                    onChange={(e) => this.ChangeSelectedProfessor(e)}
                                >
                                    {this.props.professors.map(professor => <MenuItem
                                        value={professor}> {professor.profName.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')} </MenuItem>)}

                                </Select>

                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Дата поступления:</span>
                            </div>
                            <div className='col-6 v propsModal date'>
                                <TextField
                                    name="checkingDate"
                                    type='date'
                                    defaultValue={this.state.incomingDate}
                                    onChange={(e) => this.ChangeSelectedIncomingDate(e)}
                                />
                            </div>
                        </div>
                        <div className='row modalRow date'>
                            <div className='col-6 titleModal v'>
                                <span className='v'>Дата проверки:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <TextField
                                    name="checkingDate"
                                    type='date'
                                    defaultValue={this.state.checkingDate}
                                    onChange={(e) => this.ChangeSelectedCheckingDate(e)}
                                />
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Результат проверки:</span>
                            </div>
                            <div className='col-6  v propsModal'>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={this.state.result}
                                    onChange={(e) => this.ChangeSelectedResult(e)}
                                >
                                    <MenuItem value={'к защите'}>к защите</MenuItem>
                                    <MenuItem value={'к доработке'}>к доработке</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className='row modalRow v'>
                            <div className='col-6 titleModal'>
                                <span>Курсовая работа:</span>
                            </div>
                            <div className='col-6 v  propsModal'>
                                <input type='file' onChange={this.onChangeHandler}/>
                            </div>
                        </div>
                        <div className={`${s.positionSave} f`}>
                            <button type="button" className="btn btn-primary save block-center"
                                    onClick={this.onSave}>Сохранить
                            </button>
                        </div>
                    </div>

                </div>
            </Modal>
        );
    }

}

export default ModalWinNew1_2;

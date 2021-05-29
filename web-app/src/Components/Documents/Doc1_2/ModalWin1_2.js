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
import _ from "lodash"

class ModalWin1_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: props.currentGroup,
            courseWorkResID: '',
            selectedFile: '',
            number: '',
            nameFile:this.props ? this.props.filelink: '',
            fileSelected: 0,
            profName: '',
            idProf:'',
            studentName:''

        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.ChangeSelectedResult = this.ChangeSelectedResult.bind(this);
    }


    ChangeSelectedProfessor(e) {
        if (this.props && this.props.student) {
            let current = this.state.currentGroup;
            current.professor.name = e.target.value.profName;
            current.professor.id = e.target.value.id;
            console.log(this.props)
        }
        else{
            this.setState({profName:e.target.value.profName,idprof: e.target.value.id })
        }
        console.log(this.props)
    }

    ChangeSelectedStudent(e) {
        let current = this.state.currentGroup;
        current.student.name = e.target.value.name;
        current.student.id = e.target.value.id;
        this.setState({current})

    }

    ChangeSelectedIncomingDate(e) {
        this.state.currentGroup.incomingDate = e.target.value;
        console.log(this.state.currentGroup)

    }

    ChangeSelectedcheckingDate(e) {
        this.state.currentGroup.checkingDate = e.target.value;

    }

    ChangeSelectedResult(e) {
        if (e.target.value == 'к защите') {
            this.setState({courseWorkResID: 1})
        } else if (e.target.value == 'к доработке') {
            this.setState({courseWorkResID: 2})
        } else return 3
        console.log(this.props.onSubmit)
    }


    onSave = () => {
        if (this.state.courseWorkResID == '') {

            this.state.courseWorkResID = this.state.currentGroup.courseWorkResID;
        } else {
            console.log(1)
        }


        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3002/upload", data, {})
            .then(res => {
                this.setState({nameFile: res.data.filename}, () => {
                    axios.put(`http://localhost:3001/edit/courseworks/${this.state.currentGroup.id}`, {
                        checkingDate: this.state.currentGroup.checkingDate,
                        incomingDate: this.state.currentGroup.incomingDate,
                        courseworkresult: this.state.courseWorkResID,
                        filelink: this.state.nameFile,
                        student: this.state.currentGroup.student.id,
                        professor: this.state.currentGroup.professor.id
                    }, () => {
                        console.log(this.state.nameFile)
                    })
                        .then(res => {
                            this.props.onSubmit();
                        })
                })
            })
        console.log(this.state.currentGroup)
    }

    onChangeHandler = event => {  // загрузка файла
        this.setState({selectedFile: event.target.files[0]}, () => {
            console.log(this.state.selectedFile)
        })
    }


    componentDidMount() {

    }


    render() {
        return (
            <Modal
                open={this.props.state}
                onClose={this.props.close}

            >
                <div className='paper modalForm modal-content'>
                    <div className="modal-header">
                        <span className="modal-title">Окно редактирования</span>
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
                                        value={this.state.currentGroup.student}
                                        renderValue={(student) => student.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}
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
                                <FormControl className='formControl'>
                                    <Select
                                        value={this.state.currentGroup.professor}
                                        renderValue={(professor) => professor.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}
                                        onChange={(e) => this.ChangeSelectedProfessor(e)}
                                    >
                                        {this.props.professors.map(professor => <MenuItem
                                            value={professor}> {professor.profName.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')} </MenuItem>)}

                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Дата поступления:</span>
                            </div>
                            <div className='col-6 v propsModal date'>
                                <TextField
                                    name="incomingDate"
                                    type='date'
                                    defaultValue={this.state.currentGroup.incomingDate}
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
                                    defaultValue={this.state.currentGroup.checkingDate}
                                    onChange={(e) => this.ChangeSelectedcheckingDate(e)}
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
                                    defaultValue={this.state.currentGroup.result}
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

export default ModalWin1_2;

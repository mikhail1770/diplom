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
            currentGroup: {
                checkingDate: this.props.currentGroup.checkingDate,
                incomingDate: this.props.currentGroup.incomingDate,
                basePractice:this.props.currentGroup.basePractic,
                student: {
                    name: this.props.currentGroup.student.name,
                    id: this.props.currentGroup.student.id
                },
                professor: {
                    id: this.props.currentGroup.professor.id,
                    name: this.props.currentGroup.professor.name
                },
                result: this.props.currentGroup.result,
                id: this.props.currentGroup.id
            },
            courseWorkResID: '',
            selectedFile: '',
            number: '',
            nameFile: this.props ? this.props.filelink : '',
            fileSelected: 0,
            profName: '',
            idProf: '',
            studentName: ''
        }

        this.ChangeSelectedResult = this.ChangeSelectedResult.bind(this);
    }


    ChangeSelectedProfessor(e) {
        let current = this.state.currentGroup;
        current.professor.name = e.target.value.profName;
        current.professor.id = e.target.value.id;
        console.log(this.state.currentGroup.basePractice)
    }

    ChangeSelectedStudent(e) {
        let current = this.state.currentGroup;
        current.student.name = e.target.value.name;
        current.student.id = e.target.value.id;
        this.setState({current})
    }

    ChangeSelectedIncomingDate(e) {
        this.state.currentGroup.incomingDate = e.target.value;
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
    }

    ChangeSelectedBasePractic(e) {
        this.state.currentGroup.basePractic = e.target.value;
        console.log(this.state.currentGroup.basePractic)
    }

    onSave = () => {
        if (this.state.courseWorkResID == '') {
            this.state.courseWorkResID = this.state.currentGroup.courseWorkResID;
        } else {
            console.log(1)
        }
        axios.put(`http://localhost:3001/edit/practiceReport/${this.state.currentGroup.id}`, {
            checkingDate: this.state.currentGroup.checkingDate,
            incomingDate: this.state.currentGroup.incomingDate,
            practiceRes: this.state.courseWorkResID,
            student: this.state.currentGroup.student.id,
            professor: this.state.currentGroup.professor.id,
            basePractic:  this.state.currentGroup.basePractic
        }).then(res => {
            this.props.onSubmit();
            this.props.close();
        })
    }


    render() {
        return (
            <Modal open={this.props.state} onClose={this.props.close}>
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
                                <span>База практики:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <input className="form-control form-control-sm" type="text"
                                       defaultValue={this.state.currentGroup.basePractice}  onChange={(e) => this.ChangeSelectedBasePractic(e)}/>
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

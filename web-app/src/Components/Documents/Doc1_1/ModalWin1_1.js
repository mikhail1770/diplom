import React from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import cross from "../cross.svg";
import MenuItem from "@material-ui/core/MenuItem";
import s from './Doc1_1.module.css';
import {post} from "../axios";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";

class ModalWin1_1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: props.currentGroup,
            courseWorkResID: '',
            selectedFile: '',
            number: '',
            nameFile:this.props ? this.props.filelink: '',
            fileSelected: 0,
            studentName:''

        }
        this.setStateGroupInfo = this.setStateGroupInfo.bind(this);

    }

    ChangeSelectedStudent(e) {
        let current = this.state.currentGroup;
        current.student.name = e.target.value.name;
        current.student.id = e.target.value.id;
        this.setState({current})
        console.log(this.state.currentGroup)

    }

    ChangeSelectedIncomingDate(e) {
        this.state.currentGroup.incomingDate = e.target.value;

    }

    ChangeSelectedcheckingDate(e) {
        this.state.currentGroup.chekingDate = e.target.value;

    }

    ChangeSelectedResult(e) {
        this.state.currentGroup.result = e.target.value;

    }

    setStateGroupInfo(props) {

        if (Object.keys(props.currentGroup).length && props.currentGroup) {
            console.log(Object.keys(props.currentGroup).length)
            this.setState({currentGroup: props.currentGroup}, () => {
                console.log(this.state)
            })
        }
    }

    onSave = () => {
        post(`edit/courseworks/${this.state.currentGroup.id}`, {params: this.state.currentGroup})
            .then(res => {

            })

        if (this.state.selectedFile) {this.setState({nameFail: this.state.selectedFile.name})}
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3002/upload", data, {})
            .then(res => {
                console.log(res.statusText)
            })
        console.log(this.state.currentGroup)
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
                        <div className='row modalRow date'>
                            <div className='col-6 titleModal v'>
                                <span>Дата поступления:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <TextField
                                    name="incomingDate"
                                    type='date'
                                    defaultValue={this.state.currentGroup.incomingDate}
                                    onChange={(e) => this.ChangeSelectedIncomingDate(e)}
                                />
                            </div>
                        </div>
                        <div className='row modalRow'>
                            <div className='col-6 titleModal v'>
                                <span>Результат проверки:</span>
                            </div>
                            <div className='col-6 v propsModal'>
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
                        <div className='row modalRow date'>
                            <div className='col-6 titleModal v'>
                                <span>Срок возврата:</span>
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
                        <div className='row modalRow v'>
                            <div className='col-6 titleModal'>
                                <span>Курсовая работа:</span>
                            </div>
                            <div className='col-6 v  propsModal'>
                                <input type='file' onChange={this.onChangeHandler}/>
                            </div>
                        </div>
                        <div className={`${s.positionSave} f`}>
                            <button type="button" className="btn btn-primary save block-center"  onClick={this.onSave}>Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
    export default ModalWin1_1;

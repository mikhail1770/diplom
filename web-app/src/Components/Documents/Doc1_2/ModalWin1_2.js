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
import {KeyboardDatePicker} from "@material-ui/pickers";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";


class ModalWin1_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: {
                Name: '',
                profName: '',
                checkingDate: '',
                result: '',
                incomingDate: '2021-05-12',
                id: null,
                selectedFile: '',
                nameFail: '',
                verificationResults: ['к защите', 'к доработке']


            }
        }
        this.setStateGroupInfo = this.setStateGroupInfo.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    ChangeSelectedProffesor(e) {
        //console.log(e.target.value)
        let currentG = this.state.currentGroup;
        currentG.profName = e.target.value;
        this.setState({currentGroup: currentG})
    }

    ChangeSelectedIncomingDate(e) {
        //console.log(e.target.value)
        let currentG = this.state.currentGroup;
        currentG.incomingDate = e.target.value;
        this.setState({currentGroup: currentG})
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
        new Promise((res, rej) => {
            res()
        }).then(e => {
            this.props.clouse();
        })
        this.setState({nameFail: this.state.selectedFile.name})
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3002/upload", data, {})
            .then(res => {
                console.log(res.statusText)
            })
    }

    onChangeHandler = event => {
        console.log(event.target.files[0])
        this.setState({selectedFile: event.target.files[0]}, () => {
            console.log(this.state.selectedFile)
        })

    }


    componentDidMount() {
        this.setStateGroupInfo(this.props)
    }


    render() {
        return (
            <Modal
                open={this.props.state}
                onClose={this.props.clouse}
            >
                <div className='paper modalForm modal-content'>
                    <div className="modal-header">
                        <span className="modal-title">Окно редактирования</span>
                        <img onClick={this.props.clouse} className='cursor' src={cross}/>
                    </div>
                    <div className='modal-body'>
                        <div className='row modalRow'>
                            <div className='col-6 titleModal v'>
                                <span>ФИО студента:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                {this.state.currentGroup.Name ? this.state.currentGroup.Name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ') : ''}
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>ФИО преподавателя:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <FormControl className='formControl'>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.currentGroup.profName}
                                        onChange={(e) => this.ChangeSelectedProffesor(e)}
                                    >
                                        {this.props.professors.map(professor => <MenuItem
                                            value={professor.profName}> {professor.profName.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')} </MenuItem>)}

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
                                    />
                            </div>
                        </div>
                        <div className='row modalRow date'>
                            <div className='col-6 titleModal v'>
                                <span className='v'>Дата проверки:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <TextField
                                    name="incomingDate"
                                    type='date'
                                    defaultValue={this.state.currentGroup.checkingDate}
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

                    </div>
                    <div className={`${s.positionSave} f`}>
                        <button type="button" className="btn btn-primary save block-center"  onClick={this.onSave}>Сохранить
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }

}

export default ModalWin1_2;

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
import {get} from "../axios";

class ModalWin1_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: {
                student:{
                  name:'Не выбрано',
                    id:''
                },
                professor:{
                    name:''
                },
                Name: '',
                profName: '',
                checkingDate: '',
                result: '',
                incomingDate: '',
                id: null,
            },
            courseWorkResID: '',
            selectedFile: '',
            number:'',
            nameFile: '',
            fileSelected:0
        }
        this.setStateGroupInfo = this.setStateGroupInfo.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.ChangeSelectedResult = this.ChangeSelectedResult.bind(this);
    }


    ChangeSelectedProffesor(e) {
        let currentG = this.state.currentGroup.professor;
        currentG.name = e.target.value;
        this.setState({name:e.target.value})
        console.log(this.state.currentGroup)
        // this.setState({currentGroup: currentG})
    }
    ChangeSelectedStudent(e,name) {
        let currentG = this.state.currentGroup.student;
        currentG.name = e.target.value;
        this.setState({name:e.target.value})


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
            }
        else if(e.target.value == 'к доработке'){
            this.setState({courseWorkResID: 2})
        }
        else return 3
        console.log(this.props.onSubmit)
    }

    setStateGroupInfo(props) {

        if (Object.keys(props.currentGroup).length && props.currentGroup) {
            this.setState({currentGroup: props.currentGroup}, () => {
                console.log(this.state)
            })
        }
    }

    onSave = () => {
        if (this.state.courseWorkResID == '') {

            this.state.courseWorkResID=this.state.currentGroup.courseWorkResID;
        }
        else {
            console.log(1)
        }
        this.props.onSubmit();

        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3002/upload", data, {})
            .then(res => {
                this.setState({nameFile:res.data.filename}, () => {
                    axios.put(`http://localhost:3001/edit/courseworks/${this.state.currentGroup.id}`, {checkingDate: this.state.currentGroup.checkingDate, incomingDate:this.state.currentGroup.incomingDate,
                    courseworkresult:this.state.courseWorkResID, filelink:this.state.nameFile, student:this.state.currentGroup.student.id  },() =>{console.log(this.state.nameFile)})
                    .then(res => {
                    })
                })
            })
        console.log(this.state.currentGroup)
    }

    onChangeHandler = event => {
        console.log(event.target.files[0])
        this.setState({selectedFile: event.target.files[0]}, () => {
            console.log(this.state.selectedFile)
        })
        HEAD
        {this.setState({nameFail: `${randomNumber}_${event.target.files[0]}`})}

        if(this.state.selectedFile){this.setState({nameFile: this.state.selectedFile.name})}
        console.log( this.state.selectedFile)
    }


    componentDidMount() {
        this.setStateGroupInfo(this.props)
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
                                        labelId="demo-simple-select-label"
                                        value={this.state.currentGroup.student.name}
                                        onChange={(e) => this.ChangeSelectedStudent(e)}
                                    >
                                        {this.props.students.map(student => <MenuItem
                                            value={student.name}>  {student.name ? student.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ') : ''} </MenuItem>)}

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
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.currentGroup.professor.name}
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
                            <button type="button" className="btn btn-primary save block-center"  onClick={this.onSave}>Сохранить
                            </button>
                        </div>
                    </div>

                </div>
            </Modal>
        );
    }

}

export default ModalWin1_2;

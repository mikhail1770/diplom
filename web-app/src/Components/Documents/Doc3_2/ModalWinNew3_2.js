import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import cross from "../cross.svg"
import s from "../Doc3_2/Doc3_2.module.css";
import axios from "axios";
import {get, post} from "../axios";
import moment from "moment"

class ModalWin3_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(moment(new Date().toLocaleDateString(), 'DD.MM.YYYY')).format('YYYY-MM-DD'),
            eventTheme: '',
            review:'',
            typename:'',
            typenameId:'',
            professor:'',
            professorId:''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);

    }

    ChangeSelectedProfessor(e) {
        console.log(e.target.value)
        console.log( this.state.professorId)
        this.state.professor = e.target.value.profName;
        this.state.professorId = e.target.value.id;
        this.state.rank=e.target.value.rank

    }

    ChangeSelectedDate(e) {     // Для даты
        this.state.date = e.target.value;
        console.log(this.state.date)

    }

    ChangeSelectedEventTheme(e){     // Для даты
        this.state.eventName = e.target.value;
        console.log(this.state.eventName)
    }

    ChangeSelectedReview(e){     // Для даты
        this.state.review = e.target.value;
        console.log(this.state.eventreview)
    }
    ChangeSelectedTypeOfActivity(e){     // Для даты
        console.log(e.target.value)
        console.log(this.state.typename)
        this.state.typename = e.target.value.typename;
        this.state.typenameId = e.target.value.id;
    }
    onSave = () => {
       post(`add/event`, {
           eventDate: this.state.date,
           theme: this.state.eventTheme,
           review:this.state.review,
           profId2: this.state.professorId,
           typeofoccupation: this.state.typenameId,
           rank: this.state.rank,
           profId:1,

        }).then(res => {
            this.props.onSubmit();
            this.props.close();
        })


        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3002/upload", data, {})
            .then(res => {
                console.log(res.statusText)
            })
        console.log(this.state.currentGroup)
    }

    onChangeHandler = event => {

        this.setState({selectedFile: event.target.files[0]})
    }

    render() {
        return (
            <Modal
                open={this.props.state}
                onClose={this.props.close}

            >
                <div className={`${s.paper} modalForm modal-content`}>
                    <div className="modal-header">
                        <span className="modal-title">Окно редактирования</span>
                        <img onClick={this.props.close} className='cursor' src={cross}/>
                    </div>
                    <div className='modal-body'>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Дата:</span>
                            </div>
                            <div className='col-6 v propsModal date'>
                                <TextField
                                    name="checkingDate"
                                    type='date'
                                    defaultValue={this.state.date}
                                    onChange={(e) => this.ChangeSelectedDate(e)}
                                />
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Тема занятия:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <input className="form-control form-control-sm" type="text"
                                       defaultValue={this.state.eventTheme}  onChange={(e) => this.ChangeSelectedEventTheme(e)}/>
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Вид занятия:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <FormControl className='formControl'>
                                    <Select
                                        defaultValue={this.state.typename}
                                        onChange={(e) => this.ChangeSelectedTypeOfActivity(e)}
                                    >
                                        {this.props.typeofocupations.map(typeofocupation => <MenuItem
                                            value={typeofocupation}> {typeofocupation.typename} </MenuItem>)}
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Посетил(а) занятие:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <FormControl className='formControl'>
                                    <Select
                                        defaultValue={this.state.professor}
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
                                <span>Рецензия:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <input className="form-control form-control-sm" type="text"
                                       defaultValue={this.state.review}  onChange={(e) => this.ChangeSelectedReview(e)}/>
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

export default ModalWin3_2;

import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import cross from "../cross.svg"
import s from "../Doc3_1/Doc3_1.module.css";
import axios from "axios";
import {get, put} from "../axios";

class ModalWin3_1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: {
                eventDate: this.props.currentGroup.eventDate,
                eventName: this.props.currentGroup.eventName,
                professor: {
                   name: 'Чуйко Ольга Игоревна',
                    id: this.props.currentGroup.professor.id
                },
                id: this.props.currentGroup.id
            },
            selectedFile: '',
            number: '',
            nameFile: this.props ? this.props.filelink : '',
            fileSelected: 0,
            profName: '',
            idProf: '',
            studentName: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.ChangeSelectedEventName = this.ChangeSelectedEventName.bind(this);
    }



    ChangeSelectedProfessor(e) {
        console.log(this.state.currentGroup.professor.name)
        let current = this.state.currentGroup;
        current.professor.name = e.target.value.profName;
        current.professor.id = 123;

    }

    ChangeSelectedDate(e) {     // Для даты
        this.state.currentGroup.eventDate = e.target.value;
        console.log(this.props.currentGroup.id)

    }

    ChangeSelectedEventName(e){     // Для даты
        this.state.currentGroup.eventName = e.target.value;
        console.log(this.state.currentGroup.eventName)


    }



    onSave = () => {

        put(`edit/profInEvent/${this.state.currentGroup.id}`, {
            eventDate: this.state.currentGroup.eventDate,
            eventName: this.state.currentGroup.eventName,
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
                                <span>Дата мероприятия:</span>
                            </div>
                            <div className='col-6 v propsModal date'>
                                <TextField
                                    name="incomingDate"
                                    type='date'
                                    defaultValue={this.state.currentGroup.eventDate}
                                    onChange={(e) => this.ChangeSelectedDate(e)}
                                />
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Наименование мероприятия:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <input className="form-control form-control-sm" type="text"
                                       defaultValue={this.state.currentGroup.eventName}  onChange={(e) => this.ChangeSelectedEventName(e)}/>
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

export default ModalWin3_1;

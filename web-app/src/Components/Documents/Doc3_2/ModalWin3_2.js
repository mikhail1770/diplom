import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import cross from "../cross.svg"
import s from "../Doc3_2/Doc3_2.module.css";
import axios from "axios";
import {put} from "../axios";

class ModalWin3_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: {
                eventDate: this.props.currentGroup.eventDate,
                eventTheme: this.props.currentGroup.eventTheme,
                professor: {
                    name: 'Чуйко Ольга Игоревна',
                    id: this.props.currentGroup.professor.id,
                    profRank: this.props.currentGroup.professor.profRank
                },
                id: this.props.currentGroup.id,
                review:this.props.currentGroup.review,
                typename:this.props.currentGroup.typename
            },
            number: '',
            profName: '',
            idProf: '',

        }

        this.onChangeHandler = this.onChangeHandler.bind(this);

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

    ChangeSelectedEventTheme(e){     // Для даты
        this.state.currentGroup.eventTheme = e.target.value;
        console.log(this.state.currentGroup.eventTheme)

    }
    ChangeSelectedReview(e){     // Для даты
        this.state.currentGroup.review = e.target.value;
        console.log(this.state.currentGroup.review)

    }

    onSave = () => {
        put(`edit/event/${this.state.currentGroup.id}`, {
            eventDate: this.state.currentGroup.eventDate,
            theme: this.state.currentGroup.eventTheme,
            review: this.state.currentGroup.review
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
                                    name="incomingDate"
                                    type='date'
                                    defaultValue={this.state.currentGroup.eventDate}
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
                                       defaultValue={this.state.currentGroup.eventTheme}  onChange={(e) => this.ChangeSelectedEventTheme(e)}/>
                            </div>
                        </div>
                        <div className='row modalRow '>
                            <div className='col-6 titleModal v'>
                                <span>Вид занятия:</span>
                            </div>
                            <div className='col-6 v propsModal'>
                                <FormControl className='formControl'>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e) => this.ChangeSelectedProfessor(e)}
                                    >
                                        {/*{this.props.professors.map(professor => <MenuItem*/}
                                        {/*    value={professor.profName}> {professor.profName.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')} </MenuItem>)}*/}
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
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e) => this.ChangeSelectedProffesor(e)}
                                    >
                                        {/*{this.props.professors.map(professor => <MenuItem*/}
                                        {/*    value={professor.profName}> {professor.profName.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')} </MenuItem>)}*/}
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
                                       defaultValue={this.state.currentGroup.review}  onChange={(e) => this.ChangeSelectedReview(e)}/>
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

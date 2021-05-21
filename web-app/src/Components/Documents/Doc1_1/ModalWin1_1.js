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

class ModalWin1_1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: {
                Name: '',
                checkingDate: '',
                result: '',
                incomingDate: '',
                id: null,
                selectedFile: '',
                nameFail: '',
                verificationResults: ['к защите', 'к доработке']
            }
        }
        this.setStateGroupInfo = this.setStateGroupInfo.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
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
                                {this.state.currentGroup.Name ? this.state.currentGroup.Name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ') : ''}
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

import React from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import cross from "../cross.svg"


function ModalWin1_2(props) {
    console.log(props.courseworks)
    return (
        <Modal
            open={props.state}
            onClose={props.clouse}
        >
            <div className='paper modalForm modal-content'>
                <div className="modal-header">
                    <span className="modal-title">Окно редактирования</span>
                    <img onClick={props.clouse} className='cursor' src={cross}/>
                </div>
                <div className='modal-body'>
                    <div className='row modalRow'>
                        <div className='col-6 titleModal v'>
                            <span>ФИО студента:</span>
                        </div>
                        <div className='col-6 v propsModal'>
                            <span>{props.currentGroup.Name}</span>
                        </div>
                    </div>
                    <div className='row modalRow '>
                        <div className='col-6 titleModal v'>
                            <span>ФИО преподавателя:</span>
                        </div>
                        <div className='col-6 v propsModal'>
                            <FormControl className='formControl'>
                                <Select
                                    value='Чуйко О.И.'
                                    onChange={props.handleChange}
                                    name="verificationResult">
                                    <MenuItem value='Чуйко О.И.'>Чуйко Ольга Игоревна</MenuItem>
                                    <MenuItem value='к доработке'>Прохорец О.В.</MenuItem>
                                    <MenuItem value='к доработке'>Прохорец О.В.</MenuItem>
                                    <MenuItem value='к доработке'>Прохорец О.В.</MenuItem>
                                    <MenuItem value='к доработке'>Прохорец О.В.</MenuItem>
                                    <MenuItem value='к доработке'>Прохорец О.В.</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className='row modalRow '>
                        <div className='col-6 titleModal v'>
                            <span>Дата поступления:</span>
                        </div>
                        <div className='col-6 v propsModal date'>
                        <span><TextField
                            id="date"
                            onChange={props.handleChange}
                            name='dateOfReceipt'
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}/></span>
                        </div>
                    </div>
                    <div className='row modalRow date'>
                        <div className='col-6 titleModal v'>
                            <span className='v'>Дата проверки:</span>
                        </div>
                        <div className='col-6 v propsModal'>
                        <span><TextField
                            id="date"
                            onChange={props.handleChange}
                            name='dateOfReceipt'
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}/></span>
                        </div>
                    </div>
                    <div className='row modalRow '>
                        <div className='col-6 titleModal v'>
                            <span>Результат проверки:</span>
                        </div>
                        <div className='col-6  v propsModal'>
                        <span>
                            <FormControl className='formControl'>
                            <Select
                                value={props.currentGroup.result}
                                onChange={props.handleChange}
                                name="verificationResult">
                                <MenuItem value='к защите'>к защите</MenuItem>
                                <MenuItem value='к доработке'>к доработке</MenuItem>
                            </Select>
                        </FormControl>
                        </span>
                        </div>
                    </div>
                    <div className='row modalRow v'>
                        <div className='col-6 titleModal'>
                            <span>Курсовая работа:</span>
                        </div>
                        <div className='col-6 v  propsModal'>
                            <input type='file'/>
                        </div>
                    </div >
                    <div className='f'><button type="button" className="btn btn-primary save block-center" onClick={props.onSave}>Сохранить</button></div>
                </div>


            </div>
        </Modal>
    );
}

export default ModalWin1_2;

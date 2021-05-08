import React from "react";
import Modal from "@material-ui/core/Modal";
import '../../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


function ModalWin1_2(props) {
console.log(props.courseworks)
    return (
        <Modal
            open={props.state}
            onClose={props.clouse}
        >
            <div className='paper modalForm modal-content'>
                <div className="modal-header">
                    <h4 className="modal-title">Окно редактирования</h4>
                </div>
                <div className='modal-body'>
                    <div className='row'>
                        <div className='col-5'>
                            <span>ФИО студента:</span>
                        </div>
                        <div className='col-7'>
                            <span>{props.currentGroup.Name}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>
                            <span>ФИО преподавателя:</span>
                        </div>
                        <div className='col-7'>
                            <span></span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'>
                            <span>Дата поступления:</span>
                        </div>
                        <div className='col-7'>
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
                    <div className='row'>
                        <div className='col-5'>
                            <span>Дата проверки:</span>
                        </div>
                        <div className='col-7'>
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
                    <div className='row'>
                        <div className='col-5'>
                            <span>Результат проверки:</span>
                        </div>
                        <div className='col-7'>
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
                    <div className='row'>
                        <div className='col-5'>
                            <span>Курсовая работа:</span>
                        </div>
                        <div className='col-7'>
                            <input type='file'/>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={props.clouse}>Закрыть</button>
                    <button type="button" className="btn btn-primary" onClick={props.onSave}>Сохранить</button>
                </div>

            </div>
        </Modal>
    );
}

export default ModalWin1_2;

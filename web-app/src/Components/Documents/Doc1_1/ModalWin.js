import React from "react";
import Modal from "@material-ui/core/Modal";
import '../../../App.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function ModalWin(props) {

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
                        <span>Группа:</span>
                    </div>
                    <div className='col-7'>
                        <span>{props.currentGroup.UnivGroup}</span>
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
                        <span>Результат проверки:</span>
                    </div>
                    <div className='col-7'>
                        <span><Select
                            onChange={props.handleChange}
                            style={{width: 200}}
                            name="verificationResult"
                            label="Результат проверки"
                        ></Select>
                        </span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-5'>
                        <span>Срок возврата:</span>
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
                        <span>Курсовая работа:</span>
                    </div>
                    <div className='col-7'>
                        <input type='file'/>
                    </div>
                </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={props.clouse}>Закрыть</button>
                    <button type="button" className="btn btn-primary">Сохранить</button>
                </div>

            </div>
        </Modal>
    );
}

export default ModalWin;

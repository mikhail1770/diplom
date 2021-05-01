import React from "react";
import Modal from "@material-ui/core/Modal";
import '../../../App.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function ModalWin(props) {

    return (
        <div>
            <Modal
                open={props.state}
                onClose={props.clouse}
            >
                <div className='paper'>
                    <table className="table">
                        <thead className="thead-inverse">
                        <tr>
                            <th>ФИО</th>
                            <th>Группа</th>
                            <th>Дата поступления</th>
                            <th>Результат проверки</th>
                            <th>Срок возврата</th>
                            <th>Курсовая работа</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <TextField
                                    id="date"
                                    onChange={props.handleChange}
                                    name='dateOfReceipt'
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                            </td>
                            <td>
                                <Select
                                    onChange={props.handleChange}
                                    style={{width: 200}}
                                    name="verificationResult"
                                    label="Результат проверки"
                                >

                                        <MenuItem >dfg</MenuItem>)}
                                </Select>
                            </td>
                            <td><TextField
                                id="date"
                                onChange={props.handleChange}
                                name='dateOfReceipt'
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /></td>
                            <td><input type="file"/></td>
                        </tr>
                        </tbody>
                    </table>
                    <Button variant="contained" color="primary" className="btn btn-primary center-block">
                        Сохранить
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default ModalWin;

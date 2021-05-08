import React from "react";
import '../../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {Edit} from "@material-ui/icons";

function Table1_1(props) {

    if (props.courseworks.length > 0) {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-6 pad'>
                            <h3 className='titleTab lead'>{props.disciplineName}</h3>
                        </div>
                        <div className='col-md-6'>

                        </div>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Группа</th>
                            <th>Дата поступления</th>
                            <th>Результат проверки</th>
                            <th>Срок возврата</th>
                            <th>Курсовая работа</th>
                            <th>#</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.courseworks.map((coursework, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{coursework.Name}</td>
                                <td className='text-center'>{coursework.groupName}</td>
                                <td>{coursework.groupName}</td>
                                <td>{coursework.groupName}</td>
                                <td>{coursework.groupName}</td>
                                <td>{coursework.groupName}</td>
                                <td width='50px'>
                                    <Button
                                        onClick={() => props.onOpenModal(coursework)}
                                        variant="contained"
                                        color="secondary"
                                        className='button colorButTab'
                                        startIcon={<Edit/>}
                                    >
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        return (
            <div className='row'>
                <span className='text-center'> Ничего не найдено </span>
            </div>
        );

    }
}
export default Table1_1;


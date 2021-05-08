import React from "react";
import '../../../App.css'
import Button from "@material-ui/core/Button";
import {Edit} from "@material-ui/icons";
import {format} from 'date-fns'

function Table1_2(props) {

    if (props.courseworks.length > 0) {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-12 pad'>
                            <h3 className='titleTab lead'>{props.disciplineName}</h3>
                        </div>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО студента</th>
                            <th>Курс</th>
                            <th>Группа</th>
                            <th>Дата поступления</th>
                            <th>ФИО преподавателя</th>
                            <th>Дата проверки</th>
                            <th>Результат проверки</th>
                            <th>Курсовая работа</th>
                            <th>#</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.courseworks.map((coursework, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{coursework.Name}</td>
                                <td className='text-center'>{coursework.course}</td>
                                <td>{coursework.groupName}</td>
                                <td>{coursework.incomingDate}</td>
                                <td>{coursework.profName}</td>
                                <td>{coursework.checkingDate}</td>
                                <td>{coursework.result}</td>
                                <td>Открыть файл</td>
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

export default Table1_2;


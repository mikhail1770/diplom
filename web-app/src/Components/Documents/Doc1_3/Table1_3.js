import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin1_3";
import print from '../print.svg';
import edit from '../edit.svg';


function Table1_3(props) {

    if (true) {
        return (
            <table className="table table-striped">
                <thead className='headTable'>
                <tr>
                    <th>№</th>
                    <th>ФИО студента</th>
                    <th>Группа</th>
                    <th>Курс</th>
                    <th>База практики</th>
                    <th>Дата поступления</th>
                    <th>Преподаватель</th>
                    <th>Дата проверки</th>
                    <th>Результаты проверки</th>
                    <th>
                        <div className='cursor' onClick={props.print}><img src={print}/></div>
                    </th>
                </tr>
                </thead>
                {/* <tbody>
                {props.courseworks.map((coursework, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{coursework.Name}</td>
                        <td className='text-center'>{coursework.course}</td>
                        <td>{coursework.groupName}</td>
                        <td className='w'>{coursework.incomingDate}</td>
                        <td>{coursework.profName}</td>
                        <td className='w'>{coursework.checkingDate}</td>
                        <td className='w'>{coursework.result}</td>
                        <td>Открыть</td>
                        <td width='50px'>
                            <div onClick={() => props.onOpenModal(coursework)} className='cursor'><img src={edit}/>
                            </div>
                            <ModalWin
                                verificationResult={props.verificationResult}
                                clouse={props.clouse}
                                state={props.state}
                                handleChange={props.handleChange}
                                courseworks={props.courseworks}
                                currentGroup={props.currentGroup}
                                onSave={props.onSave}/>
                        </td>
                        <td></td>
                    </tr>
                ))}
                </tbody>*/}
            </table>
        );
    } else {
        return (
            <div className='row '>
                <div className='col-md-12'>
                    <div className='block'> Ничего не найдено </div>
                </div>
            </div>
        );

    }
}

export default Table1_3;


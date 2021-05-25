import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin1_2";
import print from '../print.svg';
import edit from '../edit.svg';

import plus from '../plus.svg';
import delet from '../delete.svg';
import moment from "moment"


function Table1_2(props) {

    if (props.courseworks.length > 0) {
        return (
<div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th >№</th>
                            <th>ФИО студента</th>
                            <th>Курс</th>
                            <th>Группа</th>
                            <th>Дата поступления</th>
                            <th>ФИО преподавателя</th>
                            <th>Дата проверки</th>
                            <th>Результат</th>
                            <th>Курсовая работа</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        {props.courseworks.map((coursework, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td width='160px'>{coursework.Name.split(' ').map((item, index) => index  !=0 ? item.substring(0,1)+".": item).join(' ')}</td>
                                <td className='text-center'>{coursework.course}</td>
                                <td className='text-center'>{coursework.groupName}</td>
                                <td className='w text-center'>{moment(moment(coursework.incomingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')} </td>
                                <td width='130px' className='text-center'>{coursework.profName.split(' ').map((item, index) => index  !=0 ? item.substring(0,1)+".": item).join(' ')}</td>
                                <td className='w text-center'>{moment(moment(coursework.checkingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')}</td>
                                <td className='w'>{coursework.result}</td>
                                <td>Открыть</td>
                                <td width='50px'>
                                    <div onClick={() => props.onOpenModal(coursework)} className='cursor'> <img src={edit}/></div>



                                </td>
                            <td className='text-center'> <div onClick={() => props.onOpenModal(coursework)} className='cursor'> <img src={delet}/></div></td>
                            </tr>
                        ))}
                        </tbody>
                        {
                            props.state && <ModalWin

                                verificationResult={props.verificationResult}
                                close={props.close}
                                state={props.state}
                                handleChange={props.handleChange}
                                courseworks={props.courseworks}
                                currentGroup={props.currentGroup}
                                professors={props.professors}
                                students={props.students}/>
                        }

                    </table>
    <div className='bot2'>
        <div onClick={props.onOpenModal} className='cursor'><img className='block-right' src={plus}/></div>
    </div>
</div>

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

export default Table1_2;


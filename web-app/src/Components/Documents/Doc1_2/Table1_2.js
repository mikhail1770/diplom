import React from "react";
import '../../App.css'
import Button from "@material-ui/core/Button";
import {Edit} from "@material-ui/icons";
import ModalWin from "./ModalWin1_2";
import {format} from 'date-fns'
import s from './Doc1_2.module.css';
import print from '../print.svg';
import edit from '../edit.svg';
import gif from '../1.gif';
import {withMobileDialog} from "@material-ui/core";

function Table1_2(props) {



    if (props.courseworks.length > 0) {
        return (

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
                            <th>{!props.printLoad ? <div className='cursor' onClick={props.print}><img src={print}/></div> : <img src={gif} className='wid' />}</th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        {props.courseworks.map((coursework, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td width='150px'>{coursework.Name.split(' ').map((item, index) => index  !=0 ? item.substring(0,1)+".": item).join(' ')}</td>
                                <td className='text-center'>{coursework.course}</td>
                                <td>{coursework.groupName}</td>
                                <td className='w'>{coursework.incomingDate}</td>
                                <td>{coursework.profName.split(' ').map((item, index) => index  !=0 ? item.substring(0,1)+".": item).join(' ')}</td>
                                <td className='w'>{coursework.checkingDate}</td>
                                <td className='w'>{coursework.result}</td>
                                <td>Открыть</td>
                                <td width='50px'>
                                    <div onClick={() => props.onOpenModal(coursework)} className='cursor'> <img src={edit}/></div>


                                    {
                                        props.state && <ModalWin

                                            verificationResult={props.verificationResult}
                                            clouse={props.clouse}
                                            state={props.state}
                                            handleChange={props.handleChange}
                                            courseworks={props.courseworks}
                                            currentGroup={props.currentGroup}
                                            onSave={props.onSave}
                                            professors={props.professors}/>
                                    }
                                </td>
                            <td></td>
                            </tr>
                        ))}
                        </tbody>
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

export default Table1_2;


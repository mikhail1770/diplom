import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin1_2";
import edit from '../edit.svg';
import plus from '../plus.svg';
import delet from '../delete.svg';
import moment from "moment"
import {get} from "../axios";


class Table1_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName:''

        }
    }

    onFile = event => {
        get(`/${this.props.currentGroup.id}`).then(res => {
            const fileName = res.data;
            this.setState({fileName});
            console.log(fileName)
        })
    }


    render() {

        if (this.props.courseworks.length > 0) {
            return (
                <div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th>№</th>
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
                        {this.props.courseworks.map((coursework, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td width='160px'>{coursework.student.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                                <td className='text-center'>{coursework.course}</td>
                                <td className='text-center'>{coursework.group.name}</td>
                                <td className='w text-center'>{moment(moment(coursework.incomingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')} </td>
                                <td width='130px'
                                    className='text-center'>{coursework.professor.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                                <td className='w text-center'>{moment(moment(coursework.checkingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')}</td>
                                <td className='w'>{coursework.result}</td>
                                <td>
                                    <div onClick={this.onFile} className='cursor'>Открыть</div>
                                </td>
                                <td width='50px'>
                                    <div onClick={() => this.props.onOpenModal(coursework)} className='cursor'><img
                                        src={edit}/></div>


                                </td>
                                <td className='text-center'>
                                    <div onClick={() => this.props.onOpenModal(coursework)} className='cursor'><img
                                        src={delet}/></div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        {
                            this.props.state && <ModalWin

                                verificationResult={this.props.verificationResult}
                                close={this.props.close}
                                state={this.props.state}
                                handleChange={this.props.handleChange}
                                courseworks={this.props.courseworks}
                                currentGroup={this.props.currentGroup}
                                professors={this.props.professors}
                                students={this.props.students}
                                onSubmit={this.props.onSubmit}/>
                        }

                    </table>
                    <div className='bot2'>
                        <div onClick={this.props.onOpenModal} className='cursor'><img className='block-right' src={plus}/>
                        </div>
                    </div>
                </div>

            );
        } else {
            return (
                <div className='row '>
                    <div className='col-md-12'>
                        <div className='block'> Ничего не найдено</div>
                    </div>
                </div>
            );

        }
    }
}

    export default Table1_2;


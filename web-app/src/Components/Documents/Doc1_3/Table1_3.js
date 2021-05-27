import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin1_3";
import print from '../print.svg';
import edit from '../edit.svg';
import {get} from "../axios";


class Table1_3 extends React.Component {

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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.courseworks.map((coursework, index) => (
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
                                <div onClick={() => this.props.onOpenModal(coursework)} className='cursor'><img src={edit}/>
                                </div>
                                <ModalWin
                                    verificationResult={this.props.verificationResult}
                                    clouse={this.props.clouse}
                                    state={this.props.state}
                                    handleChange={this.props.handleChange}
                                    courseworks={this.props.courseworks}
                                    currentGroup={this.props.currentGroup}
                                    onSave={this.props.onSave}/>
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
                        <div className='block'> Ничего не найдено</div>
                    </div>
                </div>
            );

        }
    }
}

export default Table1_3;


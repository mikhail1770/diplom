import React from "react";
import '../../App.css'
import edit from "../edit.svg";
import ModalWin from "../Doc1_1/ModalWin1_1";
import {get} from "../axios";
import plus from "../plus.svg";
import delet from "../delete.svg";

class Table1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: ''

        }
    }

    onFile = event => {
        get(`coursework/filename/${event}`).then(res => {
            console.log(res.data)
            const fileName = res.data;
            this.setState({fileName});
        }).then(res => {
            console.log(this.state.fileName[0].filelink)
            window.open('http://localhost:3001/' + this.state.fileName[0].filelink, '_blank').focus();
            this.setState({printLoad: false})
        })
        console.log(event)
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
                            <th>Группа</th>
                            <th>Дата поступления</th>
                            <th>Результат проверки</th>
                            <th>Срок возврата</th>
                            <th>Курсовая работа</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        {this.props.courseworks.map((coursework, index) => (
                            <tr>
                                <td width='30px'>{index + 1}</td>
                                <td width='160px'>{coursework.Name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                                <td width='100px'>{coursework.groupName}</td>
                                <td width='150px'>{coursework.incomingDate}</td>
                                <td width='150px'>{coursework.result}</td>
                                <td width='150px'>{coursework.checkingDate}</td>
                                <td width='150px'>
                                    <div onClick={() => this.onFile(coursework.id)} className='cursor colorOpen'>Открыть
                                    </div>
                                </td>
                                <td width='50px'>
                                    <div onClick={() => this.props.onOpenModal(coursework)} className='cursor'><img
                                        src={edit}/>
                                    </div>
                                </td>
                                <td><div onClick={() => this.props.onOpenModal(coursework)} className='cursor'><img
                                    src={delet}/></div></td>

                            </tr>
                        ))}
                        </tbody>
                        {this.props.state && <ModalWin
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
                        <div onClick={this.props.onOpenModal} className='cursor'><img className='block-right'
                                                                                      src={plus}/>
                        </div>
                    </div>
                </div>

            );
        } else {
            return (
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='block'> Ничего не найдено</div>
                    </div>
                </div>
            );

        }
    }
}

export default Table1_1;


import React from "react";
import '../../App.css'
import edit from "../edit.svg";
import ModalWin from "../Doc2_1/ModalWin2_1";
import plus from "../plus.svg";
import delet from "../delete.svg";
import {get, del} from '../axios.js'
import moment from "moment";
import ModalWinNew from "../Doc2_1/ModalWinNew2_1";

class Table2_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            open: false,


        }
    }

    onFile = event => {
        get(`coursework/filename/${event}`).then(res => {
            console.log(res.data)
            const fileName = res.data;
            this.setState({fileName});
        }).then(res => {
            console.log(this.state.fileName)
            window.open('http://localhost:3001/' + this.state.fileName[0].filelink, '_blank').focus();
            this.setState({printLoad: false})
        })
        console.log(event)
    }
    onOpenModalNew = () => {
        this.setState({
            open: true
        });
    }

    onCloseModalNew = () => {
        this.setState({
            open: false,
            test: false
        });
    }
    onDelete = (id) => {
        console.log(id)
        del(`delete/courseworkszaoch/${id}`).then(res => { this.props.onSubmit()
        })

    }
    render() {

        if (true) {
            return (
                <div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th className='text-center'>№</th>
                            <th className='text-center'>ФИО студента</th>
                            <th className='text-center'>Группа</th>
                            <th className='text-center'>Дата поступления</th>
                            <th className='text-center'>Результат проверки</th>
                            <th className='text-center'> Срок возврата</th>
                            <th className='text-center'>Курсовая работа</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        {this.props.courseworks.map((coursework, index) => (
                            <tr>
                                <td >{index + 1}</td>
                                <td width='160px' className='text-center'>{coursework.student.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                                <td width='100px' className='text-center'>{coursework.group.name}</td>
                                <td width='150px' className='text-center'>{moment(moment(coursework.incomingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')}</td>
                                <td width='150px' className='text-center'>{coursework.result}</td>
                                <td width='150px' className='text-center'>{moment(moment(coursework.checkingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')}</td>
                                <td width='150px' className='text-center'>
                                    {coursework.filelink ? <div onClick={() => this.onFile(coursework.id)}
                                                                className='cursor colorOpen'>Открыть
                                    </div>: ''}
                                </td>
                                <td width='50px'>
                                    <div onClick={() => this.props.onOpenModal(coursework)} className='cursor'><img
                                        src={edit}/>
                                    </div>
                                </td>
                                <td><div onClick={() => this.onDelete(coursework.id)}  className='cursor'><img
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
                        <div onClick={this.onOpenModalNew} className='cursor'><img className='block-right' src={plus}/>
                        </div>
                        <ModalWinNew
                            close={this.onCloseModalNew}
                            state={this.state.open}
                            handleChange={this.props.handleChange}
                            professors={this.props.professors}
                            students={this.props.students}
                            onSubmit={this.props.onSubmit}
                            univGroups={this.props.univGroups}
                            disciplines={this.props.disciplines}
                            course={this.props.course}
                            groups = {this.props.groups}
                        />
                    </div>
                </div>

            );
        } else {
            return (
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='block'> Ничего не найдено! <br/></div>
                        { this.props.test ? <div>
                            <div onClick={this.onOpenModalNew} className='cursor block'>Добавьте первую запись<img
                                className='block-right2' src={plus}/></div>
                            <ModalWinNew
                                close={this.onCloseModalNew}
                                state={this.state.open}
                                handleChange={this.props.handleChange}
                                professors={this.props.professors}
                                students={this.props.students}
                                onSubmit={this.props.onSubmit}
                                univGroups={this.props.univGroups}
                                disciplines={this.props.disciplines}
                                course={this.props.course}
                                groups={this.props.groups}
                            />
                        </div> : ''
                        }
                    </div>
                </div>
            );

        }
    }
}

export default Table2_1;


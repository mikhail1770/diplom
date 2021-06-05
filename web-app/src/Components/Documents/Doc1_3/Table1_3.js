import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin1_3";
import edit from '../edit.svg';
import plus from '../plus.svg';
import delet from '../delete.svg';
import moment from "moment"
import ModalWinNew from "./ModalWinNew1_3"
import axios from "axios";

class Table1_3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            open: false,

        }
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
        axios.delete(`http://localhost:3001/delete/practiceReport/${id}`).then(res => { this.props.onSubmit()
        })

    }
    render() {
        if (this.props.reports.length > 0) {
            return (
                <div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th>№</th>
                            <th >ФИО студента</th>
                            <th>Группа</th>
                            <th>Курс</th>
                            <th>База практики</th>
                            <th>Дата поступления</th>
                            <th>ФИО преподавателя</th>
                            <th>Дата проверки</th>
                            <th>Результат</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        {this.props.reports.map((report, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td width='190px'>{report.student.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                                <td className='text-center' width='50px'>{report.group.name}</td>
                                <td className='text-center' width='20px'>{report.course}</td>
                                <td width='150px'>{report.basePractic}</td>
                                <td className='w text-center' width='50px'>{moment(moment(report.incomingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')} </td>
                                <td  className='text-center' width='160px'>{report.professor.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                                <td className='w text-center'>{moment(moment(report.checkingDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')}</td>
                                <td className='w' >{report.result}</td>
                                <td>
                                    <div onClick={() => this.props.onOpenModal(report)} className='cursor'><img src={edit}/></div>
                                </td>
                                <td className='text-center'>
                                    <div onClick={() => this.onDelete(report.id)}   className='cursor'><img src={delet}/></div>
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
                                courseworks={this.props.reports}
                                currentGroup={this.props.currentGroup}
                                professors={this.props.professors}
                                students={this.props.students}
                                onSubmit={this.props.onSubmit}
                            />
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
                            test = {this.state.test}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className='row '>
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

export default Table1_3;


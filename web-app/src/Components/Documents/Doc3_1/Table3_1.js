import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin3_1";
import edit from '../edit.svg';
import plus from '../plus.svg';
import delet from '../delete.svg';
import moment from "moment"
import {del} from "../axios";
import ModalWinNew from "../Doc3_1/ModalWinNew3_1";



class Table3_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            open: false
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
        del(`delete/profInEvent/${id}`).then(res => { this.props.onSubmit()
        })

    }
    render() {
        if (this.props.profInEvents.length > 0) {
            return (
                <div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th className='text-center'>ФИО преподавателя</th>
                            <th className='text-center'>Наименование мероприятия</th>
                            <th className='text-center'>Дата мероприятия</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        {this.props.profInEvents.map((profInEvent) => (
                        <tr>
                            <td  className='text-center'>{profInEvent.professor.name.split(' ').map((item, index) => index != 0 ? item.substring(0, 1) + "." : item).join(' ')}</td>
                            <td  className='text-center'>{profInEvent.eventName}</td>
                            <td className='text-center'>{moment(moment(profInEvent.eventDate, 'YYYY-MM-DD')).format('DD.MM.YYYY')}</td>
                            <td width='50px' >
                                <div onClick={() => this.props.onOpenModal(profInEvent)} className='cursor'><img
                                    src={edit}/></div>
                            </td>
                            <td className='text-center'>
                                <div className='cursor' onClick={() => this.onDelete(profInEvent.id)}><img src={delet}/></div>
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
                                profInEvents={this.props.profInEvents}
                                currentGroup={this.props.currentGroup}
                                professors={this.props.professors}
                                onSubmit={this.props.onSubmit}
                            profId={this.props.profId}/>
                        }
                    </table>
                    <div className='bot2'>
                        <div onClick={this.onOpenModalNew} className='cursor'><img className='block-right' src={plus}/>
                        </div>
                        <ModalWinNew
                            close={this.onCloseModalNew}
                            state={this.state.open}
                            handleChange={this.props.handleChange}
                            onSubmit={this.props.onSubmit}
                            univGroups={this.props.univGroups}
                            disciplines={this.props.disciplines}
                            course={this.props.course}
                            test = {this.state.test}
                            profId={this.props.profId}
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
                                handleChange={this.props.handleChange}
                                onSubmit={this.props.onSubmit}
                                univGroups={this.props.univGroups}
                                profId={this.props.profId}
                            />
                        </div> : ''
                        }
                    </div>
                </div>
            );
        }
    }
}


export default Table3_1;


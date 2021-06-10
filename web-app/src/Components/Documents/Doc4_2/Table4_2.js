import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin4_2";
import edit from '../edit.svg';
import plus from '../plus.svg';
import delet from '../delete.svg';
import moment from "moment"


class Table3_1 extends React.Component {

    render() {
            return (
                <div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th className='text-center'>ФИО преподавателя</th>
                            <th className='text-center'>Наименование мероприятия</th>
                            <th className='text-center'>Дата мероприятия</th>
                            <th className='text-center'>Наименование мероприятия</th>
                            <th className='text-center'>Дата мероприятия</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>
                        <tr>
                            <td  className='text-center'></td>
                            <td  className='text-center'></td>
                            <td className='text-center'></td>
                            <td width='50px' >
                                <div onClick={this.props.onOpenModal} className='cursor'><img
                                    src={edit}/></div>
                            </td>
                            <td className='text-center'>
                                <div className='cursor'><img src={delet}/></div>
                            </td>
                        </tr>
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
                                onSubmit={this.props.onSubmit}/>
                        }
                    </table>
                    <div className='bot2'>
                        <div onClick={this.props.onOpenModal} className='cursor'><img className='block-right' src={plus}/>
                        </div>
                    </div>
                </div>

            );

    }
}

    export default Table3_1;


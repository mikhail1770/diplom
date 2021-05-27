import React from "react";
import '../../App.css'
import ModalWin from "./ModalWin3_1";
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


            return (
                <div>
                    <table className="table table-striped">
                        <thead className='headTable'>
                        <tr>
                            <th>Дата</th>
                            <th>ФИО преподавателя, проводившего занятие</th>
                            <th>Тема и вид занятия</th>
                            <th>ФИО преподавателя, посетившего занятие</th>
                            <th>Рецензия</th>
                        </tr>
                        </thead>
                        <tbody className='fontSize'>

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

    }
}

    export default Table1_2;


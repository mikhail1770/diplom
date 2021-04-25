import React from 'react';
import '../../../App.css';
import axios from 'axios';
import SelectForm from "../SelectForm";
import InputText from "../InputText";
import $ from "jquery";


export default class Doc1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationResults: ['к защите', 'к доработке'],
            groups: [],
            group: '',
            disciplines: '',
            studentName: '',
            dateOfReceipt: '',
            verificationResult: 'к защите',
            fail: ''
        };

        this.handleChange = this.handleChange.bind(this);

    }


    handleChange = event => { //для того, чтобы использовать несколько input
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const coursework = {
            disciplines: this.state.disciplines,
            studentName: this.state.studentName,
            group: this.state.group,
            dateOfReceipt: this.state.dateOfReceipt,
            verificationResult: this.state.verificationResult
        };

        axios.post('http://localhost:3001/', {coursework})
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
            console.log(error)
            console.log(coursework)
        });
        this.setState({
            group: '',
            disciplines: '',
            studentName: '',
            dateOfReceipt: '',
            verificationResult: '',
            fail: '',
        })


    }

    componentDidMount() {           //запрос к серверу
        axios.get(`http://localhost:3001/univGroups`)
            .then(res => {
                const groups = res.data;
                this.setState({groups});

            })


    }

    render() {

        return (
            <form className="form " onSubmit={this.onSubmit}>
                <div className="form-row row">
                    <div className='col-md-3'>

                        <InputText label={'Дисциплина'} name={'disciplines'} handleChange={this.handleChange}
                                   value={this.state.disciplines}/>
                    </div>

                    <div className='col-md-3'>
                        <InputText label={'Группа'} name={'group'} handleChange={this.handleChange}
                                   value={this.state.group} state={this.state.verificationResults}/>
                    </div>
                    <div className='col-md-3'>
                        <InputText label={'ФИО студента'} name={'studentName'} handleChange={this.handleChange}
                                   value={this.state.studentName}/>
                    </div>
                    <div className='col-md-3'>
                        <InputText label={'Дата поступления'} name={'dateOfReceipt'} handleChange={this.handleChange}
                                   value={this.state.dateOfReceipt}/>
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-6'>
                        <SelectForm state={this.state.verificationResults} handleChange={this.handleChange}
                                    label={'Результат проверки'}/>
                    </div>
                    <div className='col-md-6'>
                        <p>Загрузить файл:</p>
                        <input type="file"/>
                    </div>
                    <input type="submit" value="Добавить" class="btn btn-primary"/>
                    {/*{this.state.verificationResult}
                    {this.state.disciplines}*/}
                </div>
            </form>

        )
    }
}




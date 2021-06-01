import React from "react";
import Modal from "@material-ui/core/Modal";
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Table1_1 from "../Doc1_1/Table1_1";
import {Link} from "react-router-dom";
import main from "../main.svg";
import top from "../top.svg";
import printBig from "../printBig.svg";
import gif from "../1.gif";

class ModalWin1_3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGroup: {
                checkingDate: this.props.currentGroup.checkingDate,
                incomingDate: this.props.currentGroup.incomingDate,
                student: {
                    name: this.props.currentGroup.student.name,
                    id: this.props.currentGroup.student.id
                },
                professor: {
                    id: this.props.currentGroup.professor.id,
                    name: this.props.currentGroup.professor.name
                },
                result: this.props.currentGroup.result,
                id: this.props.currentGroup.id
            },
            courseWorkResID: '',
            selectedFile: '',
            number: '',
            nameFile: this.props ? this.props.filelink : '',
            fileSelected: 0,
            profName: '',
            idProf: '',
            studentName: ''

        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.ChangeSelectedResult = this.ChangeSelectedResult.bind(this);
    }


    ChangeSelectedProfessor(e) {

        let current = this.state.currentGroup;
        current.professor.name = e.target.value.profName;
        current.professor.id = e.target.value.id;
        console.log(this.props)

        console.log(this.props)
    }

    ChangeSelectedStudent(e) {
        let current = this.state.currentGroup;
        current.student.name = e.target.value.name;
        current.student.id = e.target.value.id;
        this.setState({current})

    }

    ChangeSelectedIncomingDate(e) {
        this.state.currentGroup.incomingDate = e.target.value;
        console.log(this.state.currentGroup)

    }

    ChangeSelectedcheckingDate(e) {
        this.state.currentGroup.checkingDate = e.target.value;

    }

    ChangeSelectedResult(e) {
        if (e.target.value == 'к защите') {
            this.setState({courseWorkResID: 1})
        } else if (e.target.value == 'к доработке') {
            this.setState({courseWorkResID: 2})
        } else return 3
        console.log(this.props.onSubmit)
    }


    onSave = () => {
        if (this.state.courseWorkResID == '') {

            this.state.courseWorkResID = this.state.currentGroup.courseWorkResID;
        } else {
            console.log(1)
        }


        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3001/upload", data, {})
            .then(res => {
                this.setState({nameFile: res.data.filename}, () => {
                    axios.put(`http://localhost:3001/edit/courseworks/${this.state.currentGroup.id}`, {
                        checkingDate: this.state.currentGroup.checkingDate,
                        incomingDate: this.state.currentGroup.incomingDate,
                        courseworkresult: this.state.courseWorkResID,
                        filelink: this.state.nameFile,
                        student: this.state.currentGroup.student.id,
                        professor: this.state.currentGroup.professor.id
                    }, () => {
                        console.log(this.state.nameFile)
                    })
                        .then(res => {
                            this.props.onSubmit();
                        })
                })
            })
        console.log(this.state.currentGroup)
    }

    onChangeHandler = event => {  // загрузка файла
        this.setState({selectedFile: event.target.files[0]}, () => {
            console.log(this.state.selectedFile)
        })
    }


    componentDidMount() {

    }


    render() {
        return (
            <div>
                <div className='line row'>
                    <div className='nameDepartment col-md-6'>
                        <span>Кафедра информационных систем и технологий</span>
                    </div>
                    <div className='listDoc col-md-6'>
                        <span>Учет курсовых работ заочной формы обучения</span>
                    </div>
                </div>
                <div className='lineBlack row'></div>
                {this.state.pageLoaded ?
                    <div>
                        <form className='nav container main'>
                            <div className="form-row row center-block form">
                                <div className='col-md-4 pad'>
                                    <Autocomplete
                                        className='col-md-3'
                                        className='bot'
                                        value={this.state.fullDiscipline}
                                        id="discipline"
                                        getOptionLabel={(option) => option.name}
                                        options={this.state.disciplines}
                                        onChange={(e, v) => this.onAutoDis(v, "discipline", 'fullDiscipline')}
                                        style={{width: 200}}
                                        renderInput={(params) => <TextField {...params} label='Дисциплина'
                                                                            variant="outlined"/>}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <Autocomplete
                                        value={this.state.fullName}
                                        id="studentName"
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, v) => this.onAutocompleteChange(v, "studentName", 'fullName')}
                                        options={this.state.studentsName}
                                        style={{width: 200}}
                                        renderInput={(params) => <TextField  {...params} label='ФИО студента'
                                                                             variant="outlined"/>}
                                    />
                                </div>
                                <div className='col-md-1'></div>

                                <div className='col-md-3'>
                                    <div className='b m1'>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="btn btn-primary btnFind"
                                            onClick={this.onSubmit} disabled={!this.state.discipline}>
                                            <span>Найти</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='row  nav topTable'>
                            <div className='col-md-12 pad padRig'>
                                <Table1_1
                                    disciplineName={this.state.disciplineName}
                                    courseworks={this.state.courseworks}
                                    onOpenModal={this.onOpenModal}
                                    currentGroup={this.state.currentGroup}
                                    verificationResult={this.state.verificationResult}
                                    close={this.onCloseModal}
                                    state={this.state.open}
                                    handleChange={this.handleChange}
                                    onSave={this.onSave}
                                    print={this.onPrint}
                                    printLoad={this.state.printLoad}
                                    students={this.state.studentsName}/>
                            </div>
                            <div className='navs'>
                                <Link to={'/'}><img src={main} className='cursor' title="Вернуться к документам"
                                                    className='btnRight'/></Link>
                                <Link to={'/2'}>
                                    <div className='cursor btnRight1'><img src={top} title="Вернуться к документам"/>
                                    </div>
                                </Link>
                                {!this.state.printLoad ?
                                    <div className='cursor q' onClick={this.onPrint}><img src={printBig}/></div> :
                                    <img src={gif} className='wid'/>}
                            </div>
                        </div>
                    </div> : <img src={gif} className='gifCenter'/>
                }
            </div>


        )
    }
}

export default ModalWin1_3;

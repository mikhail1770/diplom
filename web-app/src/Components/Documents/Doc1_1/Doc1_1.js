import React from 'react';
import '../../../App.css';
import axios from 'axios';


export default class Doc1_1 extends React.Component {
    state = {
        groups: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/univGroups`)
            .then(res => {
                const groups = res.data;
                this.setState({groups});
                console.log(groups);
            })
    }

    render() {
        return (
            <ul>
                {this.state.groups.map(group => <li>{group.title} </li>)}
            </ul>
        )
    }
}




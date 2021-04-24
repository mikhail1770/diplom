import React from "react";
import { render } from "react-dom";

const Article = ({ title, text }) => (
    <div>
        <h3>{title || "Без заголовка"}</h3>
        <p>{text || "пусто"}</p>
    </div>
);

class Doc_1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            head_names: ['qwe0', 'qwe1'],
            rows: [
                [1, 2],
                [3, 4]
            ]
        };
    }

    AddRow() {
        let newRows = this.state.rows;
        newRows.push([0, 0]);
        this.setState({rows: newRows});
    }

    render() {
        return (
            <div>
                <Table head={this.state.head_names} rows={this.state.rows} />
                <hr />
                <button onClick={ this.AddRow.bind(this) }>Add row</button>
            </div>
        );
    }
}

class Table extends React.Component {
    render() {
        return (
            <table>
                <thead>
                {this.genHead()}
                </thead>
                <tbody>
                {this.genRow()}
                </tbody>
            </table>
        );
    }

    genHead() {
        var head = this.props.head;

        return head.map(function(v, i) {
            return (
                <th key={'th' + i}>
                    {v}
                </th>
            );
        });
    }

    genRow() {
        var rows = this.props.rows;

        return rows.map(function(v, i) {
            var tmp = v.map(function(v2, j) {
                return (
                    <td key={'td' + i + '_' + j}>
                        {v2}
                    </td>
                );
            });

            return (
                <tr key={'tr' + i}>
                    {tmp}
                </tr>
            )
        });
    }
}


export default Doc_1;

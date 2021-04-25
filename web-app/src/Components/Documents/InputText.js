import React from 'react';
import $ from 'jquery';
import '../../App.css';
function InputText(props) {



    return (
        <div>
            <div>
                <span>{props.label}</span>
                <input className="form-control" type="text" onChange={props.handleChange} name={props.name}
                       value={props.value} placeholder={props.label} autocomplete="off" />
            </div>

        </div>
    );
}

export default InputText;
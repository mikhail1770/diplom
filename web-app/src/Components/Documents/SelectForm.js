import React from 'react';




function SelectForm(props) {

    return (
        <div>
            <label>
                <span>{props.label}</span>
                <select className="form-control" value={props.verificationResult} onChange={props.handleChange} name='verificationResult'>
                    {props.state.map(verificationResult => <option>{verificationResult}</option>)}
                </select>
            </label>
        </div>
    );
}

export default SelectForm;
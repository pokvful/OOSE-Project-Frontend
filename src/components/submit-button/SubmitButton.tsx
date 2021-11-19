import React from 'react';
import './SubmitButton.css';

interface Props {
    inputType: string,
    value:any,
    disabled?: boolean
}

function SubmitButton({ inputType, value, disabled = false }: Props ) {

    const classNameString = "submit-button"

    return (
        <div>
            <input className={classNameString + ` submit-button-${disabled ? "disabled" : "enabled"}`} disabled={disabled} value={value} type={inputType}/>
        </div>
    );
}

export default SubmitButton;
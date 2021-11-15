import React from 'react';
import './Button.css';

interface Props {
    title: String,
    disabled: boolean
}

function Button({ title, disabled }: Props ) {

    const classNameString = "button"

    const buttonClick = () => {
        console.log("Button click")
    }

    return (
        <button disabled={disabled} className={classNameString + ` button-${disabled ? "disabled" : "enabled"}`} onClick={() => buttonClick()}>
            {title}
        </button>
    );
}

export default Button;
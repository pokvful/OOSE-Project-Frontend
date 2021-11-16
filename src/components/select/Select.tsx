import React from 'react';
import './Select.css';

interface Props {
    placeholderText: string,
    selectName: string,
    selectLabel: string,
    options: string[]
}

function Select({ placeholderText, selectName, selectLabel, options }: Props ) {

    return (
        <div>
            <h4 className="select-label">{selectLabel}</h4>
            <select className="select" id={selectName} name={selectName}>
                <option value="placeholder">{placeholderText + "..."}</option>
                {options.map((option, index) => {
                    return (
                        <option value={option} key={option + index}>{option}</option>
                    )}
                )}
            </select>
        </div>
    );
}

export default Select;
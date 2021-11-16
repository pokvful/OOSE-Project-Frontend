import React, { useState } from "react";
import Button from "../../components/button/Button";
import CloseModalButton from "../../components/closebutton/CloseModalButton";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import './ComponentsDemo.css';

function Components() {

    const [disabled, setDisabled] = useState(true);

    const disableButton = () => {
        if (disabled) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const buttonClick = () => {
        console.log("Click")
    }

    const closeModal = () => {
        console.log("Close modal")
    }

    return (
        <div className="components">

            <h2>Components</h2>

            <h3>Enabled</h3>
            <Button title="Disable button" disabled={false} onClick={disableButton}/>
            <h3>Disabled</h3>
            <Button title="Test" disabled={disabled} onClick={buttonClick}/>

            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>

            {/* Default voor inputLength is short, specificeer alleen als je een andere grootte wil */}
            <Input placeholderText="placeholder text" inputName="name-label" inputType="text" inputLabel="Label"/>
            <Input placeholderText="placeholder text" inputName="name-label" inputType="text" inputLength="medium" inputLabel="Label"/>

            {/* De placeholder wordt als eerste optie weergegeven */}
            <Select placeholderText={"placeholder"} selectName={"name-label"} selectLabel={"Select"} options={["Optie 1", "Optie 2", "Optie 3"]}/>

            <br/>
            
            <CloseModalButton onClick={closeModal}/>

            <br/>
            
        </div>
    )
}

export default Components;
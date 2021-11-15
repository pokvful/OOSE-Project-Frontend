import React from "react";
import Button from "../../components/button/Button";
import './ComponentsDemo.css';

function Components() {

    return (
        <div className="components">
            <h1>Components</h1>
            <h4>Enabled</h4>
            <Button title="Test" disabled={false}/>
            <h4>Disabled</h4>
            <Button title="Test" disabled={true}/>
        </div>
    )
}

export default Components;
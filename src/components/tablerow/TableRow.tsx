import React from 'react';
import './TableRow.css';
import EditIcon from '../../assets/icons/edit.svg';
import TrashIcon from '../../assets/icons/delete.svg';

interface Props {
    title: String,
    subtitle?: String,
    onEditClick: React.MouseEventHandler<HTMLButtonElement>,
    onDeleteClick: React.MouseEventHandler<HTMLButtonElement>
}

function TableRow({ title, subtitle="", onEditClick, onDeleteClick }: Props ) {

    return (
        <div className="table-row">

            <div className="left-section">
                <h4>{title}</h4>
                <h5>{subtitle}</h5>
            </div>

            <div className="right-section">
                <button className="edit table-row-button" onClick={onEditClick}>
                    <img className="table-row-icon" src={EditIcon} alt="wijzig" />
                </button>
                <button className="trash table-row-button" onClick={onDeleteClick}>
                    <img className="table-row-icon" src={TrashIcon} alt="verwijder" />
                </button>
            </div>
        </div>
    );
}

export default TableRow;
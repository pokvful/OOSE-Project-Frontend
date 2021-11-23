import Option from './Option';
import './Select.css';

interface Props {
    placeholderText: string,
    selectName: string,
    selectLabel: string,
    options: Option[],
    value?: string,
    onChange:any;
}

function Select({ placeholderText, selectName, selectLabel, options, value = "", onChange }: Props ) {
    const changeSelect = (e:React.ChangeEvent<HTMLSelectElement>):any => {
        onChange(options[e.target.options.selectedIndex - 1].id);
    }
    return (
        <div>
            <h4 className="select-label">{selectLabel}</h4>
            <select value={value != "" ? value : "0"} className="select" id={selectName} name={selectName} onChange={changeSelect}>
                <option value="0">{placeholderText + "..."}</option>
                {options.map(option => {
                    return (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    )}
                )}
            </select>
        </div>
    );
}

export default Select;
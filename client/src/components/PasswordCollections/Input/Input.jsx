import './Input.scss';

export const Input = ({placeholder, text}) => (
    <label className="field field_v2">
        <input className="field__input" placeholder={placeholder}/>
        <span className="field__label-wrap">
            <span className="field__label">{text}</span>
        </span>
    </label>
)
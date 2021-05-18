import './Input.scss';

export const Input = ({placeholder, type, text, handleChange}) => (
    <label className="field field_v2">
        <input 
            type={type}
            name={text}
            onChange={handleChange(text.toLowerCase())}
            className="field__input"
            placeholder={placeholder}
            autoComplete='off'
        />
        <span className="field__label-wrap">
            <span className="field__label">{text}</span>
        </span>
    </label>
)
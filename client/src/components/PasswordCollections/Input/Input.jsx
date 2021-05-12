import './Input.scss';

export const Input = ({placeholder, text, handleChange}) => (
    <label className="field field_v2">
        <input 
            type='text'
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
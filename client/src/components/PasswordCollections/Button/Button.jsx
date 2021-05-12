import './Button.scss'

export const Button = ({text}) => (
    <button className="fancy">
        <span className="top-key"></span>
        <input type='submit' value={text}/>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
    </button>
)
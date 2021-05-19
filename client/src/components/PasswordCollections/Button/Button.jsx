import './Button.scss'

export const Button = ({text}) => (
    <button className="fancy">
        <input type='submit' value={text}/>
    </button>
)
import React, {useState} from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import './NewPassword.scss';
import { CSSTransition } from "react-transition-group";

function NewPassword({submit, handleInput, handleSelect, collections}) {
    const [close, setClose] = useState(false);

    return (
        <CSSTransition
            in={close}
            timeout={300}
            classNames='add'
        >
            <div className='add-pass'>
                <p>
                    Add new password <span onClick={() => setClose(!close)}>
                        <i className="fa fa-chevron-down navigate" style={{transform: `${close ? 'rotate(180deg)' : ""}`}}></i>
                    </span>
                </p>
                <CSSTransition
                    in={close}
                    timeout={300}
                    classNames='form'
                >
                    <form onSubmit={submit}>
                        <Input handleChange={handleInput} placeholder='@gmail.com' type='text' text='Email'/>
                        <Input handleChange={handleInput} placeholder='********' type='password' text='Password'/>
                        <select className='select' onChange={handleSelect}>
                            <option value="">Choose your collection</option>
                            {collections.map((col, i) => <option value={col._id} key={i}>{col.name}</option>)}
                        </select>
                        <Button text={'Add Password'}/>
                    </form>
                </CSSTransition>
            </div>
        </CSSTransition>
    )
}

export default NewPassword

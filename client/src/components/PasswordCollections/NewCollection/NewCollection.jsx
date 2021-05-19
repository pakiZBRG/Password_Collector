import React, {useState} from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './NewCollection.scss';
import { CSSTransition } from "react-transition-group";

function NewCollection({submit, handle}) {
    const [close, setClose] = useState(false);

    return (
        <CSSTransition
            in={close}
            timeout={300}
            classNames='add'
        >
            <div className='add-card'>
                <p>
                    Create new collection <span onClick={() => setClose(!close)}>
                        <i className="fa fa-chevron-down navigate" style={{transform: `${close ? 'rotate(180deg)' : ""}`}}></i>
                    </span>
                </p>
                <CSSTransition
                    in={close}
                    timeout={300}
                    classNames='form'
                >
                    <form onSubmit={submit}>
                        <Input handleChange={handle} type='text' placeholder='Facebook' text='Name'/>
                        <Input handleChange={handle} type='text' placeholder='facebook.com' text='Website'/>
                        <Input handleChange={handle} type='text' placeholder='Social' text='Category'/>
                        <Button text={'Create new Collection'}/>
                    </form>
                </CSSTransition>
            </div>
        </CSSTransition>
    )
}

export default NewCollection

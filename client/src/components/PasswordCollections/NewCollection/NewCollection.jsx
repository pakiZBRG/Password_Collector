import React from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './NewCollection.scss';

function NewCollection({submit, handle}) {
    return (
        <div className='add-card'>
            <p>Create new collection</p>
            <form onSubmit={submit}>
                <Input handleChange={handle} type='text' placeholder='Facebook' text='Name'/>
                <Input handleChange={handle} type='text' placeholder='facebook.com' text='Website'/>
                <Input handleChange={handle} type='text' placeholder='Social' text='Category'/>
                <Button text={'Create new Collection'}/>
            </form>
        </div>
    )
}

export default NewCollection

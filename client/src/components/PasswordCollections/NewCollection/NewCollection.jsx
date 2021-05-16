import React from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './NewCollection.scss';

function NewCollection({submit, handle}) {
    return (
        <div className='add-card'>
            <p>Create new collection</p>
            <form onSubmit={submit}>
                <Input handleChange={handle} placeholder='Facebook' text='Name'/>
                <Input handleChange={handle} placeholder='facebook.com' text='Website'/>
                <Input handleChange={handle} placeholder='Social' text='Category'/>
                <Button text={'Create new Collection'}/>
            </form>
        </div>
    )
}

export default NewCollection

import React from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import './NewPassword.scss';

function NewPassword({submit, handleInput, handleSelect, collections}) {
    return (
        <div className='add-card'>
            <p>Add new password</p>
            <form onSubmit={submit}>
                <Input handleChange={handleInput} placeholder='@gmail.com' text='Email'/>
                <Input handleChange={handleInput} placeholder='********' text='Password'/>
                <select className='select' onChange={handleSelect}>
                    <option value="">Choose your collection</option>
                    {collections.map((col, i) => <option value={col._id} key={i}>{col.name}</option>)}
                </select>
                <Button text={'Add Password'}/>
            </form>
        </div>
    )
}

export default NewPassword

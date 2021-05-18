import React from 'react';
import './Passwords.scss';

function Passwords({toggle, passwords}) {
    return (
        <>
        {passwords.collection && 
        <div className='password'>
            <div className='password-info'>
                <h1>{passwords.collection.name}</h1>
                <a target='blanc' href={`https://${passwords.collection.website}`}>{passwords.collection.website}</a>
                <h3>{passwords.collection.category}</h3>
            </div>
            <div className='password-pass'>
                <table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Email</td>
                            <td>Password</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    {!passwords.collection.passwords.length ? 
                        <p className='password-nopass'>No Passwords</p>
                            :
                        <tbody>
                            {passwords.collection.passwords.map((pass, i) => 
                                <tr key={pass._id}>
                                    <td>{i+1}.</td>
                                    <td>{pass.email}</td>
                                    <td><input type='password' value={pass.password}/></td>
                                    <td><i className="fa fa-edit"> </i><i className="fa fa-remove"></i></td>
                                </tr>
                            )}
                        </tbody>
                    }
                </table>
            </div>
            <span className='password-close' onClick={toggle}>&times;</span>
        </div>}
        </>
    )
}

export default Passwords

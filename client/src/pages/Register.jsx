import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import RegisterBackground from '../components/RegisterBackground/RegisterBackground';

function Register() {    
    return (
        <div className='background'>
            <RegisterBackground/>
            <RegisterForm />
        </div>
    )
}

export default Register
import React from 'react';
import { motion } from 'framer-motion';

function Register() {
    const easeOut = { duration: 1, ease: [.42, 0, .58, 1] };

    const showPassword = () => {
        const pass = document.querySelectorAll("#password");
        pass.forEach(p => p.type === "password" ? p.type = "text" : p.type = "password");
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form Submitted');
    }
    
    return (
        <div className='background'>
            <motion.div
                animate={{height: '100vh', width: '100vw', ease: 'easeInOut'}}
                className="background-red"
            >
                <div className='register'>
                    <div className='register-image'></div>
                    <div className='register-form'>
                        <h1>Create An Account</h1>
                        <form onSubmit={() => handleSubmit(this)} className="form">
                            <div className='form-input'>
                                <label htmlFor='email'>Email Address</label>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email'
                                    autoComplete='off'
                                />
                            </div>
                            <div className='form-input'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password'
                                />
                            </div>
                            <div className='form-input'>
                                <label htmlFor='passwordRepeat'>Repeat Password</label>
                                <input
                                    type="password"
                                    id='password'
                                    name='passwordRepeat'
                                    placeholder='Repeat your password'
                                />
                            </div>
                            <div className='form-input'>
                                <input type="checkbox" onChange={() => showPassword()}/>
                                <p>Show password</p>
                            </div>
                            <button type='submit'className='form-button'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Register
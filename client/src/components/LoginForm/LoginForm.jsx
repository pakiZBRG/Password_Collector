import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginForm.scss';
import geometry from '../../assets/Geometric.png';

function LoginForm() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };
    const showPassword = () => {
        const pass = document.querySelectorAll("#password");
        pass.forEach(p => p.type === "password" ? p.type = "text" : p.type = "password");
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form Submitted');
    }

    return (
        <div className='register'>
            <motion.div 
                initial={{scale: 1.1, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={easeOut}
                exit={{scale: 1.1, opacity: 0}}
                className='register-image'
            >
                <img src={geometry} alt="bg"/>
            </motion.div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.1, ...easeOut}}
                exit={{opacity: 0}}
                className='register-form'
            >
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="form">
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
                    <div className='form-show'>
                        <input type="checkbox" onChange={() => showPassword()}/>
                        <p>Show password</p>
                    </div>
                    <input value='Login &rarr;' type='submit' className='form-button'/>
                    <p className='have-account'><Link to='/register'>Create an Account</Link></p>
                </form>
            </motion.div>
        </div>
    )
}

export default LoginForm

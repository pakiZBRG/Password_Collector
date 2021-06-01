import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import geometry from '../../assets/Geometric.png';

function ResetPassword(token) {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };
    const [user, setUser] = useState({});

    const showPassword = () => {
        const pass = document.querySelectorAll("#password");
        pass.forEach(p => p.type === "password" ? p.type = "text" : p.type = "password");
    }

    const handleChange = text => e => setUser({...user, [text]: e.target.value});
    
    const handleSubmit = e => {
        e.preventDefault();
        if(user.password === user.passwordConfirm){
            axios.post(`http://localhost:5000/users/resetpassword/${token.token}`, user)
                .then(res => toast.success(res.data.message))
                .catch(err => toast.error(err.response.data.error));
        } else {
            toast.warn("Your passwords do not match");
        }
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
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className='form-input'>
                        <label htmlFor='email'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={handleChange('password')}
                            placeholder='Enter your new password'
                        />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='email'>Confirm Password</label>
                        <input
                            type='password'
                            id='password'
                            name='passwordConfirm'
                            onChange={handleChange('passwordConfirm')}
                            placeholder='Confrim your new password'
                        />
                    </div>
                    <div className='form-show'>
                        <input type="checkbox" onChange={() => showPassword()}/>
                        <p>Show password</p>
                        <Link to='/login' style={{fontSize: '0.9rem', color: 'pink', marginLeft: 'auto'}}>Login here</Link>
                    </div>
                    <input value='Confirm &rarr;' type='submit' className='form-button'/>
                </form>
            </motion.div>
            <ToastContainer/>
        </div>
    )
}

export default ResetPassword

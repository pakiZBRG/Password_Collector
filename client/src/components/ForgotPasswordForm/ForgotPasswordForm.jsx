import React, {useState} from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import geometry from '../../assets/Geometric.png';

function ForgotPassword() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };
    const [user, setUser] = useState({});

    const handleChange = text => e => setUser({...user, [text]: e.target.value});
    
    const handleSubmit = e => {
        e.preventDefault();
        if(user.email){
            axios.post('users/forgotpassword', user)
                .then(res => toast.success(res.data.message))
                .catch(err => toast.error(err.response.data.message));
        } else {
            toast.warn("Please enter your credentials");
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
                        <label htmlFor='email'>Email Address</label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange('email')}
                            placeholder='Enter your email'
                            autoComplete='off'
                        />
                    </div>
                    <input value='Reset &rarr;' type='submit' className='form-button'/>
                </form>
            </motion.div>
            <ToastContainer/>
        </div>
    )
}

export default ForgotPassword

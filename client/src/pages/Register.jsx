import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm/RegisterForm';

function Register() {
    const easeOut = { duration: 1, ease: [.42, 0, .58, 1] };
    
    return (
        <div className='background'>
            <motion.div
                animate={{ height: '100vh', width: '100vw' }}
                exit={{ height: '70vh', width: 0 }}
                transition={{ ...easeOut}}
                className="background-red"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ ...easeOut }}
                    className='register'
                >
                    <div className='register-image'></div>
                    <RegisterForm />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Register
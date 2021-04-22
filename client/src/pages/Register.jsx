import React from 'react';
import { motion } from 'framer-motion';

function Register() {
    const easeOut = { duration: 1, ease: [.42, 0, .58, 1] };
    
    return (
        <div className='background'>
            <motion.div
                animate={{height: '100vh', width: '100vw', ease: 'easeInOut'}}
                className="background-red"
            >
                Register
            </motion.div>
        </div>
    )
}

export default Register
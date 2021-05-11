import React from 'react';
import { motion } from 'framer-motion';
import './HeroContext.scss';
import { Link } from 'react-router-dom';

function HeroContext() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };

    return (
        <div className='context'>
            <div className="context-title">
                <motion.h1
                    initial={{skewY: 20, y: 500}}
                    animate={{delay: 0.6, skewY: 0, y: 0}}
                    exit={{skewY: 20, y: 500, delay: 0}}
                    transition={{ ...easeOut, duration: 1.3}}
                >
                    Password Collection
                </motion.h1>
            </div>
            <motion.p
                initial={{opacity: 0, scale: 1.15}}
                animate={{delay: 0.8, opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 1.15, delay: 1}}
                transition={{ ...easeOut}}
                className='context-brief'
            >
                Why memorise all your passwords or write them down and store them under your keyboard when you can put them all on single place and instead remember only one
            </motion.p>
            <Link to='/register'>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{delay: 1, opacity: 1}}
                    exit={{opacity: 0, delay: 0}}
                    transition={{ ...easeOut}}
                    className="btn effect04" 
                    data-sm-link-text="Join Now"
                >
                    <span>Create Account</span>
                </motion.div>
            </Link>
            <Link to='/login'>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{delay: 1, opacity: 1}}
                    exit={{opacity: 0, delay: 0}}
                    transition={{ delay: .4, ...easeOut}}
                    className="btn effect04" 
                    data-sm-link-text="Now"
                >
                    <span>Login</span>
                </motion.div>
            </Link>
        </div>
    )
}

export default HeroContext

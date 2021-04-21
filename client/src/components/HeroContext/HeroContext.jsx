import React from 'react';
import { motion } from 'framer-motion';
import './HeroContext.scss';

function HeroContext() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };

    return (
        <div className='context'>
            <div className="context-title">
                <motion.h1
                    initial={{skewY: 20, y: 500}}
                    animate={{skewY: 0, y: 0}}
                    transition={{delay: 1.2, ...easeOut, duration: 1.3}}
                >
                    Password Collection
                </motion.h1>
            </div>
            <motion.p
                initial={{opacity: 0, scale: 1.15}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 1.5, ...easeOut}}
                className='context-brief'
            >
                Why memorise all your passwords or write them down and store them under your keyboard when you can put them all on single place and instead remember only one
            </motion.p>
            <motion.a
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.5, ...easeOut}}
                className="btn effect04" 
                data-sm-link-text="Join Now"
            >
                <span>Create Account</span>
            </motion.a>
        </div>
    )
}

export default HeroContext

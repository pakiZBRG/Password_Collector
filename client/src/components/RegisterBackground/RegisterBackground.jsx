import React from 'react';
import { motion } from 'framer-motion';
import './RegisterBackground.scss';

function HeroBackgorund() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };

    return (
        <div className='register-background'>
            <motion.div
                initial={{ scaleY: 0, transformOrigin: 'bottom'}}
                animate={{ scaleY: 1}}
                exit={{scaleY: 0, delay: 1.4}}
                transition={{delay: 0.5, ...easeOut}}
                className="register-background__beige"
            ></motion.div>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'right'}}
                animate={{ scaleX: 1}}
                exit={{scaleX: 0, delay: 1.8}}
                transition={{delay: 1, ...easeOut}}
                className="register-background__red"
            ></motion.div>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'left'}}
                animate={{ scaleX: 1}}
                exit={{scaleX: 0, delay: 1.6}}
                transition={{delay: 0.8, ...easeOut}}
                className="register-background__black"
            ></motion.div>
            <motion.div
                initial={{ scaleY: 0, transformOrigin: 'top'}}
                animate={{ scaleY: 1}}
                exit={{scaleY: 0, delay: 1}}
                transition={easeOut}
                className="register-background__purple"
            ></motion.div>
        </div>
    )
}

export default HeroBackgorund

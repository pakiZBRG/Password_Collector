import React from 'react';
import { motion } from 'framer-motion';
import './HeroBackground.scss';

function HeroBackgorund() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };

    return (
        <div className='background'>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'left'}}
                animate={{ scaleX: 1}}
                transition={easeOut}
                className="background-red"
            ></motion.div>
            <motion.div
                initial={{ scaleY: 0, transformOrigin: 'top'}}
                animate={{ scaleY: 1}}
                transition={{delay: 0.3, ...easeOut}}
                className="background-beige"
            >
                <motion.h5
                    initial={{ x: 30 }}
                    animate={{ x: 0}}
                    transition={{delay: 1.8, duration: 1}}
                >
                    pakiZBRG 2021.
                </motion.h5>
            </motion.div>
            <motion.div
                initial={{ scaleY: 0, transformOrigin: 'bottom'}}
                animate={{ scaleY: 1}}
                transition={{delay: 0.5, ...easeOut}}
                className="background-black social"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{delay: 1.7, ...easeOut}}
                    className='social-links'
                >
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-twitter"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-github"></i>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'left'}}
                animate={{ scaleX: 1}}
                transition={{delay: 0.8, ...easeOut}}
                className="background-cian"
            ></motion.div>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'right'}}
                animate={{ scaleX: 1}}
                transition={{delay: 1, ...easeOut}}
                className="background-blue"
            ></motion.div>
        </div>
    )
}

export default HeroBackgorund

import React from 'react';
import { motion } from 'framer-motion';

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
                className="background-green"
            ></motion.div>
            <motion.div
                initial={{ scaleY: 0, transformOrigin: 'bottom'}}
                animate={{ scaleY: 1}}
                transition={{delay: 0.5, ...easeOut}}
                className="background-blue"
            ></motion.div>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'left'}}
                animate={{ scaleX: 1}}
                transition={{delay: 0.8, ...easeOut}}
                className="background-yellow"
            ></motion.div>
            <motion.div
                initial={{ scaleX: 0, transformOrigin: 'right'}}
                animate={{ scaleX: 1}}
                transition={{delay: 1, ...easeOut}}
                className="background-beige"
            ></motion.div>
        </div>
    )
}

export default HeroBackgorund

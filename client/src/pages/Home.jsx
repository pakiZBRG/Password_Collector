import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from '../components/HeroBackgorund';

function Home() {
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };

    return (
        <>
            <HeroBackground/>
            <div className='context'>
                <div className="context-title">
                    <motion.h1
                        initial={{skewY: 13, y: 400}}
                        animate={{skewY: 0, y: 0}}
                        transition={{delay: 1.2, ...easeOut}}
                    >
                        Password Collection
                    </motion.h1>
                </div>
                <motion.p
                    initial={{opacity: 0, scale: 1.1}}
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
                    class="btn effect04" 
                    data-sm-link-text="Pass 'em now"
                >
                    <span>Create Account</span>
                </motion.a>
                <div>
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-twitter"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-github"></i>
                </div>
            </div>
        </>
    )
}

export default Home

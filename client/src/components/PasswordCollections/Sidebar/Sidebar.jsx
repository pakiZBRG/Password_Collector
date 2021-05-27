import React from 'react';
import { logout } from '../../../helper/auth';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.scss';
import Loading from '../Loading/Loading';

function Sidebar({reset, loading, filter, categories, user}) {
    const history = useHistory();
    const easeOut = { duration: .8, ease: [.42, 0, .58, 1] };

    const buttons = {
        hidden: { opacity: 0, scale: .9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
              delay: .5,
              duration: 0.8,
              ease: [.42, 0, .58, 1]
          }
        },
        exit: { opacity: 0, y: 20 }
    };

    return (
        <nav className='nav'>
            {!loading ? 
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ easeOut }}
                    className='nav-flex'
                >
                    <p className='nav-flex__name'>password collections</p>
                    <p className='nav-flex__email'>{user.email}</p>
                    <p className='nav-flex__id'>{user._id}</p>
                    <motion.div 
                        variants={buttons}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className='nav-flex__categories'
                    >
                        {categories.length ? 
                            <>
                                <button onClick={reset} className='cat-button'>All</button>
                                {categories.map((cat, i) => 
                                    <button key={i} onClick={filter} className='cat-button'>
                                        {cat}
                                    </button>
                                )}
                            </>
                                :
                            <p>No Categories to display</p>
                        }
                    </motion.div>
                    <button className='nav-flex__signout' onClick={() => {
                        logout(() => history.push('/'));
                    }}>
                        Signout
                    </button>
                </motion.div>
                    :
                <Loading/>
            }
        </nav>
    )
}

export default Sidebar

import React from 'react'
import { Card } from '../Card/Card'
import Loading from '../Loading/Loading'
import NewCollection from '../NewCollection/NewCollection'
import { motion } from 'framer-motion';
import NewPassword from '../NewPassword/NewPassword'
import './Collections.scss';

function Collections(props) {
    const { collections, filter, loading } = props;
    
    return (
        <motion.div
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: .6, delay: .5, ease: "easeOut"}}
            exit={{opacity: 0, x: 150, delay: 0.8}}
            className='coll'
        >
            <motion.div
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: .7, delay: 1, ease: "easeOut"}}
                exit={{opacity: 0, x: 150}}
                className='coll-row'
            >
                <NewCollection
                    submit={props.submitCollection} 
                    handle={props.handleCollection}
                />
                <NewPassword
                    submit={props.submitPassword}
                    handleInput={props.handlePasswords}
                    handleSelect={props.handleSelect}
                    collections={props.collections}
                />
            </motion.div>
            <div className='coll-num'>
                {!filter.length == 0 ? filter.length : collections.length} / {collections.length}
                <span style={{color: 'gray'}}> collections</span>
            </div>
            {!loading ? 
                <motion.div
                    
                    className='coll-flex'
                >
                    {!filter.length == 0 ? 
                        filter.map(col => 
                            <Card
                                remove={props.deleteCollection}
                                toggle={props.toggleOpenPassword}
                                key={col._id}
                                col={col}
                            />
                        ) 
                            :
                        collections.map(col => 
                            <Card
                                remove={props.deleteCollection}
                                toggle={props.toggleOpenPassword}
                                key={col._id}
                                col={col}
                            />
                        )
                    }
                </motion.div>
                : 
                <Loading/>
            }
        </motion.div>
    )
}

export default Collections

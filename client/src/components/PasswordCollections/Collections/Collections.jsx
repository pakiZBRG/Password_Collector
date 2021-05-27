import React from 'react'
import { Card } from '../Card/Card'
import Loading from '../Loading/Loading'
import NewCollection from '../NewCollection/NewCollection'
import NewPassword from '../NewPassword/NewPassword'
import './Collections.scss';

function Collections(props) {
    const { collections, filter, loading } = props;
    
    return (
        <div className='coll'>
            <div className='coll-row'>
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
            </div>
            <div className='coll-num'>
                {!filter.length == 0 ? filter.length : collections.length} / {collections.length}
                <span style={{color: 'gray'}}> collections</span>
            </div>
            {!loading ? 
                <div className='coll-flex'>
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
                </div>
                : 
                <Loading/>
            }
        </div>
    )
}

export default Collections

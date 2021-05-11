import React, { useEffect, useState } from 'react';
import { isAuth } from '../../helper/auth';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './PasswordCollections.scss';

function PasswordCollections() {
    const history = useHistory();
    const userId = localStorage.getItem("user");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!isAuth()) {
            history.push('/login');
        }
        axios.get(`/users/${userId}`)
            .then(res => {
                setUser(res.data.user[0]);
                setLoading(l => !l);
            })
            .catch(err => console.log(err));
    }, [history, userId]);

    console.log(user.collections);

    return (
        <div className='flex'>
            <nav className='nav'>
                {!loading ? 
                    <>
                        <p>{user.email}</p>
                        <p>{user._id}</p>
                    </>
                    :
                    <div>Loading</div>
                }
            </nav>
            <div className='coll'>
                {!loading ? user.collections.map(col => (
                    <div className='coll-cards' key={col._id}>
                        <p>{col.name}</p>
                        <a href={`${col.website}`} target='blanc'>{col.website}</a>
                        <p>{col.passwords.length} passwords</p>
                    </div>
                    )
                ) : <div>Loading</div>}
            </div>
        </div>
    )
}

export default PasswordCollections

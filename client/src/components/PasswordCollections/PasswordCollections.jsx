import React, { useEffect, useState } from 'react';
import { isAuth, logout } from '../../helper/auth';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
        if(userId){
            axios.get(`/users/${userId}`)
                .then(res => {
                    setUser(res.data.user[0]);
                    setLoading(l => !l);
                })
                .catch(err => console.log(err));
        }
    }, [history, userId]);

    console.log(user.collections);

    return (
        <div className='flex'>
            <ToastContainer/>
            <nav className='nav'>
                {!loading ? 
                    <>
                        <p>{user.email}</p>
                        <p>{user._id}</p>
                        <button onClick={() => {
                            logout(() => history.push('/'));
                            toast.success("See you soon");
                        }}>
                            Signout
                        </button>
                    </>
                    :
                    <div>Loading</div>
                }
            </nav>
            <div className='coll'>
                {!loading ? 
                <>
                    {user.collections.map(col => (
                        <div className='coll-cards' key={col._id}>
                            <p className='coll-cards__name'>{col.name}</p>
                            <a
                                className='coll-cards__site'
                                href={`${col.website}`}
                                target='blanc'
                            >
                                {col.website}
                            </a>
                            <p className='coll-cards__num'>{col.passwords.length} passwords</p>
                        </div>
                    ))}
                </>
                : <div>Loading</div>}
            </div>
        </div>
    )
}

export default PasswordCollections

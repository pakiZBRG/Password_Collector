import React, { useEffect, useState } from 'react';
import { isAuth, logout } from '../../helper/auth';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './PasswordCollections.scss';
import { Card } from './Card/Card';
import { Input } from './Input/Input';
import { Button } from './Button/Button';

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

    const handleSubmit = e => {
        e.preventDefault();
        console.log('submitted')
    }

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
                    <div className='add-card'>
                        <p>Create new collection</p>
                        <form onSubmit={handleSubmit}>
                            <Input placeholder='Facebook' text='Name'/>
                            <Input placeholder='facebook.com' text='Webiste'/>
                            <Input placeholder='Social' text='Category'/>
                            <Button text={'Create new Collection'}/>
                        </form>
                    </div>
                    {user.collections.map(col => <Card col={col}/>)}
                </>
                : <div>Loading</div>}
            </div>
        </div>
    )
}

export default PasswordCollections

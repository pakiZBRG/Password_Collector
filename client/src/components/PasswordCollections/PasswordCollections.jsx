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
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState({});

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

    const handleChange = text => e => setCollection({...collection, [text]: e.target.value});

    let config = {headers: {token: token.toString()}}

    const handleSubmit = e => {
        e.preventDefault();
        if(collection.name && collection.website && collection.category){
            axios.post('/collections/new', { ...collection, userId }, config)
                .then(res => toast.success(res.data.message))
                .catch(err => toast.error(err.response.data.error))
        } else {
            toast.warn("Please fill all the information");
        }
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
                            <Input handleChange={handleChange} placeholder='Facebook' text='Name'/>
                            <Input handleChange={handleChange} placeholder='facebook.com' text='Website'/>
                            <Input handleChange={handleChange} placeholder='Social' text='Category'/>
                            <Button text={'Create new Collection'}/>
                        </form>
                    </div>
                    {user.collections.map(col => <Card key={col._id} col={col}/>)}
                </>
                : <div>Loading</div>}
            </div>
        </div>
    )
}

export default PasswordCollections

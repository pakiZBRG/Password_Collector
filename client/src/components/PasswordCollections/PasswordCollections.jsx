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
    const [colData, setColData] = useState({});
    const [passData, setPassData] = useState({});
    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if(!isAuth()) {
            history.push('/login');
        }
        if(userId){
            axios.get(`/users/${userId}`)
                .then(res => {
                    setUser(res.data.user[0]);
                    setLoading(l => !l);
                    setCollections(res.data.user[0].collections);
                    res.data.user[0].collections.map(col => setCategories(c => [...c, col.category]));
                })
                .catch(err => console.log(err));
        }
    }, [history, userId]);

    const handleCollection = text => e => setColData({...colData, [text]: e.target.value});
    const handlePasswords = text => e => setPassData({...passData, [text]: e.target.value});

    let config = {headers: {token: token && token.toString()}};
    const { name, website, category } = colData;
    const { email, password, collector } = passData;

    const asd = (e) => {
        setPassData({...passData, collector: e.target.value});
    }

    const submitCollection = e => {
        e.preventDefault();
        if(name && website && category){
            axios.post('/collections/new', { ...colData, userId }, config)
                .then(res => {
                    toast.success(res.data.message);
                    setCollections([...collections, res.data.collection]);
                    setCategories([...categories, res.data.collection.category]);
                })
                .catch(err => toast.error(err.response.data.error))
        } else {
            toast.warn("Please fill all the information");
        }
    }

    const submitPassword = e => {
        e.preventDefault();
        if(email && password && collector){
            axios.post('/passwords/new', { ...passData, userId }, config)
                .then(res => {
                    toast.success(res.data.message);
                    console.log(res);
                })
                .catch(err => toast.error(err.response.data.error))
        } else {
            toast.warn("Please fill all the information");
        }
    }

    const uniqueCat = [...new Set(categories)];

    return (
        <div className='flex'>
            <ToastContainer/>
            <nav className='nav'>
                {!loading ? 
                    <div className='nav-flex'>
                        <p className='nav-flex__name'>password collections</p>
                        <p className='nav-flex__email'>{user.email}</p>
                        <p className='nav-flex__id'>{user._id}</p>
                        <div className='nav-flex__categories'>
                            {uniqueCat.length ? uniqueCat.map((cat, i) => <button className='cat-button' key={i}>{cat}</button>) : <p>No Categories to display</p>}
                        </div>
                        <button className='nav-flex__signout' onClick={() => {
                            logout(() => history.push('/'));
                            toast.success("See you soon");
                        }}>
                            Signout
                        </button>
                    </div>
                    :
                    <div>Loading</div>
                }
            </nav>
            <div className='coll'>
                <div className='add-card'>
                    <p>Create new collection</p>
                    <form onSubmit={submitCollection}>
                        <Input handleChange={handleCollection} placeholder='Facebook' text='Name'/>
                        <Input handleChange={handleCollection} placeholder='facebook.com' text='Website'/>
                        <Input handleChange={handleCollection} placeholder='Social' text='Category'/>
                        <Button text={'Create new Collection'}/>
                    </form>
                </div>
                <div className='add-card'>
                    <p>Add new password</p>
                    <form onSubmit={submitPassword}>
                        <Input handleChange={handlePasswords} placeholder='@gmail.com' text='Email'/>
                        <Input handleChange={handlePasswords} placeholder='********' text='Password'/>
                        <select onChange={asd}>
                            <option>Choose your collection</option>
                            {collections.map((col, i) => <option value={col._id} key={i}>{col.name}</option>)}
                        </select>
                        <Button text={'Add Password'}/>
                    </form>
                </div>
                {!loading ? 
                    <div className='coll-flex'>
                        {collections.map(col => <Card key={col._id} col={col}/>)}
                    </div>
                    : 
                    <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default PasswordCollections

import React, { useEffect, useState } from 'react';
import { isAuth } from '../../helper/auth';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './PasswordCollections.scss';
import Sidebar from './Sidebar/Sidebar';
import Passwords from './Passwords/Passwords';
import Collections from './Collections/Collections';

function PasswordCollections() {
    const history = useHistory();
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let config = {headers: {token: token && token.toString()}};

    const [user, setUser] = useState({});
    const [colData, setColData] = useState({});
    const [passData, setPassData] = useState({});
    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [passwords, setPasswords] = useState({});
    const [filter, setFilter] = useState([]);

    const [openPassword, setOpenPassword] = useState(false);
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
                    setCollections(res.data.user[0].collections);
                    res.data.user[0].collections.map(col => setCategories(c => [...c, col.category]));
                })
                .catch(err => console.log(err));
        }
    }, [history, userId]);

    const handleCollection = text => e => setColData({...colData, [text]: e.target.value});
    const handlePasswords = text => e => setPassData({...passData, [text]: e.target.value});
    const handleSelect = e => setPassData({...passData, collector: e.target.value});

    const { name, website, category } = colData;
    const { email, password, collector } = passData;

    const toggleOpenPassword = (e) => {
        let colId = e.target.nextSibling.value;
        setOpenPassword(!openPassword);
        
        if(!openPassword) {
            axios.get(`/collections/${colId}`, config)
                .then(res => setPasswords(res.data))
                .catch(err => toast.error(err.response.data.error));
        }
    }

    const deleteCollection = e => {
        const passId = e.target.offsetParent.children[2].value;
        const removeParent = e.target.closest('div');
        axios.delete(`/collections/${passId}`, config)
            .then(res => {
                toast.success(res.data.message);
                removeParent.parentNode.removeChild(removeParent);
            })
            .catch(err => toast.error(err.response.data.error));
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
                .then(res => toast.success(res.data.message))
                .catch(err => toast.error(err.response.data.error))
        } else {
            toast.warn("Please fill all the information");
        }
    }

    const filterByCategories = e => {
        const clicked = e.target.innerText;
        const filtered = collections.filter(col => col.category === clicked);
        setFilter(filtered);
    }

    const resetFilter = () => setFilter(collections);

    const uniqueCat = [...new Set(categories)];

    return (
        <div className='flex'>
            <ToastContainer/>
            <Sidebar 
                reset={resetFilter}
                filter={filterByCategories}
                categories={uniqueCat} 
                user={user}
                loading={loading}
            />
            <Collections
                submitCollection={submitCollection} 
                submitPassword={submitPassword}
                handleCollection={handleCollection}
                handlePasswords={handlePasswords}
                handleSelect={handleSelect}
                deleteCollection={deleteCollection}
                toggleOpenPassword={toggleOpenPassword}
                collections={collections}
                filter={filter}
                loading={loading}
            />
            {openPassword && 
                <Passwords 
                    config={config}
                    toggle={() => setOpenPassword(false)}
                    passwords={passwords}
                />
            }
        </div>
    )
}

export default PasswordCollections

import React from 'react';
import { logout } from '../../../helper/auth';
import { useHistory } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar({categories, user}) {
    const history = useHistory();

    return (
        <div className='nav-flex'>
            <p className='nav-flex__name'>password collections</p>
            <p className='nav-flex__email'>{user.email}</p>
            <p className='nav-flex__id'>{user._id}</p>
            <div className='nav-flex__categories'>
                {categories.length ? 
                    categories.map((cat, i) => 
                        <button className='cat-button' key={i}>{cat}</button>) 
                            : 
                        <p>No Categories to display</p>
                }
            </div>
            <button className='nav-flex__signout' onClick={() => {
                logout(() => history.push('/'));
            }}>
                Signout
            </button>
        </div>
    )
}

export default Sidebar

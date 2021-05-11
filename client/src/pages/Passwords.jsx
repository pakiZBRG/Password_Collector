import React, {useEffect} from 'react';
import { isAuth } from '../helper/auth';
import { useHistory } from 'react-router-dom';

function Passwords() {
    const history = useHistory();

    useEffect(() => {
        if(!isAuth()) {
            history.push('/login');
        }
    }, [history]);
    
    return (
        <div>
            Passwords
        </div>
    )
}

export default Passwords

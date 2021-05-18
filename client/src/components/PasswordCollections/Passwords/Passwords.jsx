import React, { useState } from 'react';
import './Passwords.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';

function Passwords({toggle, passwords}) {
    const [hash, setHash] = useState('');
    const [copied, setCopied] = useState(false);

    const showPassword = e => {
        const prefix = process.env.REACT_APP_PREFIX;
        const sufix = process.env.REACT_APP_SUFIX;
        const M = process.env.REACT_APP_MOVE_M;
        const N = process.env.REACT_APP_MOVE_N;
        const pass = e.target.parentNode.previousSibling.firstChild;
        const hash = pass.value.substring(prefix, pass.value.length - sufix);

        const password = hash.split('');
        let i = password.length - 1;
        let asciiPass = [];
        // If the length is even
        if(i % 2 == 0){
            while(i > -1){
                const asciiChar = password[i].charCodeAt(0);
                i % 2 === 0 ? asciiPass.push(asciiChar - M) : asciiPass.push(asciiChar - N);
                i--;
            }
        // If the length is odd
        } else {
            while(i > -1){
                const asciiChar = password[i].charCodeAt(0);
                i % 2 === 0 ? asciiPass.push(asciiChar - N) : asciiPass.push(asciiChar - M);
                i--;
            }
        }
        
        let stringPass = [];
        asciiPass.forEach(p => stringPass.push(String.fromCharCode(p)));
        setHash(stringPass.join(''));

        pass.type === "password" ? pass.type = "text" : pass.type = "password";
    }

    const copyStatus = () => {
        setCopied(true);
        toast.success('Copied to clipboard');
    }

    return (
        <>
            <ToastContainer/>
            {passwords.collection && 
            <div className='password'>
                <div className='password-info'>
                    <h1>{passwords.collection.name}</h1>
                    <a target='blanc' href={`https://${passwords.collection.website}`}>{passwords.collection.website}</a>
                    <h3>{passwords.collection.category}</h3>
                </div>
                <div className='password-pass'>
                    <table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Email</td>
                                <td>Password</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        {!passwords.collection.passwords.length ? 
                            <p className='password-nopass'>No Passwords</p>
                                :
                            <tbody>
                                {passwords.collection.passwords.map((pass, i) => 
                                    <tr key={pass._id}>
                                        <td>{i+1}.</td>
                                        <td>{pass.email}</td>
                                        <td>
                                            <input id='password' type='password' value={pass.password} readOnly/>
                                            <CopyToClipboard
                                                text={hash}
                                                onCopy={copyStatus}
                                            >
                                                <i className='fa fa-copy icon'></i>
                                            </CopyToClipboard>
                                        </td>
                                        <td>
                                            <i onClick={showPassword} className='fa fa-eye icon'></i>
                                            <i className="fa fa-edit icon"> </i>
                                            <i className="fa fa-remove icon"></i>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        }
                    </table>
                </div>
                <span className='password-close' onClick={toggle}>&times;</span>
            </div>}
        </>
    )
}

export default Passwords

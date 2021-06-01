import React from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm/ResetPasswordForm';

function ResetPassword({match}) {
    return (
        <ResetPasswordForm token={match.params.token}/>
    )
}

export default ResetPassword

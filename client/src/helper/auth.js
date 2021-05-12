export const authenticate = res => {
    localStorage.setItem('user', res.data.user.id);
    localStorage.setItem('token', res.data.token);
}

export const logout = next => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    next();
}

export const isAuth = () => {
    const loggedUser = localStorage.getItem('user');
    if(loggedUser){
        return loggedUser;
    } else {
        return false;
    }
}
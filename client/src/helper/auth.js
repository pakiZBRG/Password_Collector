export const authenticate = res => {
    localStorage.setItem('user', res.data.user.id);
}

export const isAuth = () => {
    const loggedUser = localStorage.getItem('user');
    if(loggedUser){
        return loggedUser;
    } else {
        return false;
    }
}
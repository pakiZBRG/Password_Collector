export const authenticate = res => {
    localStorage.setItem('user', res.data.token);
}

export const isAuth = () => {
    const loggedUser = localStorage.getItem('user');
    if(loggedUser){
        return JSON.parse(loggedUser);
    } else {
        return false;
    }
}
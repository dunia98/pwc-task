import client from './Client';

class Auth{
    constructor(){
        this.authenticated = localStorage.getItem('token') ? true : false;
    }

    logout(cb){
        localStorage.removeItem('token');
        client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        cb();
    }

    handleErrors(error){
        console.log(error)
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();

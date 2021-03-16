import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Auth from '../_helpers/Auth';
import Client from '../_helpers/Client';


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function submit(e){
        e.preventDefault()
        setError('');

        if(!email && !password) return;

        Client.post('http://localhost:3001/users/login', {
            email: email,
            password: password
        }).then((res)=>{
            console.log(res);
            Client.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            localStorage.setItem('token', res.data.token);

            window.location = '/dashboard';
        }).catch((err) => {
            debugger
            console.log(err);
            if(err.response.data){
                setError(err.response.data.message)
            }
            
            localStorage.removeItem('token'); 
            setPassword('');
            setEmail('');
        })
    }

    function isAuthenticated () {
        return Auth.isAuthenticated() ? <Redirect from="/login" to="/dashboard" /> : null
    };

    return(
        <div className="App">
            {isAuthenticated()}
            <form className="form-signin pt-5" onSubmit={submit}>
                <h1>Complaints</h1>
                <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                {error && 
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input 
                    value={email} 
                    name="email" 
                    type="email"
                    className="form-control" 
                    placeholder="Email address" required="" 
                    autoFocus="" 
                    onChange={(e)=> setEmail(e.target.value)} 
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input 
                    value={password} 
                    name="password" 
                    type="password" 
                    id="inputPassword" 
                    className="form-control"
                    placeholder="Password" 
                    required=""
                    onChange={(e)=> setPassword(e.target.value)} 
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <div className="pt-5">
                    I don't have an account? <Link to="/signup">signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
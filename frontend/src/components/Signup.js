import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Auth from '../_helpers/Auth';
import Client from '../_helpers/Client';


function Signup(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [roles, setRoles] = useState('');
    const [error, setError] = useState('');

    function submit(e){
        e.preventDefault()
        setError('');

        if(!email && !password && name && roles) return;

        Client.post('http://localhost:3001/users/create', {
            email: email,
            password: password,
            roles: [roles],
            name: name
        }).then((res)=>{
            window.location = '/login';
        }).catch((err) => {
            debugger
            console.log(err);
            if(err.response.data){
                setError(err.response.data.message)
            }
            
            localStorage.removeItem('token'); 
            setPassword('');
            setEmail('');
            setRoles('');
            setName('');
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
                <h2 className="h3 mb-3 font-weight-normal">Create an account</h2>
                {error && 
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
                <label className="sr-only">Name</label>
                <input 
                    value={name} 
                    name="name" 
                    type="text"
                    className="form-control" 
                    placeholder="Name" required="" 
                    autoFocus="" 
                    onChange={(e)=> setName(e.target.value)} 
                />
                <label className="sr-only">Email address</label>
                <input 
                    value={email} 
                    name="email" 
                    type="email"
                    className="form-control" 
                    placeholder="Email address" required="" 
                    autoFocus="" 
                    onChange={(e)=> setEmail(e.target.value)} 
                />
                <label className="sr-only">Password</label>
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
                <label className="sr-only">Role</label>
                <select
                    value={roles} 
                    name="roles" 
                    type="text"
                    className="form-control"
                    placeholder="Role" 
                    required=""
                    onChange={(e)=> setRoles(e.target.value)} 
                >
                    <option value="">Please select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                <div className="pt-5">
                    Do you have an accaount? <Link to="/login">Log in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;
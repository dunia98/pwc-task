import React, { useState, useEffect } from 'react';
import { Link, Route, Router, Switch } from "react-router-dom";
import Auth from '../_helpers/Auth';
import Client from '../_helpers/Client';
import { ProtectedRoute } from '../_helpers/ProtectedRoute';
import Complaints from './Complaints';
import ComplaintsForm from './ComplaintsForm';

function Dashboard(){
    const [user, setUser] = useState(null);

    useEffect(()=> {
        Client.get('http://localhost:3001/users/me')
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <h1>Complaint Management Portal</h1>
            </Link>
  
            <ul className="navbar-nav ml-auto">
                {user &&
                    <li className="nav-item active">
                        <span className="nav-link">
                            Welcome {user.name}
                        </span>
                    </li>
                }
                <li className="nav-item">
                    <button className="btn btn-link" onClick={()=> Auth.logout(() => window.location = '/')}>Log out</button>
                </li>
            </ul>
        </nav>
        <div className="container pt-5">
            {user && 
                    <Switch>
                        
                        <ProtectedRoute exact path="/dashboard" component={Complaints} profile={user} />
                        <ProtectedRoute exact path="/dashboard/complaints/:id" component={ComplaintsForm} profile={user} view={true} />
                        {user.roles.includes('user') &&
                            <ProtectedRoute exact path="/dashboard/create" component={ComplaintsForm} profile={user} />
                        }
                        {user.roles.includes('admin') &&
                            <ProtectedRoute exact path="/dashboard/complaints/edit/:id" component={ComplaintsForm} profile={user} />
                        }
                        
                        <Route path="/dashboard/*" component={() => {
                            return(
                            <div className="text-center">
                                <h1>404</h1>
                                NOT FOUND<br />
                                <Link to="/">Back</Link>
                            </div>
                            )
                        }} />
                        
                    </Switch>
            }
        </div>
        
        </>
    )
}

export default Dashboard;
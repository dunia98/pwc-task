import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Client from '../_helpers/Client';

function Complaints({profile}){
    const [complaints, setComplaints] = useState([])
    useEffect(()=> {
        Client.get('http://localhost:3001/complaints')
        .then((res) => {
            setComplaints(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return(
        <div className="row">
            {profile.roles.includes('user') && 
                <div className="col-12 pb-5">
                    <Link to="/dashboard/create" class="btn btn-primary">Create Complaint</Link>
                </div>
            }
            
            <div className="col-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((item, i) => {
                            return(
                                <tr key={i}>
                                    <th scope="row">{item._id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.userId}</td>
                                    <td>
                                        {item.status.toString() === 'pending' && 
                                            <span className="badge badge-primary">{item.status}</span>
                                        }
                                        {item.status.toString() === 'resolved' && 
                                            <span className="badge badge-success">{item.status}</span>
                                        }
                                        {item.status.toString() === 'dismissed' && 
                                            <span className="badge badge-danger">{item.status}</span>
                                        }
                                    </td>
                                    <td>
                                        {profile.roles.includes('admin') && 
                                            <Link to={`/dashboard/complaints/edit/${item._id}`} class="btn btn-primary">Edit</Link>
                                        }
                                        <Link to={`/dashboard/complaints/${item._id}`} class="btn btn-secondary">View</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Complaints;
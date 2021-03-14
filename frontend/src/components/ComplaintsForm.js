import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Client from "../_helpers/Client";

function ComplaintsForm({match, history, profile, view}){
    console.log(match)
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    useEffect(()=>{
        if(view || match.params.id ){
            Client.get(`http://localhost:3001/complaints/${match.params.id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setStatus(res.data.status)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [])
    function submit(e){
        e.preventDefault()
        setError('');
        if(view) return;
        if(profile.roles.includes('admin')){
            if(!status) return;
            
            Client.put(`http://localhost:3001/complaints/update/${match.params.id}`, {
                status: status
            }).then((res)=>{
                console.log(res);
                history.push('/dashboard')
            }).catch((err) => {
                
                console.log(err);
                if(err.response.data){
                    setError(err.response.data.message)
                }
                
                setStatus('');
            })
        }
        else{
            if(!title && !description) return;

            Client.post('http://localhost:3001/complaints/create', {
                title: title,
                description: description
            }).then((res)=>{
                console.log(res);
                history.push(`/dashboard/complaints/${res.data._id}`)
                
            }).catch((err) => {
                
                console.log(err);
                if(err.response.data){
                    setError(err.response.data.message)
                }
                
                setTitle('');
                setDescription('');
            })
        }
        
    }

    return(
        <div className="App">
            <div class="form-group">
            <form className="form-createComplaint pt-5" onSubmit={submit}>

                <h1>{profile.roles.includes('admin') ? 'Update' : 'Create'} Complaints</h1>

                <label htmlFor="inputTitle" className="sr-only">Title</label>
                <input 
                    value={title} 
                    name="Title" 
                    type="text" 
                    id="inputTitle" 
                    className="form-control"
                    placeholder="Title" 
                    required=""
                    disabled={profile.roles.includes('admin') || view}
                    onChange={(e)=> setTitle(e.target.value)}
               
                />

                <label htmlFor="exampleFormControlTextarea1" className="sr-only">Description</label>
                <textarea 
                 class="form-control"
                 id="exampleFormControlTextarea1" 
                 required=""
                 rows="3"
                 placeholder="your complaint"
                 disabled={profile.roles.includes('admin') || view}
                 onChange={(e)=> setDescription(e.target.value)}
                 value={description}
                 >
                 </textarea>
                {(profile.roles.includes('admin') && !view) &&
                    <fieldset class="form-group row">
                    <legend class="col-form-label col-sm-2 float-sm-left pt-0">choose status</legend>
                    <div class="col-sm-10">
                         <div class="form-check">
                             <input class="form-check-input" type="radio" name="status" id="resolved" value="resolved" onChange={(e)=> setStatus(e.target.value)}/>
                             <label class="form-check-label" htmlFor="resolved">
                             Resolved
                             </label>
                         </div>
                             <div class="form-check">
                             <input class="form-check-input" type="radio" name="status" id="pending" value="pending" onChange={(e)=> setStatus(e.target.value)}/>
                             <label class="form-check-label" htmlFor="pending">
                             Pending
                             </label>
                         </div>
                         <div class="form-check ">
                             <input class="form-check-input" type="radio" name="status" id="dismissed" value="dismissed" onChange={(e)=> setStatus(e.target.value)} />
                             <label class="form-check-label" htmlFor="dismissed">
                             Dismissed
                             </label>
                         </div>
                     </div>
                      
                     </fieldset> 
                }
                <div className="text-center mt-5">
                        {!view && 
                        <button className="btn btn-primary mr-3" type="submit">{profile.roles.includes('admin') ? 'Update' : 'Create'}</button>
                        }
                    <Link to="/dashboard" class="btn btn-secondary">back</Link>
                </div>
                
            </form>
        </div>
        </div>
      
      
    )
}

export default ComplaintsForm;
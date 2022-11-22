import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DeleteAgent = () => {
    const [Agents, setAgents] = useState([]);
   
    useEffect(()=>{
        fetch('https://urban-estate-server.onrender.com/allAgent')
        .then(res => res.json())
        .then(data => setAgents(data))
    },[Agents.length])

    const handleDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {              
              fetch(`https://urban-estate-server.onrender.com/Agent/${id}`,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data =>{
                if (data.deletedCount>0){
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                      const remaining = Agents.filter(order => order._id !== id)
                      setAgents(remaining)
                }
            })
            }
          });
     
         }
    return (
        <div >
            <h1>Delete Properties here {Agents?.length} </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                            <th scope="col">#</th>
                            <th scope="col">Agent Name</th>
                             
                            <th scope="col">Location</th> 
                            <th scope="col">Action</th>                    
                        </tr>
                    </thead>
                <tbody>
                    {
                    Agents.map(Agent => (
                            <tr key={Agent._id}>
                                <th scope="row">#</th>
                                    <td><h3>{Agent?.name}</h3></td>
                                    <td>{Agent?.location}</td>
                                    
                                    <td><button className="btn btn-danger" onClick={()=>handleDelete(Agent?._id)}>Delete</button></td>
                            </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DeleteAgent;
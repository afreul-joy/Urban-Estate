import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DeleteProperties = () => {
    const [Properties, setProperties] = useState([]);
   
    useEffect(()=>{
        fetch('https://urban-estate-server.onrender.com/allProperties')
        .then(res => res.json())
        .then(data => setProperties(data))
    },[Properties.length])

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
              fetch(`https://urban-estate-server.onrender.com/property/${id}`,{
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
                      const remaining = Properties.filter(order => order._id !== id)
                      setProperties(remaining)
                }
            })
            }
          });
     
         }




    return (
        <div >
            <h1>Delete Properties here {Properties?.length} </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                            <th scope="col">#</th>
                            <th scope="col">Property Name</th>
                            <th scope="col">Location</th> 
                            <th scope="col">Price</th> 
                            <th scope="col">Action</th>                    
                        </tr>
                    </thead>
                <tbody>
                    {
                    Properties.map(property => (
                            <tr key={property._id}>
                                <th scope="row">#</th>
                                    <td><h3>{property?.name}</h3></td>
                                    <td>{property?.location}</td>
                                    <td>{property?.price}</td>
                                    <td><button className="btn btn-danger" onClick={()=>handleDelete(property?._id)}>Delete</button></td>
                            </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DeleteProperties;

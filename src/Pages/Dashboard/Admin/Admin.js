import React, { useState } from 'react';
import Swal from 'sweetalert2';
import "./Admin.css"

const Admin = () => {
    const [email,setEmail] = useState('');
    const [adminAdded, setAdminAdded] = useState(false);

    const handleSubmit = e =>{ 

        Swal.fire({
            title: 'Do you want to make admin?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')

              const user = {email} ;      
              fetch('https://urban-estate-server.onrender.com/users/admin',{
                  method: 'PUT',
                  headers:{
                      'content-type': 'application/json'
                  },
                  body: JSON.stringify(user)              
                               
              })
              .then(res => res.json())
              .then(data => {
                  if(data.modifiedCount){
                  console.log(data)
                  setAdminAdded(true);
                  setEmail("")
                  }
              })

            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
          e.target.value=""
        e.preventDefault();
    };

    const handleEmail = e =>{
        setEmail(e.target.value);
        if(adminAdded){
        e.target.value =""
        }
        console.log(email);
        };
    return (
        <div className='mt-5'>
             <div>
            <h1>Make An Admin Here</h1> <hr />
            <form onSubmit={handleSubmit} >
            <input className="input-field" onChange={handleEmail} type="Email" placeholder="Email" />
            
            <div className="wrap">
            <input className="submit-btn" type="submit" value="Submit" />
            </div>
            </form>
            <br />
            <br />
            {
                adminAdded
                &&
                <div className="alert alert-success" role="alert">
                Admin Made Successfully
               </div>
            }
        </div>
        </div>
    );
};

export default Admin;
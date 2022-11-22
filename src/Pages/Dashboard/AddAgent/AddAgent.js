import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddAgent = () => {
    const { register, handleSubmit,reset } = useForm();
    const onSubmit = data => {
        Swal.fire({
            title: 'Do you want add this?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
              fetch('https://urban-estate-server.onrender.com/agent',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)              
                        
        })
        .then(reset())
        .then(console.log(data));
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
       
       
      }
    return (
        <div className="">
            <h1>Add Agent Here</h1> <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-box">
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Full Name"/>
                <br />

                <input {...register("location")} placeholder="Location"/><br />
                <input {...register("img")} placeholder="Image Link" /><br />

                <input {...register("phone")} placeholder="Phone Number" />
                <br />
                <input {...register("mail")} placeholder="E-mail" />
                <br />
                <input className="submit-btn" type="submit"  value="Submit"/>
                </div>
            </form>
        </div>
    );
};

export default AddAgent;
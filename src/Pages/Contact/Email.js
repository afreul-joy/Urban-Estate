import React, { useEffect } from 'react';
import "./Contact.css"
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';


const email = () => {

   

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_zbl7fmb', 'template_1eutcvy', e.target, 'user_sBHy8cv8wR3p5I6TnGNip')
        .then((result) => {
        console.log(result.text);
        Swal.fire(
            'Thanks!',
            'Mail submitted successfully!!!',
            'success'
          )
          e.target.reset();
    }, (error) => {
        console.log(error.text);
        });
        
        e.target.reset();      
        
    }
    return (
            
                
                <div className="email">            
                    <div className="">
                        <h2 className="text-center">Send <span className=''>
                        Us Email</span></h2>
                        <hr />
                        <div className='email-from' >
                        <form onSubmit={sendEmail}>
                        <div className="row pt-5 mx-auto">
                        <div className="col-8 from-group mx-auto">
                        <input type="text"  className="from-control p-1 input-box" placeholder="Name"  name="name" required="true"/>
                        </div>
                        <div className="col-8 from-group pt-2  mx-auto ">
                        <input type="email"  className="p-1 from-control input-box" placeholder="Your email"  name="email" required="true"/>
                        </div>
                        <div className="col-8 from-group pt-2 mx-auto ">
                        <input   type="text" className="from-control input-box p-2" placeholder="Subject"  name="subject" required="true"/>
                        </div>
                        <div className="col-8 from-group pt-2 mx-auto">
                        <textarea  className="from-control p-2" placeholder="Message" name="message" cols="30" rows="10" required="true">

                        </textarea>
                        </div>
                        <div  className="col-8 pt-3 mx-auto ">
                        <input type="submit" className="ps-5 pe-5 submit-btn" value="Send" />
                        </div>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            
       
  
    );
};

export default email;
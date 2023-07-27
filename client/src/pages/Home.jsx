import React, { useState } from 'react';
import './home.css';
import { Link , useNavigate} from 'react-router-dom';
// import GoTypography from 'react-icons/go';

export default function Home() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        // console.log("pressed");
        navigate('/complain');
    };

    return (
        <div className='homeContainer'>
            <div className="Box">
               <div className="box1">
                   <h2>About Us</h2>
               </div>
               <div className="box2">
               <span>Problem we are trying to solve:<br/></span>
               <span><p>With increasing populations, changing policy requirements, new sustainability and recycling goals and improved technology   departments, municipalities across the globe are joining the “smart cities” movement to become more efficient in managing solid waste.</p>
               <p>Thus, the improvement of the urban waste collection service and, in general, the achievement of a more efficient management of the  waste, is one of the main challenges that the cities face, especially due to the population growth. Thus, smart waste management is  a key factor of smart cities.</p>
               
               Therefore, we plan to design a smart waste collection system that allows citizens to segregate the various types of solid waste     they want to dispose of and the municipal authorities to efficiently collect the same.
               </span>
               </div>
               <div className="box3">
                <button
                className="complainBtn"
                 onClick={handleClick}
                >
                  File a complaint
                </button>
                 {/* <Link to='/complain' variant="body2">
				      File a complaint
		         </Link> */}
               </div>



                
            </div>
            
        </div>
    )
}


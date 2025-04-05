import React, { useState } from 'react'

import axios from 'axios'


/*

📌🚩  THIS IS TESTING PURPOSE COMPONENT ❌❌
📌🚩  DONT USE FOR PROJECT FUNCTIONALITIES ❌❌


*/



const csrfToken=document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const TestForm=()=>{
    const[cityName, setCityName]=useState('');
    // const[role,setRole]=useState('');

    console.log("your csrf: ",csrfToken);

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const response =await axios.post(
                '/api/city',
              
                {
                name:cityName,
               },
             
               
            
            );
            console.log('Data sent Successfully :',response.data);
        }catch(error){
            console.error('Error sending Data: ',error);
        }


    };


  return (
    <div>

<form onSubmit={handleSubmit}>
      <label>
        City Name:
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>

    </div>
  );

};
export default TestForm
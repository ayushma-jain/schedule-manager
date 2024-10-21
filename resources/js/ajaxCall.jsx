import axios from 'axios';
import React from 'react'

const ajaxCall = async (url,method='GET',data={},headers={}) => {
    try{
        //Get CSRF token from meta tag.
       const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

       //Prepare a ajax request data with csrf token.
       const config = {
        method : method,
        url: url,
        data :data,
        headers :{
            'Content-type' :'application/json',
            'X-CSRF-TOKEN' : csrfToken, //Laravel CSRF Token
            ...headers //Additional custom header if needed
        }
       }
       //Send a request to axios
       const response = await axios(config);

       //Return response data.
       return response.data;
    }catch(error){
        console.log("Error in ajax call",error);
        throw error;
    }
  
}

export default ajaxCall

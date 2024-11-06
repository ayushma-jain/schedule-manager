import axios from 'axios';
import { toast } from 'react-toastify';

const ajaxCall = async (url,method='GET',data={},headers={},displayToast='') => {
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
       
       if(displayToast === 'showMessage'){
            if(response.status===200){
                console.log(response.data)
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000, 
                });
            }else{
                toast.error(response.data.message, {
                position: "top-right",
                autoClose: 3000, 
                });
            }
       }
       
       
       return response.data;
    }catch(error){
        toast.error('error', {
            position: "top-right",
            autoClose: 3000, 
        });
        throw error;
    }
  
}

export default ajaxCall

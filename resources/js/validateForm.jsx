import React from 'react'

const validateForm = (event) => {
    try{
        event.preventDefault(); // Prevent page reload
        const form = event.target; // Get the form element
        const formElements = form.elements; // Get all form elements// Create FormData object
        // Create an array to store the form elements' names and types
        const elementsInfo = [];

        // Loop through each form element
        for (let element of formElements) {
            if (element.name && element.tagName.toLowerCase() !== 'fieldset') {
                elementsInfo.push({
                name: element.name,
                type: element.tagName.toLowerCase(), // Get tagName (e.g., input, select, textarea)
                inputType: element.type // Get input type (e.g., text, email, password for input elements)
                });
                // if(!element.value){
                //     formErrors.element.name = element.placeholder+" is required";
                // }
                // if(element.type == 'email'){
                //     formErrors.element.name = "Email is required";
                // }

                

            }
        }
        return formErrors;
    }catch(error){
        console.log("Error in form validation");
    }
}

export default validateForm

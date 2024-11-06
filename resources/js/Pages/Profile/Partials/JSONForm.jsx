import ajaxCall from '@/ajaxCall';
import InputLabel from '@/Components/InputLabel';
import Select from '@/Components/Select';
import SuccessButton from '@/Components/SuccessButton';
import TextInput from '@/Components/TextInput';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JSONForm = ({formJson,formId}) => {
    console.log(formJson);
    const [formFields,setFormFields] =  useState([]);
    const [formDetails, setFormDetails] =  useState([]);
    const navigate = useNavigate();
    //const jsonArray = JSON.parse(formJson);
    const jsonArray = formJson;
   
    const handleRedirect = (formId) => {
        navigate('/generate-form/'+formId);  // Redirect to the '/about' route
      };
      const getKeyValues = (arr,key) => {
        console.log(arr.map(item => item[key]).filter(value => value !== undefined));
        return arr.map(item => item[key]).filter(value => value !== undefined);
      }
    const handleInputChange = (field,value) =>{
        setFormDetails({
        ...formDetails,
        [field]: value,
        });
    }
    const renderField = (field) => {
        let fieldId = field.field_name.replace(" ", "_").toLowerCase();
        switch(formFields[field.field_type]){
            
            case 'Input':
                return (
                    <div key={field.id}>
                        <InputLabel htmlFor={fieldId} value={field.field_name}/>
                        <TextInput
                            id={fieldId}
                            type="text"
                            value={formDetails.field_name}
                            name={field.field_id}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder={`Enter ${field.field_name}`}
                            onChange = {(e)=>handleInputChange(fieldId, e.target.value)}
                    />
                    </div>
                );
            case 'Date':
                return (
                    <div key={field.id}>
                        <InputLabel htmlFor={fieldId} value={field.field_name}/>
                        <TextInput
                            id={fieldId}
                            type="date"
                            value={formDetails.field_name}
                            name={field.field_id}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder={`Enter ${field.field_name}`}
                            onChange = {(e)=>handleInputChange(fieldId, e.target.value)}
                    />
                    </div>
                );
            case 'Select':
                return (
                    <div key={field.id}>
                        <InputLabel htmlFor={fieldId} value={field.field_name}/>
                        <Select id={fieldId} options = {field.options}  name={field.field_id}   className="w-full"
                        onChange = {(e)=>handleInputChange(fieldId, e.target.value)}
                        value={formDetails.field_name}/>
                    </div>
                );
            case 'TextArea':
                    return (
                        <div key={field.id}>
                           <InputLabel htmlFor={fieldId} value={field.field_name}/>
                            <textarea
                                id={fieldId}
                                value={formDetails.field_name}
                                className='w-full'
                                onChange = {(e)=>handleInputChange(fieldId, e.target.value)}
                            />
                        </div>
                    );
            case 'Number':
            case 'Price':
                return (
                <div key={field.id}>
                        <InputLabel htmlFor={fieldId} value={field.field_name}/>
                        <TextInput
                            id={fieldId}
                            type="Number"
                            name={field.field_id}
                            value={formDetails.field_name}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder={`Enter ${field.field_name}`}
                            onChange = {(e)=>handleInputChange(fieldId, e.target.value)}
                    />
                    </div>
                );
            default:
                return null;
        }
    }

    useEffect (() => {
        async function fetchFormFields() {
            const response = await ajaxCall('/get-form-fields','GET');
            setFormFields(response.data);
        }
        fetchFormFields();
    },[])

    const handleSaveRecords = async(e) => {
        e.preventDefault();  // Prevent form reload
  
        // Combine formData and action/action_type into one object
        const formPayload = {
            form_id: formId,
            form_json: formDetails,
           
        };
        //console.log(formPayload);return false;
        const response = await ajaxCall('/save-form-details','POST',formPayload);
        setFormData([]);
    }
    return (
        <div className="container mx-auto mt-10">
        <form>
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-12 mb-5">
                   <SuccessButton className="ms-3 float-right" onClick={()=>handleRedirect(formId)}>
                       Edit Form
                   </SuccessButton>
               </div>
               
                    {
                        (
                            jsonArray && jsonArray.length>0 ? ( 
                                jsonArray.map((field,index)=>(
                                    <div key={`field_${index}`} className="col-span-6">
                                        {renderField(field)}
                                    </div>
                                ))
                            ) 
                                :
                            (
                                <></>
                            )
                        )
                    }
                <div className="col-span-12 mb-5">
                    <SuccessButton className="ms-3 float-right" onClick={handleSaveRecords}>
                        Save
                    </SuccessButton>
                </div>
            </div>
      </form>
    </div>
    )
}

export default JSONForm

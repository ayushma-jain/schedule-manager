import ajaxCall from '@/ajaxCall';
import InputLabel from '@/Components/InputLabel';
import SuccessButton from '@/Components/SuccessButton';
import TextInput from '@/Components/TextInput';
import React, { useEffect, useState } from 'react'

const JSONForm = ({formJson}) => {
    const [formFields,setFormFields] =  useState([])
    const jsonArray = JSON.parse(formJson);
    const renderField = (field) => {
        
        switch(formFields[field.field_type]){
            case 'Input':
                return (
                    <div key={field.id}>
                        <InputLabel htmlFor={field.field_id} value={field.field_name}/>
                        <TextInput
                            id={field.field_id}
                            type="text"
                            name={field.field_id}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder={`Enter ${field.field_name}`}
                    />
                    </div>
                );
            case 'Date':
                return (
                    <div key={field.id}>
                        <InputLabel htmlFor={field.field_id} value={field.field_name}/>
                        <TextInput
                            id={field.field_id}
                            type="date"
                            name={field.field_id}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder={`Enter ${field.field_name}`}
                    />
                    </div>
                );
            case 'Select':
                return (
                    <div key={field.id}>
                        <InputLabel htmlFor={field.field_id} value={field.field_name}/>
                        {/* <Select options = {field.options}  name={field.field_id} /> */}
                    </div>
                );
                case 'TextArea':
                    return (
                        <div key={field.id}>
                           <InputLabel htmlFor={field.field_id} value={field.field_name}/>
                            <textarea
                                value=""
                                className='w-full'
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            />
                        </div>
                    );
            default:
                return null;
        }
    }

    useEffect (() => {
        async function fetchFormFields() {
            const response = await ajaxCall('get-form-fields','GET');
            setFormFields(response.data);

        }
        fetchFormFields();
    },[])
    return (
        <div className="container mx-auto mt-10">
        <form>
            <div className="grid grid-cols-12 gap-4 mx-auto">
               
                    {
                        (
                            jsonArray && jsonArray.length>0 ? ( 
                                jsonArray.map((field)=>(
                                    <div className="col-span-12">
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
                   
                    <SuccessButton className="ms-3 float-right">
                        Save
                    </SuccessButton>
                </div>
            </div>
      </form>

      <div className='mt-5'>
        {/* <Table disaplayData={displayData}/> */}
      </div>
    </div>
    )
}

export default JSONForm

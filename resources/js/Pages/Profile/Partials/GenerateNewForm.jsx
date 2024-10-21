import ajaxCall from '@/ajaxCall'
import DangerButton from '@/Components/DangerButton'
import InfoSection from '@/Components/InfoSection'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import Select from '@/Components/Select'
import SuccessButton from '@/Components/SuccessButton'
import TextInput from '@/Components/TextInput'
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";

const GenerateNewForm = ({userActions,formfields,formDetails}) => {
    
    const defaultFormData = (formDetails != undefined && formDetails != '') ? JSON.parse(formDetails.form_json) :[];
    const formId = (formDetails != undefined && formDetails != '') ? formDetails.id :'';
    const action_type = (formDetails != undefined && formDetails != '') ? formDetails.action_type_id :'';
    const action = (formDetails != undefined && formDetails != '') ? formDetails.action :'';

    const [formData, setFormData] = useState(defaultFormData);
    const [actionType , setActionType] =  useState([]);
    let updatedFormData=[];
   
    const [data, setData] = useState({
        action: action,
        action_type: action_type
    });
   
    const addNewForm = (e) => {
        e.preventDefault();
    };
    const addNewFieldRow = (event) => {
        setFormData([
            ...formData,
            {'field_name': '','field_type':'','options':[]}
        ]); 
    }
    const addNewOption = (index,value) => {
        updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            'options': [
                ...updatedFormData[index].options,
                {value: '', index: '' }
            ]
        }
       
        setFormData(updatedFormData);
    }
    const handleOptinChange = (index,key,value) => {
        updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            options: updatedFormData[index].options.map((option, k) =>
                k === key ? { ...option, value: value,index: value.replace(" ", "_").toLowerCase() } : option
            )
        }
        setFormData(updatedFormData);
    }

    const deleteOption =(index,optionIndex) =>{
        const newFormData = [...formData];
        newFormData[index].options.splice(optionIndex, 1);
        setFormData(newFormData);
    }

    const handleFieldChange = (index, field, value,event) =>{
        if(event.target.type === 'select-one'){
            const selectedOptionText = event.target.selectedOptions[0].text;
          
            if(selectedOptionText === 'Select'){
                addNewOption(index);
            }else{
                updatedFormData = [...formData];
                updatedFormData[index] = {
                    ...updatedFormData[index],
                    'options': []
                }
            }
            const newFormData = [...updatedFormData];
            newFormData[index][field] = value;
            setFormData(newFormData);
        }else{
            const newFormData = [...formData];
            newFormData[index][field] = value;
            setFormData(newFormData);
        }
        
    }
    // Function to handle input change for action and action_type
    const handleInputChange = async (field, value) => {
        if(field === 'action'){
            const response = await ajaxCall('/get-action-type/'+value,'GET')
            setActionType(response.data);
        }
        setData({
        ...data,
        [field]: value,
        });
    };
     // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form reload
  
        // Combine formData and action/action_type into one object
        const formPayload = {
            form_id: formId,
            action: data.action,
            action_type: data.action_type,
            fields: formData,
        };
        
        const response = await ajaxCall('/create-form','POST',formPayload);
        setFormData([]);
    };

  return (
    <div>
        <form onSubmit={addNewForm}>
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-5">
                    <InputLabel htmlFor="action"  value="Action" />
                    <Select options = {userActions} isFocused={true} name="action" value={data.action}
                    onChange={(e) => handleInputChange('action', e.target.value)}/>
                    
                </div>
                <div className="col-span-5">
                    <InputLabel htmlFor="action_type"  value="Action Type" />
                    <Select options = {actionType} value={data.action_type} name="action_type" onChange={(e) => handleInputChange('action_type', e.target.value)}/>
                </div>
                <div className="col-span-2 mt-4">
                    <PrimaryButton className="ms-3 w-full" onClick={addNewFieldRow}>
                        Add Field
                    </PrimaryButton>
                </div>
            </div>
           
            {
                (formData && formData.length>0 ? (
                    formData.map((value,index)=>(
                        <div key={index+1} id={index+1} className="grid grid-cols-12 gap-4 mx-auto mt-5" >
                            <div className="col-span-3">
                                <InputLabel htmlFor={`field_name_${index+1}`}  value="Field Name" />
                                <TextInput
                                    id={`field_name_${index+1}`}
                                    type="text"
                                    name={`field_name_${index+1}`}
                                    className="mt-1 block w-full"
                                    isFocused
                                    value={value.field_name}
                                    onChange={(e) => handleFieldChange(index, 'field_name', e.target.value,e)}
                                    placeholder="Enter Field Name"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor={`field_type_${index+1}`}  value="Field Type" />
                                <Select 
                                    options = {formfields} 
                                    id={`field_type_${index+1}`} 
                                    name={`field_type_${index+1}`} 
                                    value={value.field_type}
                                    onChange={(e) => handleFieldChange(index, 'field_type', e.target.value,e)}
                                />
                                
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor={`field_type_${index+1}`}  value="Validation Rules" />
                                <Select 
                                    options = {formfields} 
                                    id={`field_type_${index+1}`} 
                                    name={`field_type_${index+1}`} 
                                    value={value.field_type}
                                    onChange={(e) => handleFieldChange(index, 'field_type', e.target.value,e)}
                                />
                                
                            </div>
                            <div className="col-span-2 mt-4">
                                <PrimaryButton className="ms-3" onClick={addNewFieldRow}>
                                    <IoMdAdd className='text-lg'/>
                                </PrimaryButton>
                                <DangerButton className="ms-3">
                                    <MdOutlineDeleteOutline className='text-lg'/>
                                </DangerButton>
                            </div>
                            <div className="col-span-3 mt-4">
                               <InfoSection></InfoSection>
                            </div>
                            <div className='col-span-12'>
                                <div className='grid grid-cols-12 gap-4 mx-auto '>
                                    {value.options && value.options.length > 0 && value.options.map((inputField,key) => (
                                        <div className='col-span-5'>
                                            <div key={key} id={key} className="mt-4">
                                                <TextInput
                                                    id="option"
                                                    type="text"
                                                    name={`option_${index+1}_${key+1}`} 
                                                    value={
                                                        inputField.value
                                                    }
                                                    isFocused
                                                    placeholder={inputField.placeholder}
                                                    onChange={(e) => handleOptinChange(index,key,e.target.value,e)}
                                                />
                                                <SuccessButton className="ms-3">
                                                    <IoMdAdd className='text-lg' onClick={() => addNewOption(index)} />
                                                </SuccessButton>
                                                <DangerButton className="ms-3">
                                                    <MdOutlineDeleteOutline className='text-lg' onClick={() => deleteOption(index,key)} />
                                                </DangerButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                    
                ) : (
                    <></>
                ) )
            }
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-12 mt-4">
                    <SuccessButton className="ms-3 float-right" onClick={handleSubmit}>
                        Create Form
                    </SuccessButton>
                    <PrimaryButton className="ms-3 float-right" onClick={handleSubmit}>
                        Priview Form
                    </PrimaryButton>
                </div>
            </div>
        </form>
    </div>
  )
}
export default GenerateNewForm

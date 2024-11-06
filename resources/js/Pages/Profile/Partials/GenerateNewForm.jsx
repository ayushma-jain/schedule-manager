import ajaxCall from '@/ajaxCall'
import DangerButton from '@/Components/DangerButton'
import InfoSection from '@/Components/InfoSection'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import Select from '@/Components/Select'
import SuccessButton from '@/Components/SuccessButton'
import TextInput from '@/Components/TextInput'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ModalJsonForm from './ModalJsonForm'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'



const GenerateNewForm = ({userActions,formfields,formDetails}) => {
   
    const defaultFormData = (formDetails != undefined && formDetails != '') ? JSON.parse(formDetails.form_json) :[];
    const formId = (formDetails != undefined && formDetails != '') ? formDetails.id :'';
    const action_type = (formDetails != undefined && formDetails != '') ? formDetails.action_type_id :'';
    const action = (formDetails != undefined && formDetails != '') ? formDetails.user_action.id :'';
    const [CalculationForm, setCalculationFrom] = useState([]);

    const [formData, setFormData] = useState(defaultFormData);
    const [actionType , setActionType] =  useState([]);
    const [isFormModalOpen,setIsFormModalOpen] = useState(false);
    const [validationRules , setValidationRules] = useState([]);
   
    const openJsonFormModal = (e) => {
       e.preventDefault();
      setIsFormModalOpen(true);
    };
    let updatedFormData=[];
   
    useEffect(()=>{
        if(action !== ''){
            handleInputChange('action',action);
        }
       
    },[])
    const [data, setData] = useState({
        action: action,
        action_type: action_type
    });
   
   

    const addNewFieldRow = (e) => {
        e.preventDefault();
        setFormData([
            ...formData,
            {id:formData.length+1,'field_name': '','field_type':'','options':[]}
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

    const handleFieldChange = async(index, field, value,event) =>{
        let slug = '';
       
        if(field == 'is_allowed'){
            value = event.target.checked;
        }
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
            newFormData[index]['id']= index+1;
            newFormData[index][field] = value;
            if(field == 'field_name'){                  
                slug = value.replace(/([a-z])([A-Z])/g, '$1_$2').trim().toLowerCase().replace(/\s+/g, '_');
                newFormData[index]['slug']= slug;
            }
            setFormData(newFormData);
        }else{
            const newFormData = [...formData];
            newFormData[index]['id']= index+1;
            newFormData[index][field] = value;
            if(field == 'field_name'){                  
                slug = value.replace(/([a-z])([A-Z])/g, '$1_$2').trim().toLowerCase().replace(/\s+/g, '_');
                newFormData[index]['slug']= slug;
            }
            setFormData(newFormData);
        }
    }

    // Function to handle input change for action and action_type
    const handleInputChange = async (field, value) => {
        if(field === 'action'){
            setFormData([]);
            const response = await ajaxCall('/get-action-type/'+value,'GET')
            setActionType(response.data);
        }
        if(field === 'action_type'){
            const response = await ajaxCall('/get-form-json/'+value,'GET');

            const responseJson =(response.data != undefined && response.data != '') ? JSON.parse(response.data.form_json) :[];
            setFormData(responseJson);
        }
        setData({
        ...data,
        [field]: value
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

        const response = await ajaxCall('/create-form','POST',formPayload,{},'showMessage');
        
        //setFormData([]);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
         const updatedRows = Array.from(formData);
         const [reorderedRow] = updatedRows.splice(result.source.index, 1);
         updatedRows.splice(result.destination.index, 0, reorderedRow);
         setFormData(updatedRows);
      };
  return (
    <div>
        <form >
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-5">
                    <InputLabel htmlFor="action"  value="Action"  />
                    <Select className="w-full" options = {userActions} isFocused={true} name="action" value={data.action}
                    onChange={(e) => handleInputChange('action', e.target.value)}/>
                    
                </div>
                <div className="col-span-5">
                    <InputLabel htmlFor="action_type"  value="Action Type" />
                    <Select className="w-full" options = {actionType} value={data.action_type} name="action_type" onChange={(e) => handleInputChange('action_type', e.target.value)}/>
                </div>
                <div className="col-span-2 mt-4">
                    <SuccessButton className="ms-3 w-full" onClick={(e)=>addNewFieldRow(e)}>
                        Add Field
                    </SuccessButton>
                </div>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-table">
                {(provided) => (
                    <table
                        className="min-w-full bg-white border border-gray-200 mt-6"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ width: "100%", border: "1px solid black" }}
                    >
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left"></th>
                                <th className="py-3 px-6 text-left">Field Name</th>
                                <th className="py-3 px-6 text-left">Field Type</th>
                                <th className="py-3 px-6 text-center">Validation Rules</th>
                                <th className="py-3 px-6 text-center">Information</th>
                                <th className="py-3 px-6 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 text-sm font-light">
                            {formData && formData.length > 0 ? (
                                formData.map((row, index) => (
                                    <Draggable key={row.id.toString()} draggableId={row.id.toString()} index={index}>
                                        {(provided) => (
                                            <React.Fragment>
                                                <tr
                                                    className="border-b border-gray-200 hover:bg-gray-100"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{ ...provided.draggableProps.style, border: "1px solid gray" }}
                                                >
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <TextInput
                                                           name={`is_allowed_${index + 1}`}
                                                            id={`is_allowed_${index + 1}`}
                                                            type="checkbox"
                                                            className="ms-3"
                                                            checked={row.is_allowed}
                                                            onChange={(e) => handleFieldChange(index, 'is_allowed', e.target.value,e)}
                                                        />
                                                    </td>
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        
                                                        <TextInput
                                                            id={`field_name_${index + 1}`}
                                                            type="text"
                                                            name={`field_name_${index + 1}`}
                                                            className="block w-full"
                                                            value={row.field_name}
                                                            onChange={(e) => handleFieldChange(index, 'field_name', e.target.value,e)}
                                                            placeholder="Enter Field Name"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <Select
                                                            className="w-full"
                                                            options={formfields}
                                                            id={`field_type_${index + 1}`}
                                                            name={`field_type_${index + 1}`}
                                                            value={row.field_type}
                                                            onChange={(e) => handleFieldChange(index, 'field_type', e.target.value,e)}
                                                        />
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <Select
                                                            className="w-full"
                                                            options={formfields[0].validation_rules}
                                                            id={`validation_rules_${index + 1}`}
                                                            name={`validation_rules_${index + 1}`}
                                                            value={row.validation_rules} // Assuming validation_rules is part of the row
                                                            onChange={(e) => handleFieldChange(index, 'validation_rules', e.target.value,e)}
                                                        />
                                                    </td>
                                                    <td><InfoSection /></td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <PrimaryButton className="ms-3" onClick={(e)=>addNewFieldRow(e)}>
                                                                <IoMdAdd className='text-lg' />
                                                            </PrimaryButton>
                                                            <DangerButton className="ms-3">
                                                                <MdOutlineDeleteOutline className='text-lg' />
                                                            </DangerButton>
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Render options if present */}
                                                {row.options && row.options.length > 0 && (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={`${row.id}_options_${index}`}>
                                                        <td colSpan="6" className="py-3 px-6 text-left whitespace-nowrap">
                                                            <Select className="w-1/3 mr-4" options={row.options} />
                                                            <TextInput
                                                                id="option"
                                                                type="text"
                                                                className="w-1/3"
                                                                onChange={(e) => handleOptinChange(index, row.options.length - 1, e.target.value)}
                                                            />
                                                            <SuccessButton className="ms-3" onClick={() => addNewOption(index)}>
                                                                <IoMdAdd className='text-lg' />
                                                            </SuccessButton>
                                                            <DangerButton className="ms-3" onClick={() => deleteOption(index, row.id)}>
                                                                <MdOutlineDeleteOutline className='text-lg' />
                                                            </DangerButton>
                                                            
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </Draggable>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-3 text-center">No Records Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </Droppable>
        </DragDropContext>
        
        <div className="grid grid-cols-12 gap-4 mx-auto mt-4">
            <div className='col-span-12'>
                <SuccessButton className="ms-3 float-right">Add Calculation Field</SuccessButton>
            </div>
            {
                (CalculationForm.length > 0 ? 
                    CalculationForm.map((index,value)=>(
                    <>
                        <div className="col-span-4 mt-4">
                            <TextInput id={`field_name_${index + 1}`}
                            type="text"
                            name={`field_name_${index + 1}`}
                            className="block w-full"
                            value={value.field_name}/>
                        </div>
                        <div className="col-span-8 mt-4">
                            <textarea className='w-full'></textarea>
                        </div>
                    </>
                    ))
                : <>
                </>)
            }
           
            <div className="col-span-12 mt-4">
                <SuccessButton className="ms-3 float-right" onClick={handleSubmit}>
                    Create Form
                </SuccessButton>
                <PrimaryButton className="ms-3 float-right" onClick={(e)=>openJsonFormModal(e)}>
                    Preview Form & Add Extra Features
                </PrimaryButton>
            </div>
        </div>
      </form>
      <ModalJsonForm isFormModalOpen={isFormModalOpen} setIsFormModalOpen={setIsFormModalOpen} formJson={formData} formId={parseInt(formId)}/>
    </div>
    
  )
}
export default GenerateNewForm

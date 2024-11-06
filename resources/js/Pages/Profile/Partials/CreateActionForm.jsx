import ajaxCall from '@/ajaxCall'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import Select from '@/Components/Select'
import TextInput from '@/Components/TextInput'
import React, { useState } from 'react'

const CreateActionForm = ({userActions}) => {
    const [formData,setFormData] = useState({'action':'','action_type':''});

    const addNewAction = async (e) => {
        e.preventDefault();
        
        const response = await ajaxCall('/create-action-type','POST',formData);
   
    };
    const handleInputChange = (field,value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    }
   
  return (
    <div>
        <form onSubmit={addNewAction}>
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-5">
                    <InputLabel htmlFor="action" value="Action Title" />

                    <TextInput
                        id="action"
                        type="text"
                        name="action"
                        className="mt-1 block w-full"
                        isFocused
                        placeholder="Enter Action"
                        value={formData.action}
                        onChange={(e)=>handleInputChange('action',e.target.value)}
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>
                <div className="col-span-5">
                    <InputLabel htmlFor="action_type"  value="Action Type" />

                   <Select className="w-full" options = {userActions} value={formData.action_type} onChange={(e)=>handleInputChange('action_type',e.target.value)}/>
                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>
                <div className="col-span-2 mt-4">
                    <PrimaryButton className="ms-3 w-full">
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CreateActionForm

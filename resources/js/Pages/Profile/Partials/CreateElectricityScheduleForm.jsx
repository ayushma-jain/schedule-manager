import ajaxCall from '@/ajaxCall';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SuccessButton from '@/Components/SuccessButton';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import validateForm from '@/validateForm';
import React, { useState } from 'react'

const CreateElectricityScheduleForm = () => {
  

    // Define state for the form fields
    const [formData, setFormData] = useState({
        lastReadingDate: '',
        lastReading: '',
        currentReadingDate: '',
        currentReading: '',
        perUnitRate: ''
    });

  const [errors, setErrors] = useState({});
   // Fetch CSRF token from meta tag
   const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formErrors = validateForm(e);
    return false;
    
    if (Object.keys(formErrors).length === 0) {
        const response  = await ajaxCall('/save-electricity-details','POST',JSON.stringify(formData));
        setMessage('Form submitted successfully!');
    } else {
      // Form has errors, update error state
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className="col-span-12">
                    <InputLabel htmlFor="lastReadingDate" value="Last Reading Date" />
                    <TextInput
                        id="lastReadingDate"
                        type="date"
                        name="lastReadingDate"
                        className="mt-1 block w-full"
                        isFocused
                        onChange={handleChange}
                        value={formData.lastReadingDate}
                        placeholder="Enter Last Reading"
                    />
                    {errors.lastReadingDate && (
                        <InputError message={errors.lastReadingDate} className="mt-2" />
                    
                    )}
                </div>
                <div className="col-span-12">
                    <InputLabel htmlFor="lastReading" value="Last Reading" />
                    <TextInput
                        id="lastReading"
                        type="text"
                        name="lastReading"
                        className="mt-1 block w-full"
                        isFocused
                        value={formData.lastReading}
                        onChange={handleChange}
                        placeholder="Enter Last Reading"
                    />
                    {errors.lastReading && (
                        <InputError message={errors.lastReading} className="mt-2" />
                    
                    )}
                </div>
                <div className="col-span-12">
                    <InputLabel htmlFor="currentReadingDate" value="Current Reading Date" />
                    <TextInput
                        id="currentReadingDate"
                        type="date"
                        name="currentReadingDate"
                        className="mt-1 block w-full"
                        isFocused
                        onChange={handleChange}
                        value={formData.currentReadingDate}
                        placeholder="Enter Current Reading Date"
                    />
                    {errors.currentReadingDate && (
                        <InputError message={errors.currentReadingDate} className="mt-2" />
                    
                    )}
                </div>
                <div className="col-span-12">
                    <InputLabel htmlFor="currentReading" value="Current Reading" />
                    <TextInput
                        id="currentReading"
                        type="text"
                        name="currentReading"
                        className="mt-1 block w-full"
                        isFocused
                        value={formData.currentReading}
                        onChange={handleChange}
                        placeholder="Enter Current Reading"
                    />
                    {errors.currentReading && (
                        <InputError message={errors.currentReading} className="mt-2" />
                    
                    )}
                </div>
                <div className="col-span-12">
                    <InputLabel htmlFor="perUnitRate" value="Per Unit Rate" />
                    <TextInput
                        id="perUnitRate"
                        type="text"
                        name="perUnitRate"
                        className="mt-1 block w-full"
                        isFocused
                        value={formData.perUnitRate}
                        onChange={handleChange}
                        placeholder="Enter Per Unit Rate"
                    />
                    {errors.perUnitRate && (
                        <InputError message={errors.perUnitRate} className="mt-2" />
                    
                    )}
                </div>
                <div className="col-span-12 mb-5">
                    <SuccessButton className="ms-3 float-right">
                        Save
                    </SuccessButton>
                </div>
            </div>
      </form>
    </div>
  )
}

export default CreateElectricityScheduleForm

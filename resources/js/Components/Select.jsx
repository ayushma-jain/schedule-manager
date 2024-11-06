import React, { useState } from 'react'

const Select = ({options,name,id,onChange,value,className=''}) => {
  
   
  return (
    <>
        <select name={name} id={id} onChange={onChange} value={value} className={
          'text-sm focus:border-indigo-500 focus:ring-indigo-500 shadow-sm ' +
          className
        }>
        <option value="">--Select--</option>
        {options && options.length > 0 ? (
        options.map((option, index) => (
            <option key={index} value={option.index} >{option.value}</option>
        ))
        ) : (
            <option disabled>No options available</option>  // Optional: Add a default message if the array is empty
        )}
       
    </select>
    </>
  )
}

export default Select

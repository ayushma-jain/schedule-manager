import ajaxCall from '@/ajaxCall';
import json from '@/samplejson.json'
import CreateElectricityScheduleForm from '@/Pages/Profile/Partials/CreateElectricityScheduleForm';
import JSONForm from '@/Pages/Profile/Partials/JSONForm';
import React, { useEffect, useState } from 'react';
import Table from './Table';

const TabsComponent = ({navComponents}) => {
  // Manage active tab state

  const [activeTab, setActiveTab] = useState(navComponents[0].value);
  const [formJson,setFormJson] = useState([]);

  async function fetchData(index) {
    const response = await ajaxCall('/get-form-json/'+index,'GET');
   
    setFormJson(response.data.form_json);
    console.log(formJson);
}
  useEffect(()=>{
   
    fetchData(navComponents[0].index);
  },[])

  const changeTabAction = (index,value) => {
    setActiveTab(value);
    fetchData(index)
  }

  return (
    <div>
      <ul className="flex border-b border-gray-300">
        {navComponents && navComponents.length >0 ?(
            navComponents.map((navItem,index)=>(
                <li className="mr-2" key={index} id={`tab-${index}`}>
                    <button
                    className={`inline-block p-4 ${
                        activeTab === navItem.value ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 border-b-2 border-transparent'
                    } focus:outline-none`}
                    //onClick={() => setActiveTab(navItem.value)}
                    onClick={() => changeTabAction(navItem.index,navItem.value)}
                    >
                    {navItem.value}
                    </button>
              </li>
            ))
        ):(
            <span>No Items...</span>
        )}
      </ul>
        
      <div className="tab-content mt-4">
      {
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className='col-span-5'>
                {activeTab === 'Electricity' && (
                    <CreateElectricityScheduleForm/>
                    
                )}
                {(formJson && formJson.length>0 ? ( 
                    <JSONForm formJson={formJson}/>
                ) : (
                    <></>
                ))}
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-6 py-5 mt-5'>
                    
                    <Table className="mt-5" disaplayData={json.displaydata}/>
                </div>
            </div>
            
        }
      </div>
    </div>
  );
};

export default TabsComponent;

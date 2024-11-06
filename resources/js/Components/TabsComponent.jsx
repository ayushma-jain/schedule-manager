import ajaxCall from '@/ajaxCall';
import json from '@/samplejson.json'
import JSONForm from '@/Pages/Profile/Partials/JSONForm';
import React, { useEffect, useState } from 'react';
import Table from './Table';
import ModalJsonForm from '@/Pages/Profile/Partials/ModalJsonForm';
import { Button } from '@headlessui/react';
import PrimaryButton from './PrimaryButton';
import { useNavigate } from 'react-router-dom';

const TabsComponent = ({navComponents}) => {
  // Manage active tab state
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(navComponents[0].value);
  const [formJson,setFormJson] = useState([]);
  const [formId,setFormId] = useState('');
  const [tableRecords, settableRecords] = useState([]);
  const [isFormModalOpen,setIsFormModalOpen] = useState(false);
   
    const openJsonFormModal = () => {
      setIsFormModalOpen(true);
    };

  async function fetchData(index,formId) {
    const response = await ajaxCall('/get-form-json/'+index,'GET');
   
    const formJson = (response.data.form_json != undefined && response.data.form_json != '') ? (response.data.form_json) :[];
    const dataId = (response.data.id != undefined && response.data.id != '') ? (response.data.id) :formId;
    const tableResponse  = await ajaxCall('/get-table-records/'+dataId,'GET');
    const tableResponseJson = (tableResponse.data != undefined && tableResponse.data != '') ? (tableResponse.data) :[];
    setFormJson(JSON.parse(formJson));
    setFormId(response.data.id);
    console.log(tableResponseJson);
    settableRecords(tableResponseJson);
    
  }
  const handleRedirect = (formId) => {
    navigate('/generate-form/'+formId);  // Redirect to the '/about' route
  };
  useEffect(()=>{
    fetchData(navComponents[0].index,formId);
  },[])

  const changeTabAction = (index,value,formId) => {
    setActiveTab(value);
    fetchData(index,formId)
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
                    onClick={() => changeTabAction(navItem.index,navItem.value,formId)}
                    >
                    {navItem.value}
                    </button>
              </li>
            ))
        ):(
            <span>No Items...</span>
        )}
      </ul>
        
      <div className="tab-content mt-4 relative">
      {
            <div className="grid grid-cols-12 gap-4 mx-auto">
                <div className='col-span-5' style={{position: 'absolute',top: '-75px',right:'0px'}}>
                  <PrimaryButton className="ms-3 float-right" onClick={()=>handleRedirect(formId)}>
                       Edit Form
                   </PrimaryButton>
                  <PrimaryButton className="px-4" onClick={openJsonFormModal} >Add</PrimaryButton>
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-12 py-5 mt-5'>
                    <Table className="mt-5" disaplayData={tableRecords}/>
                </div>
            </div>
        }
      </div>
      <ModalJsonForm isFormModalOpen={isFormModalOpen} setIsFormModalOpen={setIsFormModalOpen} formJson={formJson} formId={formId}/>
    </div>
  );
};

export default TabsComponent;

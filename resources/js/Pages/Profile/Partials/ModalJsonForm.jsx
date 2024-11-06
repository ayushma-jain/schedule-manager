import Modal from '@/Components/Modal';
import React from 'react'
import JSONForm from './JSONForm';

const ModalJsonForm = ({isFormModalOpen,setIsFormModalOpen,formJson,formId}) => {
    const closeModal = () => {
        setIsFormModalOpen(false);
    };
  return (
    <div>
        
      <Modal show={isFormModalOpen} onClose={closeModal}>
        <div className="grid grid-cols-12 gap-4 mx-auto p-6">
            <div className='col-span-12'>
                {(formJson && formJson.length>0 ? ( 
                    <JSONForm formJson={formJson} formId={formId}/>
                ) : (
                    <></>
                ))}
            </div>
        </div>
        </Modal>
    </div>
  )
}

export default ModalJsonForm

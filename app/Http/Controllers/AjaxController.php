<?php

namespace App\Http\Controllers;

use App\Models\FormDetails;
use App\Models\FormFields;
use App\Models\FormRecord;
use App\Models\ValidationRules;
use Exception;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function getTableRecords(int $form_id){
        
        if(!empty($form_id)){
            $formDetails = FormDetails::where(['id'=>$form_id])->first()->toArray();
            //Decode the JSON data from the 'fields' column
            $fieldsArray = json_decode($formDetails['form_json'], true);
  
            $fieldHeader = array_map(function($field) {
                return $field['field_name'];
            }, array_filter($fieldsArray, function($field) {
                return isset($field['is_allowed']) && !empty($field['is_allowed']);
            }));
            $formRecords = FormRecord::where(['form_id'=>$form_id])->get()->toArray();
            $fieldHeader= array_values($fieldHeader);
           
            $tableRecords = ['header' => $fieldHeader];
            $tableBody = [];
            foreach($formRecords as $row){
                $fieldsRecordArray = json_decode($row['form_json'], true);
                $newRow=[];
                foreach($fieldHeader as $key=>$value){
                    $newRow[$value] = isset($fieldsRecordArray[strtolower(preg_replace('/\s/', '_', $value, 1))])?$fieldsRecordArray[strtolower(preg_replace('/\s/', '_', $value, 1))] :'-';
                }
                array_push($tableBody,$newRow);
            }
            $tableRecords['body'] = $tableBody;
            return response()->json(['message' => 'Record Saved Successfully!!', 'data' => $tableRecords], 201);
        }
    }

    public function getValidationRules(int $field_id){
        $validationRules=[];
        if(!empty($field_id)){
  
            $validationRules = ValidationRules::Where(['field_id'=>$field_id])->select(['validation_name as value','id as index'])->get()->toArray();

       }
       return response()->json(['message' => 'Record Saved Successfully!!', 'data' => $validationRules], 201);
    }

    public function createNewForm(Request $request){
        // Validate the request data
       $validatedData = $request->validate([
           'action' => 'required|',
           'action_type' => 'required',
           'fields' => 'required', // Make sure to handle password confirmation
       ]);
       if($request->input('form_id')){
           $formDetails = FormDetails::where('id', $request->input('form_id'))
           ->update([
               'form_json' => json_encode($validatedData['fields'])
           ]);
       }else{
            $checkAlreadyExist = FormDetails::find(['action_type_id'=>$validatedData['action_type']])->count();
            if(!empty($checkAlreadyExist)){
                $formDetails = FormDetails::where('action_type_id', $validatedData['action_type'])
                ->update([
                    'form_json' => json_encode($validatedData['fields'])
                ]);
            }else{
                $formDetails = FormDetails::create([
                    'action_type_id' => $validatedData['action_type'],
                    'form_json' => json_encode($validatedData['fields']),
                    'status' => 1
                ]);
            }
           
       }
       return response()->json([
           'success' => true,
           'message' => 'Form Created Successfully!!',
           'data' => $formDetails
       ], 200);
   }

   public function getFormJson(int $action_type_id){
        try{
            $formDetails =  FormDetails::where('action_type_id', $action_type_id)->get()->first();
            return response()->json([
                'success' => true,
                'message' => 'From Data Find Successfully!!',
                'data' => $formDetails
            ], 200);
        
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $e->getMessage()
            ], 400);
        }
    }

    public function getEventData(int $event_id = 0){
        try{
            if(!empty($event_id)){

            }else{
                return response()->json([
                    'success' => false,
                    'message' => 'Validation Error',
                    'errors' => "Something went wrong, Please try after sometime!!"
                ], 400);
            }

        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $e->getMessage()
            ], 400);
        }
    }

}

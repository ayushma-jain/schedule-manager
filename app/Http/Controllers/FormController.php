<?php

namespace App\Http\Controllers;

use App\Models\FormDetails;
use App\Models\FormFields;
use App\Models\FormRecord;
use App\Models\UserAction;
use App\Models\UserActionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Exception;

class FormController extends Controller
{
     /**
     * Dispaly settings view.
     */
    public function settingView(int $form_id = 0){
    
        $activeTab =  Route::currentRouteName();
        $userActions = UserAction::Select(['id as index','action_name as value'])->get()->toArray();
        if($activeTab == 'generate-form'){
           
            $formfields = FormFields::with(['validation_rules' => function($query) {
                $query->select(['validation_name as value', 'id as index', 'field_id']); // Make sure to include field_id
            }])->get();
            $formDetails = [];

            $formfields = $formfields->map(function ($item) {
                return [
                    'index' => $item['id'],
                    'value' => $item['field_type'],
                    'validation_rules' => $item['validation_rules']->toArray()
                    
                ];
            });
            
            // Convert to array if needed
            $formfields = $formfields->toArray();
            if(!empty($form_id)){
                $formDetails = FormDetails::with('userAction')->findOrFail($form_id)->toArray();

            }
            return Inertia::render('Profile/Setting',compact('userActions','formfields','formDetails'));
        }else{
            return Inertia::render('Profile/Setting',compact('userActions'));
        }

     }

     public function saveFormRecords(Request $request){
        $validatedData = $request->validate([
            'form_id' => 'required|int',
            'form_json' => 'required'
        ]);
       
        $formDetails = FormRecord::create([
            'form_id' => $validatedData['form_id'],
            'form_json' => json_encode($validatedData['form_json']),
            'status' => 1
        ]);
        return response()->json(['message' => 'Record Saved Successfully!!', 'data' => $formDetails], 201);
     }
   
}

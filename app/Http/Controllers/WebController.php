<?php

namespace App\Http\Controllers;

use App\Models\FormDetails;
use App\Models\FormFields;
use App\Models\FormRecord;
use App\Models\UserAction;
use App\Models\UserActionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\Inertia;

class WebController extends Controller
{
    public function home(Request $request) : Response {
        
       
        // DB::enableQueryLog();
        // echo '<pre>';print_r(UserAction::find(1)->actionTypes->toArray());echo '</pre>';
        // echo '<pre>';print_r(UserActionType::find(1)->userAction->toArray());echo '</pre>';
        // $formRecords = FormDetails::find(1)->get()->toArray();
        // $scheduleData = FormRecord::with('actionId')->get()->toArray();
        
        // $scheduleData = FormRecord::with(['actionId' => function($query) {
        //     // Ensure 'action_id' is selected in the related table
        //     $query->select('action_id'); // Also select the id for proper linking
        // }])->get()->map(function ($formRecord) {
        //     // Flatten the action_id into the main array
        //     $formRecord->action_id = optional($formRecord->actionId)->action_id; 
        
        //     // Optionally remove the nested actionId array if not needed
        //     unset($formRecord->actionId);
        
        //     return $formRecord;
        // });
        $formRecords = FormRecord::with(['formDetail.userActionType'])
        ->get()
        ->map(function ($formRecord) {
            //Flatten the necessary fields into the main array
            $jsonData = json_decode($formRecord->form_json,true);
            $actionDate =isset($jsonData['date']) ? date('Y-m-d',strtotime($jsonData['date'])): $formRecord->created_at;
            $data = [
                'id' => $formRecord->id,
                'form_id' => $formRecord->form_id,
                'action_type_id' => $formRecord->formDetail->action_type_id ?? null,
                'action_id' => $formRecord->formDetail->userActionType->action_id ?? null,
                'action_date' => $actionDate,
                'form_json' => $formRecord->form_json,
            ];
    
            return $data;
        })->toArray();
   
        return Inertia::render('Web/Home', compact('formRecords'));
    }
}

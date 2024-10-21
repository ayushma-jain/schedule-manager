<?php

namespace App\Http\Controllers;

use App\Models\FormDetails;
use App\Models\FormFields;
use App\Models\UserAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class FormController extends Controller
{
     /**
     * Dispaly settings view.
     */
    public function settingView(int $form_id = 0){
    
        $activeTab =  Route::currentRouteName();
    
        $userActions = UserAction::Select(['id as index','action_name as value'])->get()->toArray();
        if($activeTab == 'generate-form'){
            $formfields = FormFields::Where(['status'=>'Active'])->select(['id as index','field_type as value'])->get()->toArray();
            $formDetails = [];
            if(!empty($form_id)){
                $formDetails = FormDetails::Where(['id' => $form_id])->first()->toArray();
            }
            return Inertia::render('Profile/Setting',compact('userActions','formfields','formDetails'));
        }else{
            return Inertia::render('Profile/Setting',compact('userActions'));
        }

     }
   
}

<?php

namespace App\Http\Controllers;

use App\Events\ActionLog;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\FormDetails;
use App\Models\FormFields;
use App\Models\UserAction;
use App\Models\UserActionType;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Dispaly task list grid.
     */
    public function tasksList(Request $request) : Response
    {
        $navComponents = UserActionType::Where(['action_id'=>1])->select(['id  as index','action_title as value'])->get()->toArray();

        return Inertia::render('Profile/Task',compact('navComponents'));
    }

    /**
     * Dispaly goal view.
     */
    public function goalView(Request $request) : Response
    {
        return Inertia::render('Profile/Goal',[]);
    }

     /**
     * Dispaly expense view.
     */
    public function expenses(Request $request) : Response
    {
        $navComponents = UserActionType::Where(['action_id'=>3])->select(['id  as index','action_title as value'])->get()->toArray();
        return Inertia::render('Profile/Expense',compact('navComponents'));
    }

     /**
     * Dispaly expense view.
     */
    public function todoView(Request $request) : Response
    {
        $navComponents = UserActionType::Where(['action_id'=>2])->select(['id  as index','action_title as value'])->get()->toArray();
        
        return Inertia::render('Profile/Todo',compact('navComponents'));
    }

    public function actionCreateFormView(){
        
        $userActions = UserAction::Select(['id as index','action_name as value'])->get()->toArray();
        return Inertia::render('Profile/Partials/CreateActionForm',compact('userActions','userActionType'));
    }

    public function getActionTypeList(string $action_id){
        try{
            $userActionType = UserActionType::Where(['action_id'=>$action_id])->select(['id  as index','action_title as value'])->get()->toArray();
        
            return response()->json(['message' => 'Data Retrived successfully!!','data'=>$userActionType]);
        }catch(Exception $e){

        }
        
    }

   

  

    public function getFormFields(){
        $formfields = FormFields::Where(['status'=>'Active'])->select(['id','field_type as value'])->get()->toArray();
        $fieldList = array_reduce($formfields, function($fieldsArray, $item) {
            $fieldsArray[$item['id']] = $item['value'];
            return $fieldsArray;
        }, []);
        return response()->json(['message' => 'Fields Retrived Successfully!!', 'data' => $fieldList], 201);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

   
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function createActionType(Request $request){
          // Validate the request data
          $validatedData = $request->validate([
            'action' => 'required',
            'action_type' => 'required'
        ]);
        $userActionType = UserActionType::create([
            'action_title' => $validatedData['action'],
            'action_id' => $validatedData['action_type']
        ]);
        $actionTitle = "New '".$validatedData['action']."' Action Type Created";
        event(new ActionLog(['user_id'=>Auth::id(),'action_title'=>$actionTitle]));
        return response()->json(['message' => 'Form Created Successfully!!', 'data' => $userActionType], 201);
    }
}

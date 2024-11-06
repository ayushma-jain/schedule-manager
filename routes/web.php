<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AjaxController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',[WebController::class,'home'])->name('home');


Route::prefix('admin')->group(function() {
    Route::get('login', [AdminAuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AdminAuthController::class, 'login']);
    Route::post('logout', [AdminAuthController::class, 'logout'])->name('logout');
    Route::middleware('auth:admin')->group(function () {
        Route::get('/admin/dashboard', function () {
            return view('admin.dashboard'); // Admin dashboard
        });
    });
    
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/user/dashboard', function () {
        return view('user.dashboard'); // User dashboard
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/task-list', [ProfileController::class,'tasksList'])->name('task.list');
    Route::get('/goal-view', [ProfileController::class,'goalView'])->name('goal.view');
    Route::get('/expenses', [ProfileController::class,'expenses'])->name('expenses');
    Route::get('/todo', [ProfileController::class,'todoView'])->name('todo.view');
    Route::get('/action-form',[FormController::class, 'settingView'])->name('action-form');
   // Route::get('/setting/action-form',[ProfileController::class,'actionCreateFormView'])->name('action-form');
    Route::get('/generate-form/{form_id?}',[FormController::class,'settingView'])->name('generate-form');
    Route::get('/get-action-type/{action_id?}',[ProfileController::class, 'getActionTypeList'])->name('get-action-type');
    Route::post('/create-form',[AjaxController::class,'createNewForm'])->name('create-form');

    Route::get('/get-form-json/{action_type_id?}',[AjaxController::class,'getFormJson'])->name('get-form-json');
    Route::get('/get-form-fields',[ProfileController::class,'getFormFields'])->name('get-form-fields');
    Route::post('/create-action-type',[ProfileController::class,'createActionType'])->name('create-action-type');

    Route::post('/save-form-details',[FormController::class, 'saveFormRecords'])->name('save-form-details');

    Route::get('/get-table-records/{form_id?}',[AjaxController::class,'getTableRecords'])->name('get-table-records');

    Route::get('/get-validation-rules/{filed_id}',[AjaxController::class,'getValidationRules'])->name('get-validation-rules');
    Route::get('/get-event-data/{event_id}',[AjaxController::class,'getEventData'])->name('get-event-data');
 
    
});

require __DIR__.'/auth.php';

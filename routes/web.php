<?php

use App\Http\Controllers\AdminAuthController;
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
    Route::get('/setting/action-form',[ProfileController::class, 'settingView'])->name('setting');
   // Route::get('/setting/action-form',[ProfileController::class,'actionCreateFormView'])->name('action-form');
    Route::get('/setting/generate-form',[ProfileController::class,'GenerateNewFormView'])->name('generate-form');
    Route::get('/get-action-type/{action_id?}',[ProfileController::class, 'getActionTypeList'])->name('get-action-type');
    Route::post('/save-electricity-details', [ProfileController::class,'saveElectricityDetails'])->name('save-electricity-details');
    Route::post('/create-form',[ProfileController::class,'createNewForm'])->name('create-form');

    Route::get('/get-form-json/{action_type_id?}',[ProfileController::class,'getFormJson'])->name('get-form-json');
    Route::get('/get-form-fields',[ProfileController::class,'getFormFields'])->name('get-form-fields');
    Route::post('create-action-type',[ProfileController::class,'createActionType'])->name('create-action-type');

    
 
    
});

require __DIR__.'/auth.php';

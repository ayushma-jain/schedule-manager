<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'action_type_id',
        'form_json',
        'status'
    ];
    
    public function userActionType()
    {
        return $this->belongsTo(UserActionType::class, 'action_type_id', 'id');
    }

    public function userAction()
    {
        return $this->hasOneThrough(
            UserAction::class,        // Target model
            UserActionType::class,    // Intermediate model
            'id',                      // Foreign key on user_action_type table
            'id',                      // Foreign key on user_action table
            'action_type_id',         // Local key on form_details table
            'action_id'               // Local key on user_action_type table
        );
    }

    public function records(){
        return $this->hasMany(FormRecord::class,'form_id','id');
    }
    public function formRecord()
    {
        
        return $this->belongsTo(FormRecord::class,'form_id','id');
    }
   

}

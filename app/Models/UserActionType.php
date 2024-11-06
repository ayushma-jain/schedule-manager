<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserActionType extends Model
{
    use HasFactory, SoftDeletes;
    protected $table="user_action_type";
     
    protected $fillable = ['action_title','action_id'];

    // public function userAction()
    // {
    //     return $this->belongsTo(UserAction::class, 'action_id', 'id');
    // }
    
    public function userAction()
    {
        return $this->hasOne(UserAction::class, 'id', 'action_id');
    }
    
}

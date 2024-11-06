<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAction extends Model
{
    use HasFactory;

    protected $table="user_action";

    public function actionTypes(){
        return $this->hasMany(UserActionType::class,'action_id','id');
    }
}

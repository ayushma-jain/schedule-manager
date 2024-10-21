<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActionLogger extends Model
{
    protected $fillable = ['user_id','action_title'];
}

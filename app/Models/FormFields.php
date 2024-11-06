<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormFields extends Model
{
    use HasFactory;

    public function validation_rules(){
        return $this->hasMany(ValidationRules::class,'field_id','id');
    }
    public function options(){
        return $this->belongsTo(FormFields::class,'id')->select(['id as index','field_type as value']);
    }
}

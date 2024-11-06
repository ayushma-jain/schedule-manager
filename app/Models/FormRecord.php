<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormRecord extends Model
{
    protected $fillable = ['form_id','form_json'];

    // public function formId(){
    //     return $this->hasOne(FormFields::class,'id','form_id')->select('id as form_id');
    // }
    public function actionId() {
       
        return $this->hasManyThrough(UserActionType::class,FormDetails::class,'action_type_id','action_id','form_id','id');
       
    }
    public function getTableData($formId) {
        $this->where(['form_id',$formId])->get()->toArray();
    }
    public function formDetail()
    {
        return $this->hasOne(FormDetails::class, 'id', 'form_id');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = ['name', 'email', 'password']; 

    public function product(){
        return $this->belongsTo('App\Product');
    }
}
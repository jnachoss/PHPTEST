<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CoffeeOrder extends Model
{
    protected $fillable = ['state', 'number', 'total'];

    public function orderDetail(){
        return $this->hasMany('App\OrderDetail');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }
}

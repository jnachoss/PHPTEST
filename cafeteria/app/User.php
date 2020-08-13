<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name', 'email', 'password'];

    public function coffeeOrder(){
        return $this->hasMany('App\CoffeeOrder');
    }

}

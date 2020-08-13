<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoffeeOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coffee_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('state');
            $table->integer('number');
            $table->float('total');
            $table->integer('users_id')->unsigned();
            $table->foreign('users_id')
            ->references('id')->on('users');
            $table->timestamps();     

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coffee_orders');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('coffee_order_id')->unsigned();
            $table->foreign('coffee_order_id')
            ->references('id')->on('coffee_orders')
            ->onDelete('cascade');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')
            ->references('id')->on('products');

            $table->string('comment');
            $table->integer('quantity');
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
        Schema::dropIfExists('order_details');
    }
}

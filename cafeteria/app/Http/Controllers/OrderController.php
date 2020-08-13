<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use App\CoffeeOrder;
use App\Http\Resources\OrderCollection;

class OrderController extends Controller
{
    public function index()
    {
        //return new OrderCollection(Product::all());
        return CoffeeOrder::with(['OrderDetail', 'OrderDetail.Product', 'User'])->get()->toArray();
    }

    public function store(Request $request)
    {

        $order = new CoffeeOrder();

        $order->state = $request->input('data.state');
        $order->number = $request->input('data.number');
        $order->users_id = $request->input('data.>users_id');
        $order->total = $request->input('data.total');

        $order->save();

        $detail = $request->input('data.order_detail');


        foreach($detail as $item)
        {
            $order_detail = new OrderDetail();

            $order_detail->coffee_order_id = $order->id;
            $order_detail->product_id = $item->product_id;
            $order_detail->comment = $item->comment;
            $order_detail->quantity = $item->quantity;
        }

        $order->orderDetail()->saveMany($detail);

        return response()->json($order,200); 

    }

    public function updateState($id, Request $request)
    {

        

        $order = CoffeeOrder::findOrFail($id);

        $order->state = $request->input('data.state');

        $order->save();

        return response()->json($order,200); 

       

    }
}

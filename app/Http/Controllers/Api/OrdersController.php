<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Products;
use DateTime;
use DateTimeZone;
use Illuminate\Http\JsonResponse;

class OrdersController extends Controller
{
    public function get(): JsonResponse
    {
        return response()->json([
            "orders" => Orders::where('user_id', auth()->id())->get()
        ]);
    }

    public function create(): JsonResponse
    {
        $date = new DateTime("now", new DateTimeZone('Asia/Vladivostok') );

        $products = json_decode(request('products'));

        $order = new Orders;
        $order->products = json_encode($products);
        $order->create_date = $date->format('d.m.Y H:i');
        $order->user_id = auth()->id();
        $order->price = request('price');

        foreach ($products as $product) {
            $update_product = Products::find($product->id);
            $update_product->count_kg -= $product->BUY_COUNT_KG;
            $update_product->save();
        }

        $order->save();

        // Обновленные данные
        return response()->json(["products" => Products::all()]);
    }
}

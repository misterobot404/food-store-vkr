<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategories;
use App\Models\Products;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    public function get(): JsonResponse
    {
        // Пулы для этой группы
        return response()->json([
            "products" => Products::all(),
            "product_categories" => ProductCategories::all(),
        ]);
    }

    public function updateAll(): JsonResponse
    {
        $products = json_decode(request('products'));

        foreach ($products as $product) {
            $update_product = Products::find($product->id);
            $update_product->title = $product->title;
            $update_product->description = $product->description;
            $update_product->category_id = $product->category_id;
            $update_product->count_kg = $product->count_kg;
            $update_product->price = $product->price;
            $update_product->save();
        }

        // Обновленные данные
        return response()->json(["products" => Products::all()]);
    }

    public function create(): JsonResponse
    {
        $product = new Products;
        $product->title = request('title');
        $product->description = request('description');
        $product->category_id = request('category_id');
        $product->image_url = '/storage/' . request()->file('image')->store('images', 'public');

        $product->save();

        // Обновленные данные
        return response()->json(["products" => Products::all()]);
    }

    public function delete($id): JsonResponse
    {
        $product = Products::find($id);
        File::delete(public_path($product->image_url));
        $product->delete();

        // Обновленные данные
        return response()->json(["products" => Products::all()]);
    }
}

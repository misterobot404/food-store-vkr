<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategories;
use App\Models\Products;
use Illuminate\Http\JsonResponse;
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
}

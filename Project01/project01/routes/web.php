<?php

use App\Http\Controllers\Api\TodoController;
use Illuminate\Support\Facades\Route;


Route::get('api/todos', [TodoController::class, 'index']);
Route::post('api/todos', [TodoController::class, 'store']);
Route::patch('api/todos/{id}', [TodoController::class, 'update']);
Route::delete('api/todos/{id}', [TodoController::class, 'destroy']);

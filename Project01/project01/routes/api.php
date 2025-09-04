<?php

use App\Http\Controllers\Api\TodoController;

Route::get('todos', [TodoController::class, 'index']);
Route::post('todos', [TodoController::class, 'store']);
Route::patch('todos/{id}', [TodoController::class, 'update']);
Route::delete('todos/{id}', [TodoController::class, 'destroy']);

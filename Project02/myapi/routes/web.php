<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\NoteController;
use App\Http\Controllers\TagController;

Route::apiResource('api/notes', NoteController::class);
Route::apiResource('api/tags', TagController::class);

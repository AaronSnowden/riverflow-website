<?php

use Illuminate\Support\Facades\Route;
use App\HTTP\Controllers\RegisterController;

// API Routes (if you add API endpoints later, they should be defined before the catch-all)
Route::post('/register', [RegisterController::class, 'register']);

// Catch-all route for Vue Router (SPA)
// This must be the last route defined
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\CauseController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\UploadController;

// Public news routes (no authentication required)
Route::get('/news/published', [NewsController::class, 'published']);
Route::get('/news/{id}', [NewsController::class, 'show']);

// Public event routes (no authentication required)
Route::get('/events/published', [EventController::class, 'published']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::get('/events/category/{category}', [EventController::class, 'byCategory']);

// Public gallery routes (no authentication required)
Route::get('/gallery/published', [GalleryController::class, 'published']);
Route::get('/gallery/categories', [GalleryController::class, 'categories']);
Route::get('/gallery/{id}', [GalleryController::class, 'show']);
Route::get('/gallery/category/{category}', [GalleryController::class, 'byCategory']);

// Public opportunities routes (no authentication required)
Route::get('/opportunities/active', [OpportunityController::class, 'active']);
Route::get('/opportunities/{id}', [OpportunityController::class, 'show']);

// Public team routes (no authentication required)
Route::get('/team/published', [TeamController::class, 'published']);
Route::get('/team/{id}', [TeamController::class, 'show']);

// Public causes routes (no authentication required)
Route::get('/causes/active', [CauseController::class, 'publicCauses']);
Route::get('/causes/{id}', [CauseController::class, 'show']);

// Public projects routes (no authentication required)
Route::get('/projects/active', [ProjectController::class, 'publicProjects']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Public newsletter routes (no authentication required)
Route::get('/newsletters/published', [NewsletterController::class, 'published']);
Route::get('/newsletters/{id}', [NewsletterController::class, 'show']);
Route::get('/newsletters/{id}/download', [NewsletterController::class, 'download']);

// File upload route
Route::post('/upload', [UploadController::class, 'upload']);
Route::delete('/upload', [UploadController::class, 'delete']);

// Admin routes (authentication can be added later)
Route::prefix('admin')->group(function () {
    // News management
    Route::get('/news', [NewsController::class, 'index']);
    Route::post('/news', [NewsController::class, 'store']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);
    
    // Events management
    Route::get('/events', [EventController::class, 'index']);
    Route::post('/events', [EventController::class, 'store']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);
    Route::get('/events/statistics', [EventController::class, 'statistics']);
    
    // Gallery management
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::post('/gallery/bulk-upload', [GalleryController::class, 'bulkUpload']);
    Route::get('/gallery/{id}', [GalleryController::class, 'show']);
    Route::put('/gallery/{id}', [GalleryController::class, 'update']);
    Route::post('/gallery/{id}', [GalleryController::class, 'update']); // For multipart/form-data with _method=PUT
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);
    
    // Opportunities management
    Route::get('/opportunities', [OpportunityController::class, 'index']);
    Route::post('/opportunities', [OpportunityController::class, 'store']);
    Route::get('/opportunities/{id}', [OpportunityController::class, 'show']);
    Route::put('/opportunities/{id}', [OpportunityController::class, 'update']);
    Route::delete('/opportunities/{id}', [OpportunityController::class, 'destroy']);
    
    // Team management
    Route::get('/team', [TeamController::class, 'index']);
    Route::post('/team', [TeamController::class, 'store']);
    Route::get('/team/{id}', [TeamController::class, 'show']);
    Route::put('/team/{id}', [TeamController::class, 'update']);
    Route::post('/team/{id}', [TeamController::class, 'update']); // For multipart/form-data with _method=PUT
    Route::delete('/team/{id}', [TeamController::class, 'destroy']);
    Route::get('/team/statistics', [TeamController::class, 'statistics']);
    
    // User management
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/statistics', [UserController::class, 'statistics']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::post('/users/{id}', [UserController::class, 'update']); // For multipart/form-data with _method=PUT
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::patch('/users/{id}/status', [UserController::class, 'updateStatus']);
    Route::patch('/users/{id}/role', [UserController::class, 'updateRole']);
    
    // Causes management
    Route::get('/causes', [CauseController::class, 'index']);
    Route::post('/causes', [CauseController::class, 'store']);
    Route::get('/causes/statistics', [CauseController::class, 'statistics']);
    Route::get('/causes/{id}', [CauseController::class, 'show']);
    Route::put('/causes/{id}', [CauseController::class, 'update']);
    Route::post('/causes/{id}', [CauseController::class, 'update']); // For multipart/form-data with _method=PUT
    Route::delete('/causes/{id}', [CauseController::class, 'destroy']);
    Route::patch('/causes/{id}/status', [CauseController::class, 'updateStatus']);
    Route::patch('/causes/{id}/amounts', [CauseController::class, 'updateAmounts']);
    
    // Projects management
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects/statistics', [ProjectController::class, 'statistics']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::post('/projects/{id}', [ProjectController::class, 'update']); // For multipart/form-data with _method=PUT
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    Route::patch('/projects/{id}/status', [ProjectController::class, 'updateStatus']);
    
    // Newsletter management
    Route::get('/newsletters', [NewsletterController::class, 'index']);
    Route::post('/newsletters', [NewsletterController::class, 'store']);
    Route::get('/newsletters/statistics', [NewsletterController::class, 'statistics']);
    Route::get('/newsletters/{id}', [NewsletterController::class, 'show']);
    Route::put('/newsletters/{id}', [NewsletterController::class, 'update']);
    Route::post('/newsletters/{id}', [NewsletterController::class, 'update']); // For multipart/form-data with _method=PUT
    Route::delete('/newsletters/{id}', [NewsletterController::class, 'destroy']);
    Route::patch('/newsletters/{id}/status', [NewsletterController::class, 'updateStatus']);
});

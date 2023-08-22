<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WeaponController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/menu', function () {
    return Inertia::render('Menu');
})->middleware(['auth', 'verified'])->name('menu');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/weapon/list', [WeaponController::class, 'list'])->name('weapon.summary');
    Route::get('/weapon/view/{id}', [WeaponController::class, 'view']);
    Route::get('/weapon/create', [WeaponController::class, 'create'])->name('weapon.create');
    Route::get('/weapon/edit/{id}', [WeaponController::class, 'edit']);
    Route::post('/weapon/edit', [WeaponController::class, 'store'])
            ->middleware([HandlePrecognitiveRequests::class])
            ->name('weapon.store');
    Route::post('/weapon/copy/{id}', [WeaponController::class, 'copy'])->name('weapon.copy');
    Route::get('/weapon/baseweight', [WeaponController::class, 'baseweight'])->name('weapon.baseweight');
    Route::get('/weapon/failurerate', [WeaponController::class, 'failurerate'])->name('weapon.failurerate');
});

require __DIR__.'/auth.php';

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers;
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
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('welcome');
})->middleware(['auth'])->name('dashboard');


require __DIR__.'/auth.php';

Route::get('/admin', function () {
    return view('admin');
});

require __DIR__.'/adminauth.php';

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::get('me', [AuthController::class,'me'])->middleware(['auth']);
Route::get('admin/me', [AdminController::class,'me'])->middleware(['auth:admin']);

Route::resource('post',Controllers\PostController::class);
Route::resource('comment',Controllers\CommentController::class);


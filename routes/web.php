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

// auth
Route::get('/sa', function () {
    return view('welcome');
});
Route::get('/sa/view/{posts}', function () {
    return view('welcome');
});
Route::get('/sa/rating', function () {
    return view('welcome');
});
Route::get('/sa/profile', function () {
    return view('welcome');
});

Route::get('/sa/profile/edit/{posts}', function () {
    return view('welcome');
});


require __DIR__.'/auth.php';

// guest
Route::get('/', function () {
    return view('welcome');
});
Route::get('/rating', function () {
    return view('welcome');
});
Route::get('/view/{posts}', function () {
    return view('welcome');
});

// admin
Route::get('/admin', function () {
    return view('admin');
});
Route::get('/admin/post', function () {
    return view('admin');
});
Route::get('/admin/user', function () {
    return view('admin');
});
Route::get('/admin/view/{posts}', function () {
    return view('admin');
});
Route::get('/admin/edit/{posts}', function () {
    return view('admin');
});

require __DIR__.'/adminauth.php';

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::get('me', [AuthController::class,'me'])->middleware(['auth']);
Route::resource('user',Controllers\AuthController::class);

Route::get('admin/me', [AdminController::class,'me'])->middleware(['auth:admin']);

Route::resource('post',Controllers\PostController::class);
Route::post('/posts',[Controllers\PostController::class,'index']);
Route::get('/submitPost',[Controllers\PostController::class,'submitPost']);

Route::resource('comment',Controllers\CommentController::class);
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function me()
    {
        return response()->json(Auth::user());
    }
    public function index()
    {
        return response()->json( User::latest()->get());
    }

    public function destroy($id)
    {
        User::whereId($id)->first()->delete();

        return response()->json('success');
    }

}

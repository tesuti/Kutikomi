<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->search){
            $post =  Post::where('title','like','%' .$request->search.'%')
            ->orWhere('body', 'like','%' .$request->search.'%')
            ->orWhere('id', 'like' ,'%' .$request->search.'%')
            ->get();
        }else{
            $post = Post::inRandomOrder()->get();
        }
        return response()->json($post);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required',
            'title' => 'required',
            'body' => 'required',
        ]);

        $name = $request->file('photo')->getClientOriginalName();
        $fileName = time().'.'.$name;
        $request->file('photo')->storeAs('images/', $fileName, 'public');

        $test = new Post;
        $test->title = $request->title;
        $test->body = $request->body;
        $test->user_id = Auth::id();

        $test->photo = $fileName;

        $test->save();

        return response()->json('successfully created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
//
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(Post::whereId($id)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        $request->validate([
            'photo' => 'required',
            'title' => 'required',
            'body' => 'required',
        ]);
        Storage::disk('public')->delete('images/' . $post->photo);

        $name = $request->file('photo')->getClientOriginalName();
        $fileName = time().'.'.$name;
        $request->file('photo')->storeAs('images/', $fileName, 'public');

        $post->photo = $fileName;
        $post->title = $request->title;
        $post->body = $request->body;
        $post->user_id = Auth::id();

        $post->update();

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        Storage::disk('public')->delete('images/' . $post->photo);

        $post->whereId($id)->delete();
        return response()->json('success');
    }

    //プロファイルに記事を表示する
    public function submitPost(Request $request){
        $post = Post::
        where('user_id', '=', Auth::user()->id)
        ->get();
        return response()->json($post);
            }
}

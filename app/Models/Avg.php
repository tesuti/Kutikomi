<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avg extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'id',
    //     'post_id',
    //     'comment-avg',
    //     'rating-avg',
    // ];

    // protected $with = ['posts'];

    // public function posts()
    // {
    //     return $this->belongsTo(Post::class,'post_id','id');
    // }

}

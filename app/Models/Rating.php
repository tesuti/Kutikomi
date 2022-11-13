<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'post_id',
    //     'rating_avg',
    //     'comment',
    // ];

    // protected $with = ['posts'];

    // public function posts()
    // {
    //     return $this->belongsTo(Post::class,'post_id','id');
    // }
}

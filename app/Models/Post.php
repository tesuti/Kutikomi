<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $dates = ['deleted_at'];

    protected $fillable = ['title', 'body','photo','user_id'];

    /**
     * Write Your Code..
     *
     * @return string
    */
    protected $with = ['user'];
    public function comments()
    {
        return $this->hasMany(Comment::class,'post_id', 'id')->whereNull('parent_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}

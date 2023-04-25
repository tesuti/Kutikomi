<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $dates = ['deleted_at'];

    protected $fillable = ['title', 'body','photo'];

    /**
     * Write Your Code..
     *
     * @return string
    */
    // protected $with = ['comments'];
    public function comments()
    {
        return $this->hasMany(Comment::class,'post_id', 'id')->whereNull('parent_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'user_id',
        'post_id',
        'parent_id',
        'comment',
        'rating'];

    /**
     * Write Your Code..
     *
     * @return string
    */
    protected $with = ['user','posts'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function posts()
    {
        return $this->belongsTo(Post::class,'post_id','id');
    }

    /**
     * Write Your Code..
     *
     * @return string
    */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}

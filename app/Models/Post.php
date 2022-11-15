<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory,SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['id','title', 'body'];

    /**
     * Write Your Code..
     *
     * @return string
    */

    public function comments()
    {
        return $this->hasMany(Comment::class,'post_id', 'id')->whereNull('parent_id');
    }

}

<?php

namespace App\Services;

use App\Models\Comment;

class CommentServices
{
    //自分のtweetかどうかをチェックするメソッド
    public function checkOwnTweet(int $userId, int $commentId): bool
    {
        $comment = Comment::where('id', $commentId)->first();
        if(!$comment){
            return false;
        }
        return $comment->user_id === $userId;
    }
}


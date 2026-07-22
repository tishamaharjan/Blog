export type CommentModel = {
  userId: number;
  blogId: number;
  comment: string;
};

export type UpdateCommentModel = {
  userId: number;
  blogId: number;
  commentId: number;
  comment: string;
};

export type GetCommentModel = {
  userId: number;
  blogId: number;
  commentId: number;
};

export function createCommentModel(commentData: CommentModel) {
  return {
    userId: commentData.userId,
    blogId: commentData.blogId,
    comment: commentData.comment,
  };
}

export function updateCommentModel(commentData: UpdateCommentModel) {
  return {
    userId: commentData.userId,
    blogId: commentData.blogId,
    commentId: commentData.commentId,
    comment: commentData.comment,
  };
}

export function getCommentByIdModel(commentData: GetCommentModel) {
  return {
    userId: commentData.userId,
    blogId: commentData.blogId,
    commentId: commentData.commentId,
  };
}

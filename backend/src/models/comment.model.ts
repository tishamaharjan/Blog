type CommentModel = {
  comment: string;
};

export function createCommentModel(commentData: CommentModel) {
  return {
    comment: commentData.comment,
  };
}

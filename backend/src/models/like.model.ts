export type ToggleLikeModel = {
  userId: number;
  blogId: number;
  commentId?: number | null;
};

export function toggleLike(likeData: ToggleLikeModel) {
  return {
    userId: likeData.userId,
    blogId: likeData.blogId,
    commentId: likeData.commentId,
  };
}

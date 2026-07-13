type LikeUnlikeModel = {
  status: string;
};

export function createLikeUnlikeModel(likeUnlikeData: LikeUnlikeModel) {
  return {
    status: likeUnlikeData.status,
  };
}

type BlogModel = {
  blogDetail: string;
  blogImage: string;
  uploadDate: string;
};

export function createBlogModel(blogData: BlogModel) {
  return {
    blogDetail: blogData.blogDetail,
    blogImage: blogData.blogImage,
    uploadDate: blogData.uploadDate,
  };
}

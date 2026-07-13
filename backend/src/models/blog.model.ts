export type Blogs = {
  userId: number;
  blogDetail: string;
  blogImage: string;
  uploadDate: string;
};

export type UpdateBlogs = {
  userId: number;
  blogId: number;
  blogDetail: string;
  blogImage: string;
  uploadDate: string;
};

export type GetBlog = {
  userId: number;
  blogId: number;
};

export function createBlogModel(blogData: Blogs) {
  return {
    userId: blogData.userId,
    blogDetail: blogData.blogDetail,
    blogImage: blogData.blogImage,
    uploadDate: blogData.uploadDate,
  };
}

export function updateBlogModel(blogData: UpdateBlogs) {
  return {
    userId: blogData.userId,
    blogId: blogData.blogId,
    blogDetail: blogData.blogDetail,
    blogImage: blogData.blogImage,
    uploadDate: blogData.uploadDate,
  };
}

export function getBlogModel(blogData: GetBlog) {
  return {
    userId: blogData.userId,
    blogId: blogData.blogId,
  };
}

// The old createBlogModel/updateBlogModel/getBlogModel functions just returned
// an object identical to their input — they added no value and were a layer of
// indirection to trace through. Zod's `.parse()` already returns a correctly
// typed object, so the controller can pass that straight to the service.

export type Blog = {
  userId: number;
  blogDetail: string;
  blogImage: string; // URL, not raw image data
  uploadDate: string;
};

export type UpdateBlog = Blog & {
  blogId: number;
};

export type GetBlog = {
  userId: number;
  blogId: number;
};

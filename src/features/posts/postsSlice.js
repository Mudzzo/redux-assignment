import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, addPost,deletePost } from "../../network/postsApis";
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder 
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    })
    .addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((user) => user.id !== action.meta.arg)
    })
  },
});
export { fetchPosts, addPost, deletePost}; 
export default postsSlice.reducer;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import PostForm from "../../Components/PostForm/PostFrom";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleAddPost = () => {
    // dispatch action
    dispatch(addPost(newPost)).then(() => {
      setNewPost({ title: "", body: "" });
      toast.success("Post added successfully");
    });
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id))
  }
  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {post.id} - {post.title}
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>+
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                {/* <p className="text-danger">error: you should enter valid title contains chars and number</p> */}
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                {/* <p className="text-danger">error: you should enter valid title contains chars and number</p> */}
                <button className="btn btn-success" onClick={handleAddPost}>
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
                <PostForm/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default PostsList;

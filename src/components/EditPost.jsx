import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editpost.css";

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

useEffect(() => {
  async function fetchPost() {
    const res = await fetch(`/backend/post/${postId}`);
    const data = await res.json();
    if (data.success && data.post) {
      setTitle(data.post.title);
      setBody(data.post.body);
      setImage(data.post.image || "");
    }
  }
  fetchPost();
}, [postId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const postData = { title, body, image, user_id: user?.id };

      const res = await fetch(`/backend/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Post updated successfully!");
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Failed to update post");
      }
    } catch (error) {
      setMessage("Server error, please try again.");
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;

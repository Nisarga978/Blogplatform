import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/postview.css";

function PostView() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/backend/post/${postId}`);
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.error("Failed to fetch post", err);
        alert("Could not load post");
        navigate("/dashboard");
      }
    }
    fetchPost();
  }, [postId, navigate]);

  if (!post) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/backend/posts/${postId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Post deleted successfully");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Server error on delete");
    }
  };

  return (
    <div className="post-view-container">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {post.image && <img src={post.image} alt={post.title} />}
      <div className="post-view-actions">
        <button onClick={() => navigate(`/edit/${postId}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>
    </div>
  );
}

export default PostView;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PostPage.css";


function PostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const postData = {
    title,
    body,
    image,
    user_id: user?.id,
  };

  try {
    const res = await fetch("/backend/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    
    const data = await res.json();
    if (res.ok) {
      setMessage("Blog posted successfully!");
      setTitle("");
      setBody("");
      setImage("");
      navigate("/dashboard");
    } else {
      setMessage(data.message || "Failed to post blog");
    }
  } catch (error) {
    setMessage("Network/server error");
    console.error("Post request failed:", error);
  }
};

  return (
    <div className="post-page">
      <h2>Create a Blog Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>

        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Post Blog</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PostPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const rawName = user?.name || "";
  const formattedName = rawName.toUpperCase();

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  
  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    async function fetchPosts() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/backend/posts?user_id=${user.id}`
        );
        setPosts(res.data.posts || []);
      } catch (err) {
        setPosts([]);
      }
    }

    fetchPosts();
  }, [navigate, user?.id]);

  return (
    <div className="dashboard-outer">

      
      <div className="dashboard-header">
        <div className="welcome-block">
          WELCOME {formattedName}
        </div>

        
        <div className="header-buttons">
          <button
            className="create-post-btn"
            onClick={() => navigate("/post")}
          >
            Create Post
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      
      <div className="dashboard-table-block">
        <h2>Your Posts</h2>

        <div className="posts-table">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <div className="post-row" key={post.id}>
                <span className="post-title">{post.title}</span>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/view/${post.id}`)}
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

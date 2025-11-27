import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PostPage from "./components/PostPage.jsx";
import PostView from "./components/PostView.jsx";
import EditPost from "./components/EditPost.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/view/:postId" element={<PostView />} />
      <Route path="/post" element={<PostPage />} />
      
      <Route path="/edit/:postId" element={<EditPost />} />



    </Routes>
  </BrowserRouter>
);

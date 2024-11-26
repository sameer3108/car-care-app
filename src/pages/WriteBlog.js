/**
 * Created & Developed by Raunak Singh, B00831843
 */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/WriteBlog.css";

function WriteBlog() {
  const userId = localStorage.getItem("userID");
  const currentUserName = localStorage.getItem("loggedUserFullName") ?? "";

  const navigate = useNavigate();

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const getCurrentDate = () => {
    const currentDate = new Date();
    const currentDateISOString = currentDate.toISOString();
    return currentDateISOString;
  };

  const handleBackButton = (event) => {
    navigate("/blogs");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!blogTitle || !blogContent) {
      alert("Please enter both Blog Title and Blog Content before submitting.");
      return;
    }

    const newBlog = {
      user_id: userId,
      title: blogTitle,
      content: blogContent,
      date_posted: getCurrentDate(),
    };

    await axios
      .post("https://csci-4177-grp-21.onrender.com/addBlog", newBlog)
      .then((response) => {
        alert("Maintenance Blog Submitted Successfully!");
        navigate("/blogs");
      })
      .catch((error) => {
        console.error(error);
        alert("An Error Occurred, Please try again.");
      });
  };

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setBlogContent(event.target.value);
  };

  return (
    <div className="main-write-blogs-page">
      <div className="write-blog-back-button" onClick={handleBackButton}>
        &lt; <u>Back to Blogs</u>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="main-write-blogs-page-heading">
          Write a Maintenance Blog
        </div>

        <br></br>

        <h5>Blog Title</h5>
        <input
          type="text"
          placeholder="Add Blog Title"
          value={blogTitle}
          onChange={handleTitleChange}
        />

        <h5>Blog Content</h5>
        <textarea
          placeholder="Add Blog Content"
          value={blogContent}
          onChange={handleContentChange}
        ></textarea>

        <br></br>

        <div className="post-blog-fullname">
          Submitting as ~ <b>{currentUserName}</b>
        </div>

        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
}

export default WriteBlog;

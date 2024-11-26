/**
 * Created & Developed by Raunak Singh, B00831843
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllBlogs.css";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    axios
      .get(`https://csci-4177-grp-21.onrender.com/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error getting blogs from the database: ", error);
      });
  }, []);

  useEffect(() => {
    blogs.forEach((blog) => {
      axios
        .get(`https://csci-4177-grp-21.onrender.com/user?id=${blog.user_id}`)
        .then((response) => {
          setUsers((prev) => ({
            ...prev,
            [blog.user_id]:
              response.data.firstName + " " + response.data.lastName,
          }));
        })
        .catch((error) => {
          console.error(`Error getting user details `, error);
        });
    });
  }, [blogs]);

  const formatDate = (dateString) => {
    // Reference for `toLocaleDateString`, URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="all-blogs-comp">
      <div className="all-blogs-form-heading">All Maintenance Blogs</div>

      <div className="all-blogs-container">
        {blogs.map((blog, index) => (
          <div key={index} className="main-blogs-comp">
            <h3>{blog.title}</h3>
            <div className="blog-comp-post-date">{formatDate(blog.date_posted)}</div>
            <div className="blog-comp-by-name">by {users[blog.user_id]}</div>
            <p>{blog.content}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBlogs;

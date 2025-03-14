"use client";
import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const AddPost = () => {
  const socket = io("http://localhost:3000");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { name, description };

    try {
      const response = await axios.post("http://localhost:3000/posts", post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      socket.emit("newPost", response.data);
    } catch (error) {
      console.error("Failed to add post", error);
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;

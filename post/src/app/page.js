"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
export default function Home() {
  const socket = io("http://localhost:3000");
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then((response) => {
      console.log("fetching posts", response.data);
      setPosts(response.data);
    });
  };

  useEffect(() => {
    fetchPosts();
    socket.on("sendBack", (data) => {
      console.log("client received new post", data);
      setPosts((prevPosts) => [data, ...prevPosts]);
    });
    return () => {
      socket.off("newPost", fetchPosts);
    };
  }, []);

  return (
    <div className={styles.page}>
      <h1>hello world</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post?.User?.name}</h1>
          <h2>{post.name}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}

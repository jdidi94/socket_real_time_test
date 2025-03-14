"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
export default function Login() {
  const socket = io("http://localhost:3000");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      socket.emit("friends_post", response.data.id);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

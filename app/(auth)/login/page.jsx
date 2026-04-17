"use client";
import { useState } from "react";
import axios from "@/lib/api"; 
import { useAuth } from "@/context/AuthContext";
import styles from "./login.module.css";

export default function LoginPage({ setIsOpen ,registr}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/users");
      const user = res.data.find(u => u.email === email && u.password === password);

      if (user) {
        login(user); 
        setIsOpen(false); 
      } else {
        alert("Invalid email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <input 
          type="email" 
          placeholder={registr?.emailplachorder}
          className={styles.input} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder={registr?.passwordplachorder}
          className={styles.input} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <div className={styles.forgotPass}>{registr?.Forgotpassword}</div>
        <button type="submit" className={styles.submitBtn}>{registr?.Loginpassword}</button>
      </form>
    </div>
  );
}
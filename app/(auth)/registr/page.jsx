"use client";
import { useState } from "react";
import axios from "@/lib/api"; 
import styles from "./registr.module.css";

export default function RegisterPage({ setAuthMode,registr}) {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords don't match!");

    try {
      await axios.post("/users", { name, email, password });
      alert("Registration successful!");
      setAuthMode("login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          placeholder={registr?.nameplachorder} 
          className={styles.input} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
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
        <input 
          type="password" 
          placeholder={registr?.passwordplachorder}  
          className={styles.input} 
          onChange={(e) => setConfirm(e.target.value)} 
          required 
        />
        <button type="submit" className={styles.submitBtn}>{registr?.Signupbutton}</button>
      </form>
    </div>
  );
}
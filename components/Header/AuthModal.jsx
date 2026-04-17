"use client";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import styles from "./automodal.module.css";
import LoginPage from "@/app/(auth)/login/page";
import RegisterPage from "@/app/(auth)/registr/page";

export default function AuthModal({registr}) {
    const [isOpen, setIsOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const { user, logout } = useAuth(); 

    return (
        <div className={styles.authWrapper}>
            {user ? (
                <div className={styles.userInfo}>

                    <span>{user.name || user.email.split('@')[0]}</span>
                    <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                </div>
            ) : (
                <FaRegUser 
                    className={styles.loginIcon} 
                    onClick={() => setIsOpen(true)} 
                />
            )}

            {isOpen && !user && (
                <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
                        
                        <div className={styles.tabHeader}>
                            <button 
                                className={`${styles.tabItem} ${authMode === "login" ? styles.activeTab : ""}`}
                                onClick={() => setAuthMode("login")}
                            >
                                {registr?.Loginpassword}
                            </button>
                            <button 
                                className={`${styles.tabItem} ${authMode === "signup" ? styles.activeTab : ""}`}
                                onClick={() => setAuthMode("signup")}
                            >
                                {registr?.Signupbutton}
                            </button>
                        </div>

                        <div className={styles.authContent}>
                            {authMode === "login" 
                                ? <LoginPage setIsOpen={setIsOpen} registr={registr}/> 
                                : <RegisterPage setAuthMode={setAuthMode} registr={registr}/>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
"use client"
import { useState, useEffect, useContext } from "react"
import Head from "./Head"
import Orders from "./Orders"
import Total from "./Total"
import styles from './basket.module.css'
import { CartContext } from "@/context/CartContext"

export default function BasketIndex() {
    const { show } = useContext(CartContext);
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        const allCookies = document.cookie.split('; ');
        const langCookie = allCookies.find(row => row.startsWith('lang='));
        if (langCookie) {
            setCurrentLang(langCookie.split('=')[1]);
        }
    }, []);

    return (
        <div className={`${styles.basket} ${show ? styles.active : ""}`}>
            <Head currentLang={currentLang} />
            <Orders currentLang={currentLang} />
            <Total currentLang={currentLang} />
        </div>
    )
}
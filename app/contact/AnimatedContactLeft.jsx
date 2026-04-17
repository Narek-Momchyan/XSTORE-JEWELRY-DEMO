"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import styles from "./contact.module.css";

export default function AnimatedContactLeft({ contact }) {
    if (!contact) return null;

    return (
        <motion.div 
            className={styles.left}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className={styles.title}>{contact.title}</h2>
            <hr />
            <p className={styles.text}>{contact.desc}</p>
            
            <h4 className={styles.adress_title}>{contact.adress_title}</h4>
            <p className={styles.adress_desc}>{contact.adress_desc}</p>
            
            <h4 className={styles.question_title}>{contact.question_title}</h4>
            <p className={styles.question_desc}>{contact.question_desc}</p>
            <p className={styles.email}>{contact.email}</p>

            <h3 className={styles.subtitle}>{contact.social_networks}</h3>

            <div className={styles.socialIcons}>
                <FaFacebookF />
                <FaInstagram />
                <FaPinterestP />
                <FaYoutube />
            </div>
        </motion.div>
    );
}

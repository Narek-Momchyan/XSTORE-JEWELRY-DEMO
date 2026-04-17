"use client";

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import styles from "./contact.module.css";

export default function Form({ formDesc, formTitle, buttonText }) {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

   
        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, 
                process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID, 
                form.current, 
                {
                    publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
                }
            )
            .then(
                () => {
                    alert('SUCCESS!');
                    form.current.reset();
                },
                (error) => {
                    alert('FAILED...', error.text);
                },
            );
    };

    return (
      <motion.div 
            className={styles.right}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className={styles?.title}>{formTitle}</h2>

            <form ref={form} onSubmit={sendEmail} className={styles.form}>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                />

                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    required
                />

                <input
                    className={styles.input}
                    type="text"
                    name="phone"
                    placeholder="Your phone"
                    required
                />

                <textarea
                    className={styles.textarea}
                    name="message"
                    placeholder="Your message"
                    rows="6"
                />

                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        required
                    />
                    <label htmlFor="agree">{formDesc}</label>
                </div>

                <button type="submit" className={styles.button}>
                    {buttonText || "SEND MESSAGE"}
                </button>
            </form>
        </motion.div>
    );
}
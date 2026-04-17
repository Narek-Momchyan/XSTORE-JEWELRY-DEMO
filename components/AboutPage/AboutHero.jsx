"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./about.module.css";

export default function AboutHero({ data }) {
  if (!data) return null;

  return (
    <section className={styles.aboutSection}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {data.subtitle && (
          <span className={styles.heroSubtitle}>{data.subtitle}</span>
        )}
        {data?.title && <h1 className={styles.heroTitle}>{data?.title}</h1>}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3, duration: 0.8 }}
        >
          {data.text && <p className={styles.heroText}>{data.text}</p>}
          {data.button && (
            <button className={styles.heroButton}>{data.button}</button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}


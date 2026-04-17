"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./types.module.css";

export default function Types({ typesData,  }) {
  if (!typesData || typesData.length === 0) return null;

  return (
    <section className={styles.typesSection}>
      <div className={styles.container}>
        {typesData.map((box, index) => (
          <motion.div 
            key={box.id || index} 
            className={`${styles.box} ${styles[`box${index + 1}`]}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <div className={styles.rollingWrapper}>
              
              <div className={styles.front}>
                <div className={styles.imgBox}>
                  <img src={box.img} alt={box.name} />
                </div>
                <h3 className={styles.title}>{box.name}</h3>
              </div>

              <Link href={"product"} className={styles.back}>
                <div className={styles.imgBox}>
                  <img src={box.img} alt={box.name} />
                </div>
                <span className={styles.shopNowText}>
                  {box.btn}
                </span>
              </Link>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
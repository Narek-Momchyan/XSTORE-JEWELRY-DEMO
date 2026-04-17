"use client";
import React from "react";
import styles from "./info.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InfoSection({infosections}) {
 
  if (!infosections || infosections.length === 0) return null;

  return (
    <section className={styles.row}>
      {infosections.map((sec, index) => {
        const isReverse = index % 2 !== 0;
        return (
          <div 
            key={sec.id} 
            className={`${styles.section} ${isReverse ? styles.reverse : ""}`}
          >
            <motion.div 
              className={styles.textSide}
              initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.subtitle}>{sec.subtitle}</span>
              <h2 className={styles.title}>{sec.title}</h2>
              <p className={styles.desc}>{sec.desc}</p>
              <Link className={styles.btn} href={sec.btn_href}>
              {sec.btn}
              </Link>
            </motion.div>

            <motion.div 
              className={styles.imageSide}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.imgContainer}>
                <img src={sec.parent1} alt="Jewelry 1" className={styles.mainImg} />
                <div className={styles.hotspot} style={{ top: '25%', left: '35%' }}>
                  <div className={styles.plus}>+</div>
                  <div className={styles.childBox}>
                    <img src={sec.child1} alt="Detail 1" />
                  </div>
                </div>
              </div>

              <div className={styles.imgContainer}>
                <img src={sec.parent2} alt="Jewelry 2" className={styles.mainImg} />
                <div className={styles.hotspot} style={{ bottom: '20%', right: '20%' }}>
                  <div className={styles.plus}>+</div>
                  <div className={styles.childBox}>
                    <img src={sec.child2} alt="Detail 2" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        );
      })}
    </section>
  );
}
"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./about.module.css";

export default function AboutSections({ sections }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className={styles.sectionsContainer}>
      {sections.map((sec, index) => {

        const isImageLeft = index % 2 !== 0;

        return (
          <section 
            key={sec.id} 
            className={`${styles.sectionWrapper} ${isImageLeft ? styles.imageLeft : ""}`}
          >
            <motion.div 
              className={styles.textContent}
              initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {sec?.title && <h3 className={styles.sectionTitle}>{sec?.title}</h3>}
              {sec.quote && <p className={styles.coreQuote}>{sec.quote}</p>}
              {sec.signature && <p className={styles.coreSignature}>{sec.signature}</p>}
              {sec.text1 && <p className={styles.sectionText}>{sec.text1}</p>}
              {sec.text2 && <p className={styles.sectionText}>{sec.text2}</p>}
            </motion.div>

            <motion.div 
              className={styles.imageContainer}
              initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {sec.image && (
                <img 
                  src={sec.image} 
                  alt={sec?.title} 
                  className={styles.sectionImage} 
                />
              )}
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
 "use client";
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./about.module.css";

export default function AboutTestimonials({ testimonials }) {
  const [index, setIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <motion.section 
      className={styles.testimonialsWrapper}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className={styles.testimonialsOverline}>IT IS INTERESTING</span>
      <h3 className={styles.testimonialsTitle}>WHAT OUR CLIENTS SAY</h3>

      <div className={styles.testimonialSlider}>
        <button className={styles.testimonialNav} onClick={prev}>
          <AiOutlineLeft size={22} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            className={styles.testimonialCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.testimonialAvatar}>
              <span className={styles.testimonialInitial}>
                {current.name?.[0] || "C"}
              </span>
            </div>
            <div className={styles.testimonialRating}>★★★★★</div>
            <p className={styles.testimonialText}>{current.text}</p>
            <div className={styles.testimonialName}>{current.name}</div>
            <div className={styles.testimonialCountry}>{current.country}</div>
          </motion.div>
        </AnimatePresence>

        <button className={styles.testimonialNav} onClick={next}>
          <AiOutlineRight size={22} />
        </button>
      </div>
    </motion.section>
  );
}


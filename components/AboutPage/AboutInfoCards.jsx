"use client";

import React from "react";
import { SlLocationPin, SlClock } from "react-icons/sl";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { motion } from "framer-motion";
import styles from "./about.module.css";

export default function AboutInfoCards({ cards }) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className={styles.infoCardsWrapper}>
      <div className={styles.infoCardsGrid}>
        {cards.map((card, index) => {
          let Icon = null;
          if (card.icon === "location") Icon = SlLocationPin;
          else if (card.icon === "chat") Icon = HiOutlineChatBubbleLeftEllipsis;
          else if (card.icon === "clock") Icon = SlClock;

          return (
            <motion.div 
              key={card.id} 
              className={styles.infoCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className={styles.infoCardIcon}>
                {Icon && <Icon />}
              </div>
              <h4 className={styles.infoCardTitle}>{card?.title}</h4>
              <p className={styles.infoCardText}>{card.text1}</p>
              <p className={styles.infoCardText}>{card.text2}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

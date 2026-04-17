"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import styles from './times.module.css';

export default function Times({ timerData }) {
  const targetDate = new Date("2028-04-06T17:33:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timerData) return null;

  const displayTime = [
    { num: timeLeft.days, lab: timerData.labels.days },
    { num: timeLeft.hours, lab: timerData.labels.hours },
    { num: timeLeft.minutes, lab: timerData.labels.minutes },
    { num: timeLeft.seconds, lab: timerData.labels.seconds }
  ];

  return (
    <motion.div 
      className={styles.row}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.timerContainer}>
        {displayTime.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className={styles.timeBox}>
              <span className={styles.number}>{item.num.toString().padStart(2, '0')}</span>
              <span className={styles.label}>{item.lab}</span>
            </div>
            {idx < 3 && <div className={styles.divider}>:</div>}
          </React.Fragment>
        ))}
      </div>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {timerData.title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link href="/product" className={styles.btn}>{timerData.btnText}</Link>
      </motion.div>
    </motion.div>
  );
}
"use client";

import React from "react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaSkype } from "react-icons/fa6";
import { motion } from "framer-motion";
import styles from "./about.module.css";

export default function AboutTeam({ team }) {
  if (!team || team.length === 0) return null;

  return (
    <section className={styles.teamWrapper}>
      <div className={styles.teamHeading}>
        <motion.h3 
          className={styles.teamTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        ></motion.h3>
      </div>
      <div className={styles.teamGrid}>
        {team.map((member, index) => (
          <motion.div 
            key={member.id || member.name} 
            className={styles.teamCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <div className={styles.teamImageWrapper}>
              {member.image && (
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.teamImage}
                />
              )}
              <div className={styles.teamSocials}>
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaXTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaSkype /></a>
              </div>
            </div>
            <div className={styles.teamName}>{member.name}</div>
            <div className={styles.teamRole}>{member.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


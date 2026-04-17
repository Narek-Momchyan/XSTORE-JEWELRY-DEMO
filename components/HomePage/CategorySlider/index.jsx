"use client";
import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import styles from './categorySlider.module.css';

export default function CategorySlider({ categoryData }) {
    const [items, setItems] = useState(categoryData?.items || []);

    useEffect(() => {
        if (categoryData?.items) setItems(categoryData.items);
    }, [categoryData]);

    const handleSwap = () => {
        setItems(prevItems => [...prevItems].reverse());
    };

    if (!categoryData || items.length < 2) return null;

    return (
        <section className={styles.row}>
            <motion.div 
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className={styles.subTitle}>{categoryData.title1}</span>
                <h2 className={styles.mainTitle}>{categoryData.title2}</h2>
            </motion.div>
            <div className={styles.sliderMain}>
                <button className={styles.navBtn} onClick={handleSwap}><AiOutlineLeft size={24} /></button>
                <div className={styles.displayArea}>
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div 
                                key={item.id} layout 
                                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                className={styles.slide}
                            >
                                <div className={styles.categoryCard}>
                                    <div className={styles.imageBox}>
                                        <img src={item.image} alt={item.name} className={styles.mainImg} />
                                    </div>
                                    <div className={styles.info}>
                                        <h3 className={styles.catName}>{item.name}</h3>
                                       
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <button className={styles.navBtn} onClick={handleSwap}><AiOutlineRight size={24} /></button>
            </div>
        </section>
    );
}
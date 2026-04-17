"use client";
import { useState } from 'react';
import styles from './infoSlider.module.css';
import {  AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";

export default function InfoSlider({ infoData, headings }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  

  if (!infoData || infoData.length === 0) return null;

const productdata = infoData.slice(0, 6); 
  const itemsVisible = 3;

  const next = () => {

    if (currentSlide >= productdata.length - itemsVisible) {
      setCurrentSlide(0); 
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(productdata.length - itemsVisible); 
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  return (
    <section className={styles.row}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className='heading1'>{headings.title1}</span>
        <h2 className='heading2'>{headings.title2}</h2>
      </motion.div>

      <motion.div 
        className={styles.sliderMainContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev}>
          <AiOutlineLeft size={22} />
        </button>
        
        <div className={styles.sliderWindow}>
          <div 
            className={styles.track} 
            style={{ 
              transform: `translateX(-${currentSlide * (100 / itemsVisible)}%)`,
              display: 'flex',
              transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {productdata.map((item) => (
              <div className={styles.slide} key={item.id} >
                <div className={styles.productCard}>
                  <div className={styles.imageBox}>
                    <img src={item.images[0]} alt={item?.title} className={`${styles.productImg} ${styles.primaryImg}`} />
                    {item.images[1] && (
                      <img src={item.images[1]} alt={item?.title} className={`${styles.productImg} ${styles.secondaryImg}`} />
                    )}
                
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.productName}>{item?.title}</h3>
                    <p className={styles.productMaterial}>{item.material}</p>
                    <span className={styles.price}>{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next}>
          <AiOutlineRight size={22} />
        </button>
      </motion.div>
    </section>
  );
}
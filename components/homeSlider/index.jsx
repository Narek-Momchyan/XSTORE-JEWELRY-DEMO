"use client"
import { useState, useEffect } from 'react'
import styles from './homeSlider.module.css'
import Link from 'next/link';


export default function HomeSlider({ homeslider }) {
  const [currentSlide, setcurrentSlide] = useState(0);

  const next = () => {
    setcurrentSlide((prev) => (prev === homeslider.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setcurrentSlide((prev) => (prev === 0 ? homeslider.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(next, 5000); 
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className={styles.sliderWrapper}> 
      {homeslider.map((item, index) => ( 
        <div
          className={`${styles.slide} ${currentSlide === index ? styles.active : ""}`}
          key={item.id}
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className={styles.content}>
            <h1 className={styles.subtitle}>{item.subtitle}</h1>
            <p className={styles.title}>{item?.title}</p>
            <Link href={item.href} className={styles.btn} >{item.button_text}</Link>
          </div>
        </div>
      ))}

      <button className={`${styles.sliderBtn} ${styles.prev}`} onClick={prev}>
        ‹
      </button>

      <button className={`${styles.sliderBtn} ${styles.next}`} onClick={next}>
        ›
      </button>
    </div>
  )
}
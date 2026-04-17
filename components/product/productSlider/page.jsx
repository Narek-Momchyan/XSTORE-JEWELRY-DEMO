"use client"
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './sliderproduct.module.css';

export default function CategorySlider({ resproduct, resheadingProduct }) {
  
  if (!resheadingProduct) return null;

  return (
    <div className={styles.sliderSection}>
      <div className={styles.textHeader}>
        <p className="heading1">{resheadingProduct.title1}</p>
        <h2 className="heading2">{resheadingProduct.title2}</h2>
        <div className={styles.titleLine}></div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className={styles.mySwiper}
      >
        {resproduct?.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className={styles.catCard}>
              <div className={styles.imgContainer}>
                <img src={cat.images?.[0]} alt={cat.titleEn} />
              </div>
              <div className={styles.catInfo}>
                <h3>{cat.title}</h3>
                <p>{cat.reviewCount}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
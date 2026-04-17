'use client';
import { FaStar, FaRegStar } from "react-icons/fa6";
import styles from './product.module.css';

export default function RatingFilter({ currentLang, selectedRating, setSelectedRating }) {
  const renderStars = (count) => (
    <div className={styles.starsWrapper}>
      {[...Array(5)].map((_, i) => (
        i < count ? <FaStar key={i} color="#ffb400" /> : <FaRegStar key={i} color="#ccc" />
      ))}
    </div>
  );

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.sidebarHeading}>{currentLang === 'am' ? 'ՎԱՐԿԱՆԻՇ' : 'AVERAGE RATING'}</h3>
      {[5, 4, 3].map((num) => (
        <div key={num} className={styles.ratingItem}>
          <input 
            type="checkbox" 
            id={`rating-${num}`}
            checked={Number(selectedRating) === num}
            onChange={() => setSelectedRating(selectedRating === num ? null : num)}
          />
          <label htmlFor={`rating-${num}`} className={styles.ratingLabel}>
            {renderStars(num)}
            <span>{num === 5 ? '(20)' : '& Up'}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
'use client';
import styles from './product.module.css';

export default function PriceFilter({ currentLang, priceRange, setPriceRange }) {
  const priceOptions = [
    { label: "0 - $500.00", min: 0, max: 500 },
    { label: "$500.00 - $1,000.00", min: 500, max: 1000 },
    { label: "$1,000.00 - $2,000.00", min: 1000, max: 2000 },
    { label: "$2,000.00 - $3,000.00", min: 2000, max: 3000 },
  ];

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.sidebarHeading}>{currentLang === 'am' ? 'ԳԻՆ' : 'FILTER BY PRICE'}</h3>
      <div className={styles.priceOptions}>
        {priceOptions.map((option, index) => (
          <div key={index} className={styles.brandItem}>
            <input 
              type="checkbox"
              id={`price-${index}`}
              checked={priceRange.min === option.min && priceRange.max === option.max}
              onChange={() => setPriceRange({ min: option.min, max: option.max })}
            />
            <label htmlFor={`price-${index}`}>{option.label}</label>
          </div>
        ))}
      </div>
      <div className={styles.manualPriceWrapper}>
        <div className={styles.priceInputRow}>
          <input 
            type="number" 
            value={priceRange.min === 0 && priceRange.min !== '' ? '' : priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value === '' ? '' : Number(e.target.value) })}
            className={styles.priceInputSmall}
            placeholder="Min"
          />
          <span className={styles.dash}>-</span>
          <input 
            type="number" 
            value={priceRange.max === 0 && priceRange.max !== '' ? '' : priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value === '' ? '' : Number(e.target.value) })}
            className={styles.priceInputSmall}
            placeholder="Max"
          />
        </div>
        <button className={styles.applyButton} type="button">
           {currentLang === 'am' ? 'ԿԻՐԱՌԵԼ' : 'APPLY'}
        </button>
      </div>
    </div>
  );
}
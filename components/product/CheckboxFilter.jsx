'use client';
import styles from './product.module.css';

export default function CheckboxFilter({ title, items, selectedItems, onToggle }) {
  return (
    <div className={styles.filterSection}>
      <h3 className={styles.sidebarHeading}>{title}</h3>
      {items.map(item => (
        <div key={item} className={styles.brandItem}>
          <input 
             type="checkbox" 
             id={item} 
             checked={selectedItems.includes(item)} 
             onChange={() => onToggle(item)} 
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  );
}
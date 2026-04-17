'use client';
import { createContext, useState, useContext, useMemo, useEffect } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentLang, setCurrentLang] = useState('en');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedRating(null);
  }, [currentLang]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesLang = product.lang === currentLang;
      const matchesSearch = product?.title?.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      
      const cleanPrice = (priceStr) => {
        if (!priceStr) return 0;
        return Number(priceStr.replace(/[$,\s]/g, ''));
      };
      const productPrice = cleanPrice(product.price);
      const minPrice = priceRange.min === '' ? 0 : Number(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : Number(priceRange.max);
      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
      const matchesRating = selectedRating === null || product.rating >= selectedRating;

      return matchesLang && matchesSearch && matchesBrand && matchesCategory && matchesPrice && matchesRating;
    });
  }, [allProducts, search, selectedBrands, selectedCategories, currentLang, priceRange, selectedRating]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearch('');
    setPriceRange({ min: '', max: '' });
    setSelectedRating(null);
  };

  return (
    <ProductContext.Provider value={{
      allProducts,
      products: filteredProducts,
      search,
      setSearch,
      setAllProducts,
      selectedBrands,
      handleBrandChange,
      selectedCategories,
      handleCategoryChange,
      priceRange,      
      setPriceRange,
      selectedRating,
      setSelectedRating,
      currentLang,
      setCurrentLang,
      clearFilters
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
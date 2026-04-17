'use client';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { FaRegHeart } from 'react-icons/fa';

export default function LikeButton({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { openWishlist } = useUI();

  if (!product || !product.id) return null;

  const isLiked = wishlist.some((item) => item.id === product.id);

  const handleLike = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (!isLiked) {
      openWishlist();
    }
  };

  return (
    <button onClick={handleLike}>
      <FaRegHeart/>
    </button>
  );
}
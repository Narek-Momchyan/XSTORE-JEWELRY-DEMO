"use client"
import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export default function UIProvider({ children }) {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    // Ավելացվել է Sidebar-ի վիճակը
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openWishlist = () => setIsWishlistOpen(true);
    const closeWishlist = () => setIsWishlistOpen(false);

    // Sidebar-ի կառավարման ֆունկցիաները
    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    return (
        <UIContext.Provider value={{ 
            isWishlistOpen, openWishlist, closeWishlist,
            isSidebarOpen, openSidebar, closeSidebar, toggleSidebar 
        }}>
            {children}
        </UIContext.Provider>
    );
}

export const useUI = () => useContext(UIContext);
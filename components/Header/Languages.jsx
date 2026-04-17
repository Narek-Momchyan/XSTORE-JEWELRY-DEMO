"use client"
import style from './Header.module.css'
import { useProducts } from '@/context/ProductContext' // Ներմուծում ենք Context-ը
import { useEffect } from 'react'

export default function Languages({ langs }) {
    const { setCurrentLang, currentLang } = useProducts();

    // Սա կապահովի, որ եթե cookie-ում լեզու կա, Context-ը իմանա դրա մասին
    useEffect(() => {
        const savedLang = document.cookie
            .split('; ')
            .find(row => row.startsWith('lang='))
            ?.split('=')[1];
        
        if (savedLang && savedLang !== currentLang) {
            setCurrentLang(savedLang);
        }
    }, []);

    const onchange = (code) => {
        const date = new Date()
        date.setFullYear(date.getFullYear() + 10)
        document.cookie = `lang=${code}; path=/; expires=${date.toUTCString()}`

        setCurrentLang(code);

      
        window.location.reload()
    }

    const activeLangImg = langs.find(l => l.code === currentLang)?.img_route || langs[0]?.img_route;

    return (
        <div className={style.drop_btn}>
            <img src={activeLangImg} className={style.globus} alt="globus" />
            
            <div className={style.drop_content}>
                {langs.map(item => (
                    <p 
                        onClick={() => onchange(item.code)}
                        key={item.id} 
                        className={style.leng}
                        style={{ fontWeight: currentLang === item.code ? 'bold' : 'normal' }}
                    >
                        {item.code}
                    </p>
                ))}
            </div>
        </div>
    )
}
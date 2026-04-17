import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from './footer.module.css';

export default function Footerdata({ footerData, resLogo, navbar }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.brandSection}>
                    <h2 className={styles.logo}>{resLogo?.title}</h2>
                    <p className={styles.description}>{footerData?.description}</p>
                    <div className={styles.socials}>
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>
                </div>

  
                <div className={styles.linksSection}>
                    <h3 className={styles.title}>{footerData?.menuTitle}</h3>
                    <ul className={styles.list}>
                        {navbar?.map(link => (
                            <li key={link.id}>
                                <Link href={link.route}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className={styles.contactSection}>
                    <h3 className={styles.title}>{footerData?.contactTitle}</h3>
                    <p>{footerData?.address}</p>
                    <p>{footerData?.phone}: {footerData?.phonenumber}</p>
                    <p>{footerData?.email}</p>
                </div>
            </div>


            <div className={styles.bottomBar}>
                <p>&copy; {currentYear} {resLogo?.title}. {footerData?.rights}</p>
            </div>
        </footer>
    );
}
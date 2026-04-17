import React from 'react'
import axios from '@/lib/api'
import { getCurrentLang } from '@/lib/Lang'
import Footerdata from './footer'

export default async function Footer() {

    const lang = await getCurrentLang(); 
    
    try {

        const resfooterdata = (await axios.get(`footerData?lang=${lang}`)).data;
        const resLogo = (await axios.get("logo")).data;
        const resnavbar = (await axios.get(`navbar?lang=${lang}`)).data;


        if (!resfooterdata || resfooterdata.length === 0) {
            console.error("Footer data is missing for lang:", lang);
            return null; 
        }

        return (
           <div className='wrapper'>
             <Footerdata 
                resLogo={resLogo} 
                navbar={resnavbar} 
                footerData={resfooterdata[0]} 
            />
           </div>
        );
    } catch (error) {
        console.error("Error fetching footer data:", error);
        return null;
    }
}
import axios from "@/lib/api"; 
import AuthModal from "./AuthModal";
import { getCurrentLang } from "@/lib/Lang";

export default async function Authmod() {

    let registr = null;
    try {
        let lang = await getCurrentLang(); 
        const searchLang = lang === "hy" ? "am" : lang;
        const resregistr = await axios.get(`/registr`);
        const allData = resregistr.data || [];
        registr = allData.find(item => item.lang === searchLang) || allData[0] || null;
    } catch (error) {
        console.error("Authmod fetch error:", error);
    }
    return <AuthModal registr={registr}/>;
}
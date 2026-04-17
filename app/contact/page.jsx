import styles from "./contact.module.css";
export const dynamic = "force-dynamic";

import Form from "./Forma";
import AnimatedContactLeft from "./AnimatedContactLeft";
import axios from '@/lib/api';
import { getCurrentLang } from '@/lib/Lang';

export default async function ContactPage() {
    const lang = await getCurrentLang(); 
    const response = await axios.get(`contact?lang=${lang}`);
    const resContact = response.data;
    const contact = resContact[0];

    return (
        <div className="wrapper">
            <div className={styles.container}>
                <AnimatedContactLeft contact={contact} />

                <Form 
                    formDesc={contact.form_desc} 
                    formTitle={contact.form_title} 
                    buttonText={contact.sendbutton} 
                />
            </div>
        </div>
    );
}
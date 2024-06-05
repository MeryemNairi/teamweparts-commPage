import * as React from 'react';
import  { useEffect, useRef } from 'react';
import styles from './CommPage.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import FirstBanner from './First Banner/FirstBanner';
import LatestNews from './LartestNews/LatestNews';
import UpEvents from './Upcoming Events/UpEvents';
import Qlinks from './Quick Links/Qlinks';
import Footer from './Footer/footer';
import Navbar from './Header/navbar';
import SavoirPlus from './First Banner/SavoirPlus';
import ContactUs from './Contactez nous/ContactUs';
import Forme from './PeopleSearch/Forme';

const CommPage: React.FC<{ context: WebPartContext }> = ({ context }) => {
    const [showSavoirPlus, setShowSavoirPlus] = React.useState(false);
    const savoirPlusRef = useRef<HTMLDivElement>(null);

    const handleShowSavoirPlus = () => {
        setShowSavoirPlus(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (savoirPlusRef.current && !savoirPlusRef.current.contains(event.target as Node)) {
            setShowSavoirPlus(false);
        }
    };

    useEffect(() => {
        if (showSavoirPlus) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSavoirPlus]);

    return (
        <div className={styles.CommPage}>
            <Forme context={context} />
            <Navbar />
            <FirstBanner onShowSavoirPlus={handleShowSavoirPlus} />
            <div
                ref={savoirPlusRef}
                className={`${styles.savoirPlusContainer} ${showSavoirPlus ? styles.savoirPlusEnterActive : styles.savoirPlusExitActive}`}
            >
                <SavoirPlus />
            </div>
            <LatestNews context={context} />
            <UpEvents />
            <ContactUs />
            <Qlinks />
            <Footer />
        </div>
    );
};

export default CommPage;
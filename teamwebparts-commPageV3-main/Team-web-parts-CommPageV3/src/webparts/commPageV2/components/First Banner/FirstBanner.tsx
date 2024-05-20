import * as React from 'react';
import styles from './FirstBanner.module.scss';
import Motif from '../../components/assets/Motif.svg';
import Illustration from '../../components/assets/Illustration.svg';
import Logo from '../../components/assets/Logo.svg';

const FirstBanner: React.FC = () => {
    return (
        <div className={styles.FirstBanner_container}>
            <div className={styles.FB_background}>

            </div>
            <div className={styles.FB_Motif}>
                <img src={Motif} alt="Motif" />
            </div>
            <div className={styles.FB_Illustration}>
                <img src={Illustration} alt="Illustration" />
            </div>
            <div className={styles.FB_Logo}>
                <img src={Logo} alt="Logo" />
            </div>
        </div>
    );
};

export default FirstBanner;

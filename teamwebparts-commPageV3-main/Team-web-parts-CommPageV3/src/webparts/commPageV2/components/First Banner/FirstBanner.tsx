import * as React from 'react';
import styles from './FirstBanner.module.scss';

interface FirstBannerProps {
    onShowSavoirPlus: () => void;
}

const FirstBanner: React.FC<FirstBannerProps> = ({ onShowSavoirPlus }) => {
    const backgroundImageStyle: React.CSSProperties = {
        backgroundImage: `url(${require('./BackgroundCom.png')})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '50vh',
        minWidth: '50vw',
    };

    const cardContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '20%',
        transform: 'translate(-50%, -50%)',
        paddingLeft: '20px', // Ajustement de la marge à gauche
    };

    return (
        <div className={styles.FirstBanner_container} style={backgroundImageStyle}>
            <div className={styles.FB_background}>
                <div className={styles.shape_holder}>
                    
                </div>

                <div style={cardContainerStyle}>
                    <div className={styles.card}>
                        <h2 style={{ fontWeight: 'bold', color: '#000' }}>Reconnaissez un collègue ou une équipe aujourd'hui !</h2>
                        <p>Célébrez le travail d'équipe exceptionnel à l'aide de notre portail "Meilleurs Ensemble", ou soumettez une candidature pour un collègue pour un prix d'excellence et d'innovation.</p>
                        <button style={{ backgroundColor: '#58C1A3', border: 'none'}} onClick={onShowSavoirPlus}>En savoir plus</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstBanner;

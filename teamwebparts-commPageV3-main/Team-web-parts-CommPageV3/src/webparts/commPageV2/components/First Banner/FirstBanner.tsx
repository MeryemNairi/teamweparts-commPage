import * as React from 'react';
import styles from './FirstBanner.module.scss';

interface FirstBannerProps {
    onShowSavoirPlus: () => void;
}

const FirstBanner: React.FC<FirstBannerProps> = ({ onShowSavoirPlus }) => {
    const containerStyle: React.CSSProperties = {
        height: '400px', 
    };

    const backgroundImageStyle: React.CSSProperties = {
        backgroundImage: `url(${require('./BackgroundCom.png')})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100%',
        minWidth: '100%',
    };

    const cardContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '5%',
        transform: 'translate(0, -50%)', 
        paddingRight: '20px', 
    };

    return (
        <div className={styles.FirstBanner_container} style={containerStyle}>
            <div className={styles.FB_background} style={backgroundImageStyle}>
                <div className={styles.shape_holder}>
                    <div className={styles.FB_content}>
                        <p>
                            <span style={{ display: 'block' }}>Unite,</span>
                            <span style={{ display: 'block', color: '#044124' }}>Communicate,</span>
                            <span style={{ display: 'block', color: '#8EB1E3' }}>Succeed,</span>
                        </p>
                    </div>
                </div>

                <div style={cardContainerStyle}>
                    <div className={styles.card}>
                        <h2 style={{ fontWeight: 'bold', color: '#000' }}> Rencontrez Notre Équipe de Communication aujourd'hui !</h2>
                        <p> Découvrez les personnes qui donnent vie à nos projets de communication. Notre équipe dévouée et créative est là pour vous connecter et innover. Explorez maintenant notre équipe exceptionnelle.</p>
                        <button style={{ padding: '10px 20px', backgroundColor: '#58C1A3', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onShowSavoirPlus}>En savoir plus</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstBanner;

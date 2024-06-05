import * as React from 'react';
import './SavoirPlus.css';


const SavoirPlus: React.FC = () => {
    return (
        <>
            <div style={{ background: '#DFF9F1' }}>
                <h1 className="title">Notre équipe</h1>
                <div className="team-row">
                    <div className="member">
                        <img src="https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80" alt="" />
                        <h2>Yousra Tounsi</h2>
                        <p>Communications Manager • People & Culture</p>
                    </div>
                    <div className="member">
                        <img src= './ComPics/Safae Assa.jpg' alt="Safae Assa" />
                        <h2>Safae Assa</h2>
                        <p>Chargé (e) de Communications • People & Culture</p>
                    </div>
                    <div className="member">
                        <img src='./ComPics/Soufyane Chdid.jpg' alt="Soufyane Chdid" />
                        <h2>Soufyane Chdid</h2>
                        <p>Graphic Designer • People & Culture</p>
                    </div>
                    <div className="member">
                        <img src="https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80" alt="" />
                        <h2>Jalal Benaych</h2>
                        <p>Graphic Designer • People & Culture</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SavoirPlus;

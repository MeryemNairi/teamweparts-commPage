import * as React from 'react';
import './SavoirPlus.css';

const SavoirPlus: React.FC = () => {
    return (
        <>
            <h1 className="title">our team</h1>
            <div className="team-row">
                <div className="member">
                    <img src="https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80" alt="" />
                    <h2>ben smith</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum similique eligendi numquam.</p>
                </div>
                <div className="member">
                    <img src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />
                    <h2>jason</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum similique eligendi numquam.</p>
                </div>
                <div className="member">
                    <img src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="" />
                    <h2>chris jones</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum similique eligendi numquam.</p>
                </div>
            </div>
        </>
    );
};

export default SavoirPlus;

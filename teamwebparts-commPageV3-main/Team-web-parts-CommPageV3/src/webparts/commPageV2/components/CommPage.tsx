import * as React from 'react';
import styles from './CommPage.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import FirstBanner from './First Banner/FirstBanner';
import LatestNews from './LartestNews/LatestNews';
import UpEvents from './Upcoming Events/UpEvents';
import Qlinks from './Quick Links/Qlinks';
import Footer from './Footer/footer';
import Navbar from './Header/navbar';
import CommentV1 from './LartestNews/CommentsV5';

const CommPage: React.FC<{ context: WebPartContext }> = ({ context }) => {
    return (
        <div className={styles.CommPage}>
            <Navbar />
            <FirstBanner />
            <LatestNews context={context} />
            <UpEvents />
            <Qlinks />
            <CommentV1 />
            <Footer />
        </div>
    );
};

export default CommPage;

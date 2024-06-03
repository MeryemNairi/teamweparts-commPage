import * as React from 'react';
import styles from './UpEvents.module.scss';

import { EventsItem, fetchLatestNewsData } from './Fetchdata/FetchData'; // Assuming you have the service file





export interface ICommentV1Props {
    description: string;
  }
  
  export interface ICommentV1State {
    newComment: string;
    userEmail: string;
  }
  
  

const UpEvents: React.FC = () => {
    const [showPopup, setShowPopup] = React.useState(false);
    const [popupImageUrl, setPopupImageUrl] = React.useState('');
    const [events, setEvents] = React.useState<EventsItem[]>([]); // State to hold the fetched events

    // Fetch data on component mount
    React.useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await fetchLatestNewsData();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, []);

    const togglePopup = (imageUrl: string) => {
        setShowPopup(!showPopup);
        setPopupImageUrl(imageUrl);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleGiveFeedbackClick = (imageUrl: string) => {
        togglePopup(imageUrl);
    };


         //------------------------------->scrolling behavior<----------------
         const cardsContainerRef = React.useRef<HTMLDivElement>(null);


         const scrollLeft = () => {
            if (cardsContainerRef.current) {
                cardsContainerRef.current.scrollBy({ left: -500, behavior: 'smooth' });
            }
        };
    
        const scrollRight = () => {
            if (cardsContainerRef.current) {
                cardsContainerRef.current.scrollBy({ left: 500, behavior: 'smooth' });
            }
        };
  

  



  

  
    
    
    return (
        <div className={styles.UpEvents}>
            <div className={styles.UpE_left}>

                <div className={styles.UpEl_title}>
                    <div className={styles.title_icon}>
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.57008 2.75C10.1442 2.75 10.6096 3.17619 10.6096 3.70192V5.62214C11.5316 5.60577 12.5651 5.60577 13.728 5.60577H13.728H19.272H19.272C20.4349 5.60577 21.4684 5.60577 22.3904 5.62214V3.70192C22.3904 3.17619 22.8558 2.75 23.4299 2.75C24.004 2.75 24.4694 3.17619 24.4694 3.70192V5.70636C26.4643 5.85265 27.7739 6.21167 28.7361 7.09277C29.6982 7.97386 30.0903 9.17316 30.25 11V12.375H2.75V11C2.90974 9.17316 3.30178 7.97386 4.26393 7.09277C5.22608 6.21167 6.5357 5.85265 8.53059 5.70636V3.70192C8.53059 3.17619 8.99598 2.75 9.57008 2.75Z" fill="#002920"/>
                        <path opacity="0.5" d="M30.25 19.25V16.5C30.25 15.3463 30.2326 13.2897 30.2148 12.375H2.75805C2.74032 13.2897 2.75776 15.3463 2.75776 16.5V19.25C2.75776 24.4354 2.75776 27.0282 4.36821 28.6391C5.97867 30.25 8.57067 30.25 13.7547 30.25H19.2531C24.4371 30.25 27.0291 30.25 28.6395 28.6391C30.25 27.0282 30.25 24.4354 30.25 19.25Z" fill="#00966C"/>
                        <path d="M24.75 22.6875C24.75 23.8266 23.8266 24.75 22.6875 24.75C21.5484 24.75 20.625 23.8266 20.625 22.6875C20.625 21.5484 21.5484 20.625 22.6875 20.625C23.8266 20.625 24.75 21.5484 24.75 22.6875Z" fill="#002920"/>
                        </svg>

                    </div>
                    <div className={styles.title}>
                            <p>
                                Evénements à venir 
                            </p>
                    </div>
                </div>

                <div className={styles.CardGridContain} ref={cardsContainerRef}>
                    <div className={styles.Cards_container} >

                        
                    {events.map((event, index) => (
                        
                        <div key={index} className={styles.card}>
                            <div className={styles.card_image}>
                            {/* Use the ImgUrl from the event */}
                            <img src={event.ImgUrl} alt={event.Event} />

                            </div>
                            <div className={styles.card_content}>
                            <div className={styles.EvTitle}>
                                <p>{event.Event}</p>
                                </div>
                                <div className={styles.EvDescription}>
                                <p>{event.Desciption}</p>
                                </div>
                                <div className={styles.EvFeedback}>
                                <button className={styles.GivFeed} onClick={() => handleGiveFeedbackClick(event.ImgUrl)}>
                                    <p>
                                        Voir plus
                                    </p>
                                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3858 0.294119C12.6241 0.0374165 13.0255 0.0225523 13.2822 0.260919L17.6936 4.35724C18.4944 5.10087 18.9495 6.14438 18.9495 7.23724C18.9495 8.38928 18.444 9.4833 17.5667 10.23L13.2617 13.8944C12.9949 14.1215 12.5946 14.0893 12.3676 13.8226C12.1405 13.5558 12.1727 13.1555 12.4394 12.9284L16.7445 9.26402C17.3386 8.75832 17.6809 8.01742 17.6809 7.23724C17.6809 6.49713 17.3727 5.79044 16.8304 5.28684L12.419 1.19052C12.1623 0.952153 12.1474 0.550821 12.3858 0.294119ZM10.8086 1.05091C10.8195 1.06057 10.8304 1.07026 10.8413 1.07997L14.2358 4.09735C14.8692 4.66033 15.3943 5.12703 15.7548 5.5507C16.1337 5.99597 16.4035 6.47536 16.4035 7.06858C16.4035 7.66179 16.1337 8.14118 15.7548 8.58646C15.3943 9.01012 14.8692 9.47682 14.2358 10.0398L10.8413 13.0572C10.8304 13.0669 10.8195 13.0766 10.8086 13.0862C10.5342 13.3302 10.2782 13.5579 10.0569 13.704C9.83968 13.8474 9.44465 14.0557 9.00211 13.857C8.55957 13.6583 8.45284 13.2246 8.41572 12.967C8.37791 12.7046 8.37797 12.3619 8.37803 11.9948C8.37803 11.9802 8.37803 11.9656 8.37803 11.951V10.6245C7.15048 10.7091 5.90654 11.0351 4.81844 11.5653C3.53892 12.1888 2.51706 13.0728 1.96248 14.1291C1.82683 14.3875 1.53239 14.52 1.24905 14.4501C0.965715 14.3803 0.766602 14.1261 0.766602 13.8343C0.766602 9.84171 1.93485 7.242 3.60524 5.64375C5.06122 4.25065 6.83575 3.67901 8.37803 3.55938V2.18614C8.37803 2.17152 8.37803 2.15694 8.37803 2.1424C8.37797 1.77525 8.37791 1.43259 8.41572 1.1702C8.45284 0.912535 8.55957 0.47886 9.00211 0.280131C9.44465 0.0814016 9.83968 0.289752 10.0569 0.433187C10.2782 0.579249 10.5342 0.806942 10.8086 1.05091ZM9.64919 1.72109C9.74482 1.80304 9.85899 1.90411 9.9985 2.02811L13.3579 5.01427C14.0354 5.61649 14.4925 6.02479 14.7887 6.37281C15.0731 6.70704 15.135 6.90223 15.135 7.06858C15.135 7.23492 15.0731 7.43011 14.7887 7.76434C14.4925 8.11236 14.0354 8.52066 13.3579 9.12288L9.9985 12.109C9.85899 12.233 9.74482 12.3341 9.64919 12.4161C9.64691 12.2901 9.6466 12.1377 9.6466 11.951V9.96817C9.6466 9.61786 9.36262 9.33388 9.01232 9.33388C7.39483 9.33388 5.71399 9.71778 4.26277 10.4249C3.48571 10.8035 2.76232 11.2811 2.14844 11.8526C2.46031 9.27574 3.3819 7.61316 4.48225 6.56034C5.85234 5.24942 7.58342 4.80327 9.01232 4.80327C9.36262 4.80327 9.6466 4.51929 9.6466 4.16898V2.18614C9.6466 1.99948 9.64691 1.847 9.64919 1.72109Z" fill="#00AB84"/>
                                    </svg>

                                </button>
                            </div>
                            </div>
                        </div>
                     ))}

                        




                    </div>
                </div>

                <div className={styles.controll_btns}>

                             <button className={styles.btn_left} onClick={scrollLeft}>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33684 8.00745L7.34001 12.0088M3.33684 8.00745L7.3382 4.00428M3.33684 8.00745L12.6755 8.00534" stroke="#044123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <button className={styles.btn_right} onClick={scrollRight}>
                                <p>
                                    Défilez
                                </p>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6749 8.00745L8.67171 12.0088M12.6749 8.00745L8.67352 4.00428M12.6749 8.00745L3.33626 8.00534" stroke="#044123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                </div>

                


            </div>
            
            {/* Popup */}
            {showPopup && (
                    <div className={styles.popup}>
                        <div className={styles.popup_content}>
                            <span className={styles.close} onClick={handlePopupClose}>
                                &times;
                            </span>
                            <img src={popupImageUrl} alt="Popup Image" />
                        </div>
                    </div>
            )}



            
        </div>
    );
};

export default UpEvents;


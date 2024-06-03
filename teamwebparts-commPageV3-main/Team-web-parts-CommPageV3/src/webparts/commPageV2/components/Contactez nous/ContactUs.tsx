import * as React from 'react';
import styles from './ContactUs.module.scss';
import ContactService from '../Contactez nous/services/ContactService';


const ContactUs : React.FC = () => {

    const [newComment, setNewComment] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const contactService = new ContactService();

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
      };
    
      const handleSubmit = async () => {
        if (!newComment) return;
    
        try {
          const currentUserEmail = await contactService.getCurrentUserEmail();
          await contactService.postComment(newComment, currentUserEmail);
          setNewComment('');
          alert('Message submitted successfully!'); // Display system message
        } catch (error) {
          console.error('Error submitting comment:', error);
        }
      };

      React.useEffect(() => {
        async function fetchUserEmail() {
          try {
            const email = await contactService.getCurrentUserEmail();
            setUserEmail(email);
          } catch (error) {
            console.error('Error getting current user email:', error);
          }
        }
        fetchUserEmail();
      }, []);

    return (
        <div className={styles.ContactUs_main}>
            
            <div className={styles.ContactUs_container}>
              <div className={styles.container}>
              <div className={styles.left_img}>
              <img src="/sites/CnexiaForEveryone/Assets/ButtomBN.png" alt="" />
            </div>
              <div className={styles.UpE_right}>
                <div className={styles.Contact_title}>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M18.7395 28.1488L17.9941 29.4081C17.3298 30.5305 15.6701 30.5305 15.0058 29.4081L14.2604 28.1488C13.6823 27.172 13.3932 26.6836 12.9288 26.4135C12.4645 26.1435 11.8799 26.1334 10.7107 26.1132C8.98455 26.0835 7.90197 25.9777 6.99405 25.6017C5.30948 24.9039 3.9711 23.5655 3.27333 21.8809C2.75 20.6175 2.75 19.0158 2.75 15.8125V14.4375C2.75 9.93653 2.75 7.68605 3.7631 6.03282C4.32998 5.10775 5.10775 4.32998 6.03282 3.7631C7.68605 2.75 9.93653 2.75 14.4375 2.75H18.5625C23.0635 2.75 25.314 2.75 26.9672 3.7631C27.8922 4.32998 28.67 5.10775 29.2369 6.03282C30.25 7.68605 30.25 9.93653 30.25 14.4375V15.8125C30.25 19.0158 30.25 20.6175 29.7267 21.8809C29.0289 23.5655 27.6905 24.9039 26.0059 25.6017C25.098 25.9777 24.0154 26.0835 22.2893 26.1132C21.1201 26.1334 20.5354 26.1435 20.0711 26.4135C19.6068 26.6836 19.3177 27.172 18.7395 28.1488L18.7395 28.1488Z" fill="#00966C"/>
                    <path d="M23.375 15.125C23.375 15.8844 22.7594 16.5 22 16.5C21.2406 16.5 20.625 15.8844 20.625 15.125C20.625 14.3656 21.2406 13.75 22 13.75C22.7594 13.75 23.375 14.3656 23.375 15.125Z" fill="#002920"/>
                    <path d="M17.875 15.125C17.875 15.8844 17.2594 16.5 16.5 16.5C15.7406 16.5 15.125 15.8844 15.125 15.125C15.125 14.3656 15.7406 13.75 16.5 13.75C17.2594 13.75 17.875 14.3656 17.875 15.125Z" fill="#002920"/>
                    <path d="M12.375 15.125C12.375 15.8844 11.7594 16.5 11 16.5C10.2406 16.5 9.625 15.8844 9.625 15.125C9.625 14.3656 10.2406 13.75 11 13.75C11.7594 13.75 12.375 14.3656 12.375 15.125Z" fill="#002920"/>
                    </svg>

                    <p>
                     Contactez-nous 
                    </p>

                </div>
                <div className={styles.Contact_content}>
                    <p>
                    Vous avez une idée ? Une suggestion ? Partagez là avec nous en remplissant ce formulaire.
                    </p>
                </div>
                <div className={styles.contact_form}>
                    <div className={styles.Email}>
                        <p>
                            Email
                        </p>
                        <input type="text" placeholder="Votre adresse e-mail" value={userEmail} disabled  />
                    </div>
                    <div className={styles.textArea}>
                        <p>
                            Message
                        </p>
                        <textarea
                            className={styles.contactTextArea} 
                            placeholder="Contactez-nous et nous vous répondrons dans les meilleurs délais."
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                    </div>
                    <div className={styles.SubBtn}>
                        <button className={styles.subCbtn} type="button" onClick={handleSubmit}>
                            Envoyer
                        </button>
                    </div>
                </div>

            </div>
              </div>
            </div>
        </div>
    );
};

export default ContactUs;
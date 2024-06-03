import * as React from 'react';
import { IFormProps, IFormData } from './IFormProps';
import { submitForm, getFormData, deleteFormData } from './FormeService';
import styles from './Forme.module.scss';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
//import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export const Forme: React.FC<IFormProps> = ({ context, newsId }) => {
  const [formData] = React.useState<IFormData>({
    id: 0,
    user: context.pageContext.user.displayName,
    likes: 1,
    newsId: newsId
  });

  const [formEntries, setFormEntries] = React.useState<IFormData[]>([]);
  const [showReactionOptions, setShowReactionOptions] = React.useState<boolean>(false);
  //const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchFormData();
    const interval = setInterval(fetchFormData, 2000); // MAJ les données

    return () => clearInterval(interval); // Nettoiage
  }, []);

  const fetchFormData = async () => {
    try {
      const formData = await getFormData(newsId);
      setFormEntries(formData); // MAJ
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleSubmit = async (type: 'like' | 'dislike' | 'clear') => {
    try {
      const existingEntryIndex = formEntries.findIndex(
        entry => entry.user === formData.user
      );

      if (existingEntryIndex !== -1) {
        const existingEntry = formEntries[existingEntryIndex];
        await deleteFormData(existingEntry.id);
        const updatedEntries = [...formEntries];
        updatedEntries.splice(existingEntryIndex, 1);
        setFormEntries(updatedEntries);
        if (type === 'clear') {
          return;
        }
      }

      if (type !== 'clear') {
        await submitForm({
          ...formData,
          likes: type === 'like' ? 1 : -1
        });
      }

      fetchFormData(); // Rafraîchit les données
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const isUserLiked = formEntries.some(entry => entry.user === formData.user && entry.likes === 1);
  const isUserDisliked = formEntries.some(entry => entry.user === formData.user && entry.likes === -1);

  const totalLikesByNewsId = (id: number) => {
    return formEntries.reduce((total, entry) => {
      if (entry.newsId === id) {
        return total + entry.likes;
      }
      return total;
    }, 0);
  };

  return (
    <div>
      <div
        className={styles.button_holder}
        onMouseEnter={() => setShowReactionOptions(true)}
        onMouseLeave={() => setShowReactionOptions(false)}
        onClick={() => handleSubmit('clear')}
      >
        <button type="button" className={styles.button}>
          {isUserLiked ? (
            <ThumbUpAltIcon style={{ color: '#5284DD', fontSize: '25px' }} />
          ) : isUserDisliked ? (
            <ThumbDownAltIcon style={{ color: '#5284DD', fontSize: '25px' }} />
          ) : (
            <ThumbUpOffAltIcon style={{ color: 'white', fontSize: '25px' }} />
          )}
          <span style={{ color: 'white', fontSize: '12px', display: 'flex', height: '25px', alignItems: 'self-end' }}>
            {totalLikesByNewsId(newsId)}
          </span>
        </button>

        {showReactionOptions && (
          <div className={styles.reactionOptions}>
            <button
              type="button"
              className={styles.reactionButton}
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit('like');
              }}
            >
              <ThumbUpAltIcon style={{ color: '#5284DD', fontSize: '25px' }} />
            </button>
            <button
              type="button"
              className={styles.reactionButton}
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit('dislike');
              }}
            >
              <ThumbDownAltIcon style={{ color: '#5284DD', fontSize: '25px' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forme;

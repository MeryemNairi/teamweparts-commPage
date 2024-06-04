import * as React from 'react';
import { IFormProps, IFormData } from './IFormProps';
import { submitForm, getFormData, deleteFormData } from './FormeService';
import styles from './Forme.module.scss';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export const Forme: React.FC<IFormProps> = ({ context, newsId }) => {
  const [formData] = React.useState<IFormData>({
    id: 0,
    user: context.pageContext.user.displayName,
    likes: 1,
    newsId: newsId
  });

  const [formEntries, setFormEntries] = React.useState<IFormData[]>([]);

  React.useEffect(() => {
    fetchFormData();
    const interval = setInterval(fetchFormData, 2000); // MAJ les données

    return () => clearInterval(interval); // Nettoyage
  }, []);

  const fetchFormData = async () => {
    try {
      const formData = await getFormData(newsId);
      setFormEntries(formData); // MAJ
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleLike = async () => {
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
      } else {
        await submitForm({
          ...formData,
          likes: 1
        });
        fetchFormData(); // Rafraîchit les données
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const handleDislike = async () => {
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
      } else {
        await submitForm({
          ...formData,
          likes: -1
        });
        fetchFormData(); // Rafraîchit les données
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const isUserLiked = formEntries.some(entry => entry.user === formData.user && entry.likes === 1);
  const isUserDisliked = formEntries.some(entry => entry.user === formData.user && entry.likes === -1);

  const totalLikes = formEntries.reduce((total, entry) => entry.likes === 1 ? total + 1 : total, 0);
  const totalDislikes = formEntries.reduce((total, entry) => entry.likes === -1 ? total + 1 : total, 0);

  return (
    <div className={styles.button_holder}>
      <div className={styles.button}>
        <ThumbUpAltIcon
          onClick={handleLike}
          style={{ color: isUserLiked ? '#5284DD' : 'white', fontSize: '20px', cursor: 'pointer' }}
        />
        <span style={{ color: 'white', fontSize: '12px', marginRight: '10px' }}>{totalLikes}</span>
        <ThumbDownAltIcon
          onClick={handleDislike}
          style={{ color: isUserDisliked ? '#ECB25A' : 'white', fontSize: '20px', cursor: 'pointer' }}
        />
        <span style={{ color: 'white', fontSize: '12px', marginLeft: '10px' }}>{totalDislikes}</span>
      </div>
    </div>
  );
};

export default Forme;

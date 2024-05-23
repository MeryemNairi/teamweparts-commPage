import { sp } from '@pnp/sp';

export interface IComment {
  comment: string;
  date: Date;
  User: string;
  newsNews: string;

}

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

export default class CommentService {
  async getComments(): Promise<IComment[]> {
    try {
      const response = await sp.web.lists.getByTitle("CommentV3").items.select("comment", "date", "User", "newsNews").get();
      
      const formattedComments = response.map((comment) => ({
        ...comment,
        date: formatDate(comment.date) 
      }));
      return formattedComments;
    } catch (error) {
      throw new Error('Error fetching comments');
    }
  }

  



}
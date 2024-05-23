import * as React from 'react';
import CommentService, { IComment } from './services/CommentService';

interface ICommentV1State {
  newComment: string;
  comments: IComment[];
  isSidebarOpen: boolean;
}

export default class CommentV1 extends React.Component<{}, ICommentV1State> {
  private commentService: CommentService;
  private dropdownRef: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      newComment: '',
      comments: [],
      isSidebarOpen: false,
    };
    this.commentService = new CommentService();
    this.dropdownRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    this.fetchComments();
    setInterval(this.fetchComments, 10000);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  fetchComments = async () => {
    try {
      const comments = await this.commentService.getComments();
      this.setState({ comments });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newComment: event.target.value });
  };



  toggleSidebar = () => {
    this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  };

  handleClickOutside = (event: MouseEvent) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target as Node)) {
      this.setState({ isSidebarOpen: false });
    }
  };

  render() {
    const { comments, isSidebarOpen } = this.state;
    return (
      <div style={{ backgroundColor: '#58C1A3' }}>
        <div style={{ position: 'relative', display: 'inline-block', left: '800px',width: '300px' }}>
          {/* Bouton d'affichage de la liste des commentaires */}
          <button
            onClick={this.toggleSidebar}
            style={{
              background: '#002920', // Vert foncé
              color: '#fff', // Texte blanc
              border: 'none',
              padding: '8px 16px',
              borderRadius: '1px',
              cursor: 'pointer',
              width: '300px',
              zIndex: 2, // Assure que le bouton est au-dessus du composant de commentaire
            }}
          >
            {isSidebarOpen ? 'Masquer les commentaires' : 'Afficher les commentaires'}
          </button>
          {isSidebarOpen && (
            <div
              ref={this.dropdownRef}
              style={{
                position: 'absolute',
                bottom: '100%', // Changement ici : positionnement en haut
                left: 0,
                right: 0,
                maxHeight: '900px', // Hauteur maximale pour activer le défilement
                overflowY: 'auto', // Activer le défilement vertical si nécessaire
                background: '#fff', // Vert clair
                border: '1px solid #ccc',
                zIndex: 1,
              }}
            >
              {comments.map((comment, index) => (
                <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span>
                        <div style={{ color: '#0073e6', fontWeight: 'bold', fontSize: '13px' }}>
                          #{comment.newsNews}
                        </div>                      
                        <div >
                          <small style={{ color: 'black', fontWeight: 'bold', fontSize: 'larger' }}>
                            {comment.User}
                          </small>
                          &nbsp;<span>:</span>&nbsp;
                          <small style={{ color: 'black', fontSize: 'larger' }}>
                            {comment.comment}
                          </small>
                        </div>
                      </span>
                    </div>
                    <small style={{ color: 'black', fontSize: '15px', fontStyle: 'italic' }}>{comment.date}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );


  }
}
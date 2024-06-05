import * as React from 'react';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { IFormProps, IFormData } from './IFormProps';

export const Forme: React.FC<IFormProps> = ({ context }) => {
  const [formEntries, setFormEntries] = useState<IFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const formData = await readExcelFile();
      setFormEntries(formData);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const readExcelFile = async (): Promise<IFormData[]> => {
    try {
      const response = await fetch('https://cnexia.sharepoint.com/sites/CnexiaForEveryone/Shared%20Documents/query.xlsx');
      const data = await response.arrayBuffer();

      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

      const formData: IFormData[] = rawData
        .slice(1)
        .map((row: any) => ({
          Nom: row[0],
          Prenom: row[1],
          Birthday: parseDate(row[2]) as Date,
        }));

      return formData;
    } catch (error) {
      console.error('Error reading Excel file:', error);
      throw new Error('An error occurred while reading Excel file. Please try again.');
    }
  };

  const parseDate = (dateString: any): Date | string => {
    if (!dateString) return '';

    if (typeof dateString === 'number') {
      return new Date((dateString - (25567 + 1)) * 86400 * 1000);
    } else if (typeof dateString === 'string') {
      return new Date(dateString);
    } else {
      return dateString;
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };

  const filteredEntries = formEntries.filter(entry => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    return searchTerms.every(term =>
      entry.Nom.toLowerCase().includes(term) ||
      entry.Prenom.toLowerCase().includes(term)
    );
  }).slice(0, 4);  // Limiter les résultats à 4

  const handleSuggestionClick = (nom: string, prenom: string) => {
    setSearchTerm(`${prenom} ${nom}`);
    setShowSuggestions(false);
  };

  return (
    <div style={{ backgroundColor: '#044123', padding: '20px', height: '18px', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Rechercher par nom ou prénom"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '5px',
            width: '400px', // Largeur de la barre de recherche
            height: '25px',
            backgroundColor: 'white', // Couleur de fond de la barre de recherche
            color: 'black', // Couleur du texte de la barre de recherche
            border: 'none',
            borderRadius: '20px',
            outline: 'none',
            position: 'absolute',
            top: '50%', // Centrer verticalement
            left: '50%', // Centrer horizontalement
            transform: 'translate(-50%, -50%)', // Déplacer de moitié de la largeur et hauteur dans la direction opposée
            marginTop: '5px', // Moitié de la hauteur de la barre de recherche pour aligner le haut
          }}
        />
        {showSuggestions && searchTerm && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 15px)', // Placer directement sous la barre de recherche
            left: '50%', // Centrer horizontalement
            transform: 'translateX(-50%)', // Centrer horizontalement
            width: '400px', // Même largeur que la barre de recherche
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            zIndex: 1
          }}>
            {filteredEntries.map((entry, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(entry.Nom, entry.Prenom)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
              >
                {entry.Prenom} {entry.Nom}
              </div>
            ))}
            {filteredEntries.length === 0 && (
              <div style={{ padding: '10px', color: 'gray' }}>Aucun résultat trouvé</div>
            )}
          </div>
        )}
      </div>
    </div>
  );  
};

export default Forme;

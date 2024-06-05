import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { IFormProps, IFormData } from './IFormProps';

export const Forme: React.FC<IFormProps> = ({ context }) => {
  const [formEntries, setFormEntries] = useState<IFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFormData();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

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
    <div style={{ position: 'relative' }} onClick={() => setShowSuggestions(false)}>
      <div style={{ backgroundColor: '#044123', padding: '20px', height: '60px', width: '100%' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Search for any collaborator or coleague"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: '5px 30px 5px 40px',
              width: '400px',
              height: '25px',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '20px',
              outline: 'none',
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 39 39\' fill=\'%23044123\'><circle cx=\'19.5\' cy=\'19.5\' r=\'19.5\' fill-opacity=\'0.83\'/><path d=\'M7 30V29.0048C7 25.1574 10.504 22.0385 14.8264 22.0385C19.1489 22.0385 22.6529 25.1574 22.6529 29.0048V30\' stroke=\'white\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/><path d=\'M14.8267 22.0385C17.2966 22.0385 19.299 20.2562 19.299 18.0577C19.299 15.8592 17.2966 14.0769 14.8267 14.0769C12.3568 14.0769 10.3545 15.8592 10.3545 18.0577C10.3545 20.2562 12.3568 22.0385 14.8267 22.0385Z\' stroke=\'white\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/><path d=\'M19.9629 23.6923C19.9629 21.7692 21.7385 18.9615 26.0609 18.9615C30.3833 18.9615 33.8873 22.0805 33.8873 25.9279V26.9231\' stroke=\'%2300966C\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/><path d=\'M26.0611 18.9615C28.531 18.9615 30.5334 17.1793 30.5334 14.9808C30.5334 12.7823 28.531 11 26.0611 11C23.5912 11 21.5889 12.7823 21.5889 14.9808C21.5889 17.1793 23.5912 18.9615 26.0611 18.9615Z\' stroke=\'%2300966C\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/></svg>")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '10px center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              marginTop: '5px',
            }}
          />
                   {showSuggestions && searchTerm && (
            <div
              ref={suggestionsRef}
              style={{
                position: 'absolute',
                top: 'calc(100% + 15px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                zIndex: 1,
              }}
            >
              {filteredEntries.map((entry, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(entry.Nom, entry.Prenom)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
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
      <div style={{ position: 'absolute', top: '9px', right: '8px' }}>
        <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 15.1289L16.0031 0H34.002C38.4186 0 42 3.41143 42 7.61841V24.7564L25.997 40V19.8483C25.997 17.2257 23.7603 15.1087 21.0071 15.1222H0.00708477L0 15.1289Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default Forme;


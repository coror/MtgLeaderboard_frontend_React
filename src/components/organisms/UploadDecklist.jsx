import React, { useState, useEffect } from 'react';
import Parse from 'parse';

function UploadDecklist({ onUploadSuccess }) {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState('');
  const [decklistText, setDecklistText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all decks on mount WITHOUT master key
  useEffect(() => {
    async function fetchDecks() {
      try {
        const Edh = Parse.Object.extend('Edh');
        const query = new Parse.Query(Edh);
        query.select(['deckName', 'rank']); // select only needed fields
        query.ascending('rank');
        const results = await query.find(); // no masterKey here
        setDecks(results);
        if (results.length > 0) setSelectedDeckId(results[0].id);
      } catch (err) {
        setError('Failed to load decks: ' + err.message);
      }
    }

    fetchDecks();
  }, []);

  const handleUpload = async () => {
    if (!decklistText.trim()) {
      setError('Decklist cannot be empty.');
      return;
    }
    if (!selectedDeckId) {
      setError('Please select a deck first.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const Edh = Parse.Object.extend('Edh');
      const query = new Parse.Query(Edh);
      const deck = await query.get(selectedDeckId);

      deck.set('decklist', decklistText);

      await deck.save();

      setLoading(false);
      setDecklistText('');
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error uploading decklist');
    }
  };

  return (
    <div>
      <h3>Upload Decklist</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Select Deck:{' '}
        <select
          value={selectedDeckId}
          onChange={(e) => setSelectedDeckId(e.target.value)}
          disabled={loading || decks.length === 0}
          className='text-black'
        >
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.get('deckName')}
            </option>
          ))}
        </select>
      </label>

      <br />
      <textarea
        rows={10}
        cols={50}
        placeholder='Paste your decklist here...'
        value={decklistText}
        onChange={(e) => setDecklistText(e.target.value)}
        disabled={loading}
        className='text-black'
      />
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default UploadDecklist;

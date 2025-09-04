import useUploadDeck from '../../hooks/useUploadDeck';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Form from '../molecules/Form';
import ResponseModal from '../molecules/ResponseModal';

function UploadDecklist() {
  const {
    error,
    selectedDeckId,
    handleEdhChange,
    decks,
    decklistText,
    handleEdhDecklist,
    handleUpload,
    resetModalState,
    success,
  } = useUploadDeck();
  return (
    <>
      <Form onSubmit={handleUpload}>
        <div className='flex flex-col items-center text-white'>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label className='flex flex-col text-center text-white'>
            Select Deck:{' '}
            <Select
              value={selectedDeckId}
              onChange={handleEdhChange}
              disabled={decks.length === 0}
            >
              <option value=''>Select Deck</option>
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.get('deckName')}
                </option>
              ))}
            </Select>
          </label>

          <br />
          <textarea
            rows={10}
            cols={50}
            placeholder='Paste your decklist here...'
            value={decklistText}
            onChange={handleEdhDecklist}
            className='text-black w-72 m-4'
          />
          <br />
          <Button type='submit'>Upload</Button>
        </div>
      </Form>
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={resetModalState}
        />
      )}

      {success && (
        <ResponseModal
          title='Success'
          message='Decklist uploaded successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
}

export default UploadDecklist;

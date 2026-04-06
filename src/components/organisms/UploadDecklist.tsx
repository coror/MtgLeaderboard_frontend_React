import useUploadDeck from '../../hooks/useUploadDeck';
import Button from '../atoms/Button';
import CustomSelect from '../atoms/CustomSelect';
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
      <Form onSubmit={handleUpload} className='w-[280px]'>
        <div className='flex flex-col items-center w-full'>
          {error && <p className='text-[#b05050] text-sm'>{error}</p>}

          <div className='w-full'>
            <CustomSelect
              value={selectedDeckId}
              onChange={(value) => handleEdhChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}
              placeholder='Select Deck'
              options={decks.map((deck) => ({
                value: deck.id,
                label: deck.get('deckName'),
              }))}
            />
          </div>

          <input
            type='url'
            placeholder='Paste Moxfield URL...'
            value={decklistText}
            onChange={(e) => handleEdhDecklist(e as unknown as React.ChangeEvent<HTMLTextAreaElement>)}
            className='w-full mt-4 bg-[#1a1812]/80 border border-[rgba(201,169,89,0.2)] text-[#e0d7c8] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(201,169,89,0.4)] placeholder:text-[#e0d7c8]/40'
          />
          <Button type='submit' className='mt-8'>Upload</Button>
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

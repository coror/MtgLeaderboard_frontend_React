import Button from '../atoms/Button';
import classes from './UpdateScore.module.css';
import ResponseModal from '../molecules/ResponseModal';
import useUpdateScore from '../../hooks/useUpdateScore';

export default function UpdateScore({
  updateFunction,
  classDB,
  propName,
  objName,
}) {
  const {
    handleSubmit,
    handleScoreChange,
    handleDeckChange,
    selectedDeck,
    deckNames,
    scoreChange,
    error,
    success,
    setError,
    setSuccess,
  } = useUpdateScore(updateFunction, classDB, propName, objName);

  return (
    <>
      <form className={classes['form-container']} onSubmit={handleSubmit}>
        <div className={classes['form-section']}>
          <div>
            {updateFunction === 'edhGameWonAddRemove' ||
            updateFunction === 'edhGameLostAddRemove'
              ? 'Select Commander'
              : 'Select Commander Player'}
            :
          </div>
          <select
            className={classes['select-field']}
            value={selectedDeck ? selectedDeck.propName : ''}
            onChange={handleDeckChange}
          >
            <option value=''>Select...</option>
            {deckNames.map((deck) => (
              <option key={deck.objectId} value={deck.propName}>
                {deck.propName}
              </option>
            ))}
          </select>
          <div>
            {updateFunction === 'edhGameWonAddRemove'
              ? 'Update Wins'
              : updateFunction === 'edhPlayerGameWonAddRemove'
              ? 'Update Wins'
              : 'Update Losses'}
            :
          </div>

          <div className={classes['input-container']}>
            <button
              type='button'
              className={classes.button}
              onClick={() => handleScoreChange(-1)}
            >
              -
            </button>
            <input
              type='number'
              className={classes['input-field']}
              value={scoreChange}
              onChange={(e) => handleScoreChange(Number(e.target.value), true)}
            />
            <button
              type='button'
              className={classes.button}
              onClick={() => handleScoreChange(1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={() => setError(null)}
        />
      )}
      {success && (
        <ResponseModal
          title='Success'
          message='Score modified successfully'
          onConfirm={() => setSuccess(false)}
        />
      )}
    </>
  );
}

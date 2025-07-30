import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useCreateMatch from '../../hooks/useCreateMatch';
import Form from '../molecules/Form';
import Input from '../atoms/Input';

export default function CreateMatch({
  updateFunction,
  classDB,
  propName,
  objName,
}) {
  const {
    handleSubmit,
    selectedPlayerOne,
    handlePlayerChange,
    players,
    selectedPlayerTwo,
    handleScoreChange,
    scoreOne,
    setScoreOne,
    scoreTwo,
    setScoreTwo,
    error,
    setError,
    success,
    setSuccess,
  } = useCreateMatch(updateFunction, classDB, propName, objName);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div>
          <div>Select Player 1:</div>
          <select
            value={selectedPlayerOne ? selectedPlayerOne.name : ''}
            onChange={(e) => handlePlayerChange(e, 1)}
            className='text-black'
          >
            <option value=''>Select Player...</option>
            {players.map((player) => (
              <option key={player.objectId} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>

          <div>Select Player 2:</div>
          <select
            value={selectedPlayerTwo ? selectedPlayerTwo.name : ''}
            onChange={(e) => handlePlayerChange(e, 2)}
            className='text-black'
          >
            <option value=''>Select Player...</option>
            {players.map((player) => (
              <option key={player.objectId} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>

          <div>Score for Player 1:</div>
          <div>
            <button type='button' onClick={() => handleScoreChange(1, -1)}>
              -
            </button>
            <Input
              type='number'
              value={scoreOne}
              onChange={(e) => setScoreOne(Number(e.target.value))}
              className='text-black'
            />
            <button type='button' onClick={() => handleScoreChange(1, 1)}>
              +
            </button>
          </div>

          <div>Score for Player 2:</div>
          <div>
            <button type='button' onClick={() => handleScoreChange(2, -1)}>
              -
            </button>
            <Input
              type='number'
              value={scoreTwo}
              onChange={(e) => setScoreTwo(Number(e.target.value))}
              className='text-black'
            />
            <button type='button' onClick={() => handleScoreChange(2, 1)}>
              +
            </button>
          </div>
        </div>

        <Button type='submit' className='mt-10'>
          Submit
        </Button>
      </Form>

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
          message='Match created successfully'
          onConfirm={() => setSuccess(false)}
        />
      )}
    </>
  );
}

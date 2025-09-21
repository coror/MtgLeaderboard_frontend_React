import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useCreateMatch from '../../hooks/useCreateMatch';
import Form from '../molecules/Form';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

type CreateMatchProps = {
  updateFunction: string;
  classDB: string;
  propName: string;
  objName: string;
};

export default function CreateMatch({
  updateFunction,
  classDB,
  propName,
  objName,
}: CreateMatchProps) {
  const {
    handleSubmit,
    selectedPlayerOne,
    handlePlayerChange,
    players,
    selectedPlayerTwo,
    handleScoreChange,
    scoreOne,
    scoreTwo,
    error,
    success,
    resetModalState,
  } = useCreateMatch(updateFunction, classDB, propName, objName);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div>
          <div>Select Player 1:</div>
          <Select
            value={selectedPlayerOne ? selectedPlayerOne.name : ''}
            onChange={(e) => handlePlayerChange(e, 1)}
          >
            <option value=''>Select Player...</option>
            {players.map((player) => (
              <option
                key={player.objectId}
                value={player.name}
                disabled={selectedPlayerTwo?.objectId === player.objectId}
              >
                {player.name}
              </option>
            ))}
          </Select>

          <div>Select Player 2:</div>
          <Select
            value={selectedPlayerTwo ? selectedPlayerTwo.name : ''}
            onChange={(e) => handlePlayerChange(e, 2)}
            className='text-black'
          >
            <option value=''>Select Player...</option>
            {players.map((player) => (
              <option
                key={player.objectId}
                value={player.name}
                disabled={selectedPlayerOne?.objectId === player.objectId}
              >
                {player.name}
              </option>
            ))}
          </Select>

          <div>Score for Player 1:</div>
          <div>
            <button type='button' onClick={() => handleScoreChange(1, -1)}>
              -
            </button>
            <Input
              type='number'
              value={scoreOne}
              onChange={(e) =>
                handleScoreChange(1, Number(e.target.value), true)
              }
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
              onChange={(e) =>
                handleScoreChange(2, Number(e.target.value), true)
              }
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
          onConfirm={resetModalState}
        />
      )}
      {success && (
        <ResponseModal
          title='Success'
          message='Match created successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
}

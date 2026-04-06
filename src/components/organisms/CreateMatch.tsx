import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useCreateMatch from '../../hooks/useCreateMatch';
import Form from '../molecules/Form';
import Input from '../atoms/Input';
import CustomSelect from '../atoms/CustomSelect';
import { CreateMatchProps } from '../../models/createMatch';

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
    loading,
    resetModalState,
  } = useCreateMatch(updateFunction, classDB, propName, objName);

  return (
    <>
      <Form onSubmit={handleSubmit} className='w-[280px]'>
        <div className='space-y-4 w-full'>
          {/* Player 1 Section */}
          <div className='space-y-1 w-full'>
            <label className='text-xs font-semibold name-shimmer'>
              Player 1
            </label>
            <CustomSelect
              value={selectedPlayerOne?.name ?? ''}
              onChange={(value) => handlePlayerChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>, 1)}
              placeholder='Select Player...'
              options={players.map((player) => ({
                value: player.name ?? '',
                label: player.name ?? '',
                disabled: selectedPlayerTwo?.objectId === player.objectId,
              }))}
            />
          </div>

          {/* Player 2 Section */}
          <div className='space-y-1 w-full'>
            <label className='text-xs font-semibold name-shimmer'>
              Player 2
            </label>
            <CustomSelect
              value={selectedPlayerTwo?.name ?? ''}
              onChange={(value) => handlePlayerChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>, 2)}
              placeholder='Select Player...'
              options={players.map((player) => ({
                value: player.name ?? '',
                label: player.name ?? '',
                disabled: selectedPlayerOne?.objectId === player.objectId,
              }))}
            />
          </div>

          {/* Scores Section */}
          <div className='flex justify-center items-end gap-3 pt-2 w-full'>
            {/* Score Player 1 */}
            <div className='space-y-1'>
              <label className='text-[10px] font-semibold text-white/70 block text-center truncate max-w-[90px]'>
                {selectedPlayerOne?.name || 'P1'}
              </label>
              <div className='flex items-center justify-center gap-1'>
                <button
                  type='button'
                  onClick={() => handleScoreChange(1, -1)}
                  className='w-7 h-7 rounded-md bg-gradient-to-br from-orange-900/80 via-red-950/80 to-black/80 text-white font-bold text-base hover:brightness-110 active:scale-95 transition-all border border-white/10'
                >
                  -
                </button>
                <Input
                  type='number'
                  value={scoreOne}
                  onChange={(e) =>
                    handleScoreChange(1, Number(e.target.value), true)
                  }
                  className='w-9 h-7 text-center bg-black/40 border border-white/20 text-white rounded-md !mt-0 !p-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-900/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
                <button
                  type='button'
                  onClick={() => handleScoreChange(1, 1)}
                  className='w-7 h-7 rounded-md bg-gradient-to-br from-orange-900/80 via-red-950/80 to-black/80 text-white font-bold text-base hover:brightness-110 active:scale-95 transition-all border border-white/10'
                >
                  +
                </button>
              </div>
            </div>

            {/* VS Divider */}
            <div className='flex items-center pb-1'>
              <span className='text-white/50 font-bold text-xs'>VS</span>
            </div>

            {/* Score Player 2 */}
            <div className='space-y-1'>
              <label className='text-[10px] font-semibold text-white/70 block text-center truncate max-w-[90px]'>
                {selectedPlayerTwo?.name || 'P2'}
              </label>
              <div className='flex items-center justify-center gap-1'>
                <button
                  type='button'
                  onClick={() => handleScoreChange(2, -1)}
                  className='w-7 h-7 rounded-md bg-gradient-to-br from-orange-900/80 via-red-950/80 to-black/80 text-white font-bold text-base hover:brightness-110 active:scale-95 transition-all border border-white/10'
                >
                  -
                </button>
                <Input
                  type='number'
                  value={scoreTwo}
                  onChange={(e) =>
                    handleScoreChange(2, Number(e.target.value), true)
                  }
                  className='w-9 h-7 text-center bg-black/40 border border-white/20 text-white rounded-md !mt-0 !p-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-900/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
                <button
                  type='button'
                  onClick={() => handleScoreChange(2, 1)}
                  className='w-7 h-7 rounded-md bg-gradient-to-br from-orange-900/80 via-red-950/80 to-black/80 text-white font-bold text-base hover:brightness-110 active:scale-95 transition-all border border-white/10'
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center mt-8'>
          <Button type='submit' loading={loading}>
            Submit Match
          </Button>
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
          message='Match created successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
}

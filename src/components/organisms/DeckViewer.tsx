import { FC, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useDeckViewer, { Card, Ruling } from '../../hooks/useDeckViewer';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Spinner from '../atoms/Spinner';
import { DeckViewerProps } from '../../models/deckViewer';

const DeckViewer: FC<DeckViewerProps> = ({ decklist, onBack }) => {
  const {
    cardsByGroup,
    groupBy,
    setGroupBy,
    loading,
    error,
    groupOrder,
    groupLabels,
    totalCardsCount,
    averageCMC,
    setSelectedCard,
    selectedCard,
    rulings,
  } = useDeckViewer(decklist);

  // Type-safe check for selectedCard and rulings
  const cardHasRulings = useMemo(() => {
    return selectedCard && rulings && rulings.length > 0;
  }, [selectedCard, rulings]);

  // Prevent body scroll when card modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCard]);

  if (loading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  if (error)
    return <p className='text-center text-red-600 py-10'>Error: {error}</p>;

  return (
    <div
      className='relative text-white overflow-x-hidden '
      style={{
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        height: 'calc(var(--vh, 1vh) * 100)',
      }}
    >
      <div className=' w-full'>
        <div className='mb-6'>
          <Button onClick={onBack} >
            Back
          </Button>
        </div>

        {/* Group Toggle */}
        <div className='mb-6 flex items-center gap-4 justify-center'>
          <label className='font-semibold'>Group By:</label>
          <Select
            value={groupBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setGroupBy(e.target.value as 'type' | 'cmc')
            }
            className='w-auto'
          >
            <option value='type'>Card Type</option>
            <option value='cmc'>Mana Cost (CMC)</option>
          </Select>
        </div>

        <div className='space-y-1'>
          {groupOrder.map((key) => {
            const cards = cardsByGroup[key];
            if (!cards || cards.length === 0) return null;

            return (
              <section key={key}>
                <h2 className='text-2xl font-bold mb-4'>{groupLabels[key]}</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                  {cards.map((card: Card, index: number) => (
                    <div
                      key={card.name + index}
                      onClick={() => setSelectedCard(card)}
                      className={`relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md overflow-hidden cursor-pointer xl:hover:scale-[1.02] xl:transition-transform xl:duration-150 ${
                        card.isCommander
                          ? 'border border-yellow-400 ring-2 ring-yellow-300'
                          : ''
                      }`}
                    >
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.name}
                          className='w-full object-contain'
                        />
                      ) : (
                        <div className='w-full h-[350px] bg-gray-100 flex items-center justify-center text-sm text-red-500'>
                          No image
                        </div>
                      )}

                      {card.quantity > 1 && (
                        <div className='absolute top-1 right-1 bg-black bg-opacity-70 text-white text-xs font-bold rounded px-2 py-0.5 select-none pointer-events-none'>
                          x{card.quantity}
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <div className='mt-6 text-center text-white'>
            <p>Total cards: {totalCardsCount}</p>
            <p>Average mana cost: {averageCMC.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {selectedCard &&
        createPortal(
          <div
            onClick={() => setSelectedCard(null)}
            className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] cursor-pointer p-4'
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className='relative max-w-lg w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 rounded-lg shadow-2xl cursor-default border border-white/20'
            >
              {selectedCard.image ? (
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className='w-full object-contain rounded-2xl'
                />
              ) : (
                <div className='w-full h-[450px] bg-slate-700 flex items-center justify-center text-lg text-red-400'>
                  No image available
                </div>
              )}
              <div className='p-6 text-center text-white'>
                <h2 className='text-xl font-bold mb-4'>{selectedCard.name}</h2>
                <div className='space-y-2 text-sm'>
                  <p>
                    <span className='font-semibold text-amber-300'>Quantity:</span>{' '}
                    {selectedCard.quantity}
                  </p>
                  <p>
                    <span className='font-semibold text-amber-300'>CMC:</span>{' '}
                    {selectedCard.cmc ?? 'N/A'}
                  </p>
                  <p>
                    <span className='font-semibold text-amber-300'>Type:</span>{' '}
                    {selectedCard.type_line ?? 'N/A'}
                  </p>
                  <p>
                    <span className='font-semibold text-amber-300'>Price:</span>{' '}
                    {selectedCard.prices?.usd ? `$${selectedCard.prices.usd}` : 'N/A'}
                  </p>
                </div>

                {selectedCard.oracle_text && (
                  <div className='mt-4 p-4 bg-slate-800/50 rounded-lg border border-white/10'>
                    <p className='whitespace-pre-line text-left text-sm text-gray-200'>
                      {selectedCard.oracle_text}
                    </p>
                  </div>
                )}

                {cardHasRulings && (
                  <div className='mt-6 p-4 bg-slate-800/50 rounded-lg border border-white/10 text-left'>
                    <h3 className='text-lg font-semibold mb-2 text-amber-300'>Rulings</h3>
                    <ul className='list-disc list-inside text-sm text-gray-300 space-y-1'>
                      {rulings?.map((ruling: Ruling, i: number) => (
                        <li key={i}>{ruling.comment}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className='mt-6'>
                  <Button onClick={() => setSelectedCard(null)} className='w-full'>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById('backdrop-root')!
        )}
    </div>
  );
};

export default DeckViewer;

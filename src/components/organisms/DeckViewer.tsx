import { FC, useMemo } from 'react';
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
      className='relative text-white overflow-x-hidden pt-10'
      style={{
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        height: 'calc(var(--vh, 1vh) * 100)',
      }}
    >
      <div className='py-4 w-screen px-8'>
        <div className='mb-6'>
          <Button onClick={onBack} className='text-sm'>
            &larr; Back
          </Button>
        </div>

        {/* Group Toggle */}
        <div className='mb-6 flex items-center gap-4 justify-center'>
          <label className='text-sm font-semibold'>Group By:</label>
          <Select
            value={groupBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setGroupBy(e.target.value as 'type' | 'cmc')
            }
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
                          className='w-full object-cover h-48'
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

                      {card.isCommander && (
                        <span className='text-xs text-yellow-700 font-semibold'>
                          Commander
                        </span>
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

        {selectedCard && (
          <div
            onClick={() => setSelectedCard(null)}
            className='fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-[80] cursor-pointer overflow-hidden'
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className='relative max-w-lg w-full h-full overflow-y-auto bg-white rounded-lg shadow-lg pt-5'
            >
              {selectedCard.image ? (
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className='w-full object-contain rounded'
                />
              ) : (
                <div className='w-full h-[450px] bg-gray-100 flex items-center justify-center text-lg text-red-500'>
                  No image available
                </div>
              )}
              <div className='mt-4 text-center text-black'>
                <h2 className='text-xl font-bold mb-2'>{selectedCard.name}</h2>
                <p>Quantity: {selectedCard.quantity}</p>
                <p>CMC: {selectedCard.cmc ?? 'N/A'}</p>
                <p>Type: {selectedCard.type_line ?? 'N/A'}</p>
                <p>
                  {selectedCard.prices?.usd
                    ? `$${selectedCard.prices.usd}`
                    : 'N/A'}
                </p>

                {selectedCard.oracle_text && (
                  <p className='mt-4 whitespace-pre-line text-left text-sm text-gray-800'>
                    {selectedCard.oracle_text}
                  </p>
                )}

                {cardHasRulings && (
                  <div className='mt-6 text-left'>
                    <h3 className='text-lg font-semibold mb-2'>Rulings</h3>
                    <ul className='list-disc list-inside text-sm text-gray-700'>
                      {rulings?.map((ruling: Ruling, i: number) => (
                        <li key={i} className='mb-1'>
                          {ruling.comment}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={() => setSelectedCard(null)}
                  className='text-gray-700 hover:text-black text-2xl font-bold'
                  aria-label='Close'
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckViewer;

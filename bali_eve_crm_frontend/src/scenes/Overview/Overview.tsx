import { useContext } from 'preact/hooks';
import { IWedding, WeddingContext } from '../../context/WeddingsContext';
import { formatDate } from '../../common/utilities/utilityFunctions';
import { SortNearestThreeByDate } from './overviewUtils';

import StatCard from './components/StatCard';
import WeddingCardMini from './components/WeddingCardMini';

function Overview() {
  const { allWeddings, setAllWeddings } = useContext(WeddingContext);

  return (
    <div className='h-full w-full space-y-6'>
      {/* Task Row */}
      <div className='grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4 gap-6 h-fit'>
        {/* Metrics */}
        <StatCard label='Total Tasks' statistic='-1' />
        <StatCard label='Completed' statistic='14' />
        <StatCard label='Overdue' statistic='-8' />
        <StatCard label='Invoices' statistic='7' />
      </div>

      <hr className='my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-base-100 to-transparent opacity-25 dark:opacity-100' />

      {/* Wedding Row */}
      <div className='grid grid-cols-6 gap-6'>
        {SortNearestThreeByDate(allWeddings).map((wedding: IWedding) => {
          return <WeddingCardMini wedding={wedding} />;
        })}
      </div>

      <hr className='my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-base-100 to-transparent opacity-25 dark:opacity-100' />

      {/* Calendar Timeline */}
      {/* <Calendar /> */}
    </div>
  );
}

export default Overview;

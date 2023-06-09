function StatCard({ statistic, label, thisWeek }: any) {
  return (
    <div className='flex rounded items-center bg-base-100'>
      <div className='flex-1 p-6 flex gap-4'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='w-8 h-8'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z'
            />
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z'
            />
          </svg>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='font-semibold text-lg'>{label}</h2>
          <h1
            className={`text-2xl font-semibold ${
              (statistic > 0 && label.toLowerCase() === 'overdue') ||
              (statistic < 0 && label.toLowerCase() !== 'overdue')
                ? 'text-error/80'
                : 'text-success/80'
            }`}
          >
            {statistic}
          </h1>
          <div className='flex items-center space-x-2'>
            {statistic > 0 ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className={`w-4 h-4 ${
                  (statistic > 0 && label.toLowerCase() === 'overdue') ||
                  (statistic < 0 && label.toLowerCase() !== 'overdue')
                    ? 'text-error/80'
                    : 'text-success/80'
                }`}
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className={`w-4 h-4 ${
                  (statistic > 0 && label.toLowerCase() === 'overdue') ||
                  (statistic < 0 && label.toLowerCase() !== 'overdue')
                    ? 'text-error/80'
                    : 'text-success/80'
                }`}
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181'
                />
              </svg>
            )}{' '}
            <h3 className=' text-xs'>{thisWeek} this week</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;

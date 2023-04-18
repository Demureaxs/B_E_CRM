import { useContext, useEffect, useState } from 'preact/hooks';
import { IWedding, WeddingContext } from '../../context/WeddingsContext';
import { formatDate } from '../../common/utilities/utilityFunctions';
import { SortNearestThreeByDate } from './overviewUtils';

import StatCard from './components/StatCard';
import WeddingCardMini from './components/WeddingCardMini';

function Overview() {
  const { allWeddings, setAllWeddings } = useContext(WeddingContext);
  const [loading, setLoading] = useState();
  const [currentTasks, setCurrentTasks] = useState(0);
  const [currentTasksThisWeek, setCurrentTasksThisWeek] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [completedTasksThisWeek, setCompletedTasksThisWeek] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [overdueTasksThisWeek, setOverdueTasksThisWeek] = useState(0);
  const [Invoices, setInvoices] = useState(0);
  const [InvoicesThisWeek, setInvoicesThisWeek] = useState(0);

  useEffect(() => {
    if (allWeddings) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      setCurrentTasks(
        allWeddings
          .map((wedding) =>
            wedding.checklist.map(
              (item) => item.tasks.filter((task) => !task.completed).length
            )
          )
          .flat()
          .reduce((acc, val) => acc + val, 0)
      );

      setCurrentTasksThisWeek(
        allWeddings
          .map((wedding) =>
            wedding.checklist.map(
              (item) =>
                item.tasks.filter(
                  (task) =>
                    !task.completed && new Date(task.createdAt) > oneWeekAgo
                ).length
            )
          )
          .flat()
          .reduce((acc, val) => acc + val, 0)
      );

      setCompletedTasks(
        allWeddings
          .map((wedding) =>
            wedding.checklist.flatMap((item) =>
              item.tasks.filter((task) => task.completed)
            )
          )
          .flat().length
      );

      setCompletedTasksThisWeek(
        allWeddings
          .map((wedding) =>
            wedding.checklist.flatMap((item) =>
              item.tasks.filter(
                (task) =>
                  task.completed &&
                  task.completedAt &&
                  new Date(task.completedAt) > oneWeekAgo
              )
            )
          )
          .flat().length
      );

      setOverdueTasks(
        allWeddings
          .map((wedding) =>
            wedding.checklist.flatMap((item) =>
              item.tasks.filter(
                (task) =>
                  !task.completed &&
                  task.deadline &&
                  new Date(task.deadline) < new Date()
              )
            )
          )
          .flat().length
      );

      setOverdueTasksThisWeek(
        allWeddings
          .map((wedding) =>
            wedding.checklist.flatMap((item) =>
              item.tasks.filter(
                (task) =>
                  !task.completed &&
                  task.deadline &&
                  new Date(task.deadline) < new Date() &&
                  new Date(task.deadline) > oneWeekAgo
              )
            )
          )
          .flat().length
      );
    }
  }, [allWeddings]);

  return (
    <div className='h-full w-full space-y-6'>
      {/* Task Row */}
      <div className='grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4 gap-6 h-fit'>
        {/* Metrics */}
        <StatCard
          label='Current Tasks'
          statistic={currentTasks}
          thisWeek={currentTasksThisWeek}
        />
        <StatCard
          label='Completed'
          statistic={completedTasks}
          thisWeek={completedTasksThisWeek}
        />
        <StatCard
          label='Overdue'
          statistic={overdueTasks}
          thisWeek={overdueTasksThisWeek}
        />
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

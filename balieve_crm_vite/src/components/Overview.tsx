import { useState, useEffect, useContext } from 'preact/hooks';
import { WeddingContext } from '../utilities/weddingsContext';
import SubHeader from './OverviewComponents/SubHeader';
import TaskOverview from './OverviewComponents/TaskOverview';
import UpcomingWeddings from './OverviewComponents/UpcomingWeddings';

function Overview(props: any) {
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);

  const {
    allWeddings,
    setAllWeddings,
    wedding,
    setWedding,
    showModal,
    setShowModal,
  } = useContext(WeddingContext);

  useEffect(() => {
    if (allWeddings) {
      setTotalTasks(
        allWeddings
          .map(wedding => wedding.todos.length)
          .reduce((a, b) => a + b, 0)
      );

      setCompletedTasks(
        allWeddings
          .map(wedding => wedding.todos.filter(item => item.done).length)
          .reduce((a, b) => a + b, 0)
      );

      setOverdueTasks(
        allWeddings
          .map(wedding => {
            const overdue = wedding.todos.filter(item => {
              return new Date(item.deadline) < new Date();
            });
            return overdue.length > 0 ? overdue.length : 0;
          })
          .reduce((a, b) => a + b, 0)
      );

      setTodoTasks(
        allWeddings
          .map(wedding => wedding.todos.length)
          .reduce((a, b) => a + b, 0)
      );

      setLoading(false);
    }
  }, [allWeddings]);

  return (
    <div className="space-y-4">
      <SubHeader name={props.navTarget} />

      <TaskOverview
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        overdueTasks={overdueTasks}
        todoTasks={todoTasks}
        loading={loading}
      />

      <UpcomingWeddings allWeddings={allWeddings} />
    </div>
  );
}

export default Overview;

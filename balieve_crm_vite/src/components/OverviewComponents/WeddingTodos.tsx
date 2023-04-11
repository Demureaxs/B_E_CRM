import { formatDate } from '../../utilities/utilityFunctions';

interface WeddingTodosProps {
  task: string;
  deadline: string;
}

function WeddingTodos(props: WeddingTodosProps) {
  return (
    <div>
      <div className="space-y-2">
        <p>
          <span className="font-bold">Task: </span>
          {props.task}
        </p>
        <p>
          <span className="font-bold">Deadline: </span>
          {formatDate(props.deadline)}
        </p>
      </div>
    </div>
  );
}

export default WeddingTodos;

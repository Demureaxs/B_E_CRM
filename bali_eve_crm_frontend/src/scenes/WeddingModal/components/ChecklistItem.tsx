import { useState, useContext, useEffect } from 'preact/hooks';
import { WeddingContext } from '../../../context/WeddingsContext';
import produce from 'immer';
import { saveWedding } from '../weddingModalUtils';
import { formatDateToShortForm } from '../../../common/utilities/utilityFunctions';
import API_URL from '../../../env';

function ChecklistItems(props: any) {
  const [showTodos, setShowTodos] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [hovering, setHovering] = useState(false);
  const {
    wedding,
    setWedding,
    allWeddings,
    setAllWeddings,
    refetchData,
    agents,
    fetchTasks,
  } = useContext(WeddingContext);

  const [task, setTask] = useState('');
  const [planner, setPlanner] = useState(props.tasks.agent);
  const [deadline, setDeadline] = useState(props.tasks.deadline);

  const [taskName, setTaskName] = useState(props.tasks.task);

  useEffect(() => {
    console.log(taskName);
  }, [taskName]);

  async function updateWeddingChecklist(
    checklistIndex: number,
    taskIndex: number
  ) {
    if (!wedding) return;

    const task = wedding.checklist[checklistIndex].tasks[taskIndex];
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: task.completed ? null : new Date(),
    };

    const url = `${API_URL}/api/v1/weddings/${wedding._id}/checklist/${wedding.checklist[checklistIndex]._id}/tasks/${props.tasks._id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        const updatedWedding = await response.json();
        console.log('checklist completed updated successfully');
        setWedding(updatedWedding);
        fetchTasks();
        refetchData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateChecklistTask(
    event: any,
    checklistIndex: number,
    taskIndex: number
  ) {
    if (!wedding) return;

    const plannerId = agents.find(
      (agent) => agent.displayName === planner
    )?._id;

    console.log(props.tasks);
    const task = wedding.checklist[checklistIndex].tasks[taskIndex];
    const updatedTask = {
      ...task,
      task: event.target.value,
      agent: planner,
      agentId: plannerId,
      deadline: deadline,
    };

    const url = `${API_URL}/api/v1/weddings/${wedding._id}/checklist/${wedding.checklist[checklistIndex]._id}/tasks/${props.tasks._id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        const updatedWedding = await response.json();
        console.log('checklist Taskname updated successfully');
        setWedding(updatedWedding);
        fetchTasks();
        refetchData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id={props.tasks._id} className='space-y-2 flex-1 ml-9'>
      <div className='flex space-x-4 text-sm items-center'>
        <input
          className=' h-3 w-3 text-info checked:bg-warning'
          type='checkbox'
          name={props.tasks.task}
          id={props.tasks.task._id}
          checked={props.tasks.completed}
          onClick={(event) => {
            updateWeddingChecklist(props.checklistIndex, props.taskIndex);
            (event.target as HTMLInputElement).checked;
            props.tasks.task;
          }}
        />
        {editingName ? (
          <div className='w-full space-y-2 mr-4 mb-2'>
            <h3 className='text-xs'>Task:</h3>
            <input
              type='text'
              value={props.tasks.task}
              className=' flex-1 text-sm px-1 w-full focus:outline-none focus:border-b focus:border-blue-600'
              onBlur={(event) => {
                updateChecklistTask(
                  event,
                  props.checklistIndex,
                  props.taskIndex
                );
                setEditingName(false);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
              }}
            />

            <div className='w-full flex gap-2'>
              <div className='flex-1 space-y-2'>
                <h3 className='text-xs'>Assign Planner:</h3>
                <select
                  value={planner}
                  onChange={(event) =>
                    setPlanner(
                      event.target instanceof HTMLSelectElement
                        ? event.target.value
                        : ''
                    )
                  }
                  className='w-full focus:outline-none focus:border-b focus:border-blue-600'
                  name='planner'
                  id='plannerSelect'
                >
                  {agents &&
                    agents.map((agent) => {
                      return (
                        <option key={agent._id} value={agent.displayName}>
                          {agent.displayName}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className='flex-1 space-y-2'>
                <h3 className='text-xs'>Deadline:</h3>
                <input
                  className='w-full text-xs p-[0.5px] focus:outline-none focus:border-b focus:border-blue-600'
                  type='date'
                  placeholder='Deadline'
                  value={
                    deadline
                      ? formatDateToShortForm(deadline)
                      : formatDateToShortForm(new Date())
                  }
                  onChange={(event) =>
                    setDeadline(
                      event.target instanceof HTMLInputElement
                        ? event.target.value
                        : ''
                    )
                  }
                />
              </div>
            </div>
            <div className='pt-2 flex-1 flex justify-end gap-3 text-xs text-neutral'>
              <button className='bg-success/80 px-2 py-1 rounded'>Save</button>
              <button className='bg-error/80 px-2 py-1 rounded'>Delete</button>
            </div>
          </div>
        ) : (
          <div className='flex flex-1 justify-between items-center'>
            <label
              htmlFor={props.tasks.task}
              className='flex-1 mr-auto w-full'
              onClick={() => setEditingName(true)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {props.tasks.task}
            </label>
            {hovering && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-3 h-3'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChecklistItems;

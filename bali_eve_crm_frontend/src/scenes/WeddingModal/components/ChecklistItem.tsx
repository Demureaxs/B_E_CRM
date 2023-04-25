import { useState, useContext, useEffect } from 'preact/hooks';
import { WeddingContext } from '../../../context/WeddingsContext';
import { formatDateToShortForm } from '../../../common/utilities/utilityFunctions';
import API_URL from '../../../env';

function ChecklistItems(props: any) {
  const [editingName, setEditingName] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [planner, setPlanner] = useState(props.tasks.agent);
  const [deadline, setDeadline] = useState(props.tasks.deadline);
  const [taskName, setTaskName] = useState(props.tasks.task);
  const {
    wedding,
    setWedding,
    allWeddings,
    setAllWeddings,
    refetchData,
    agents,
    fetchTasks,
  } = useContext(WeddingContext);

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
    // event: any,
    checklistIndex: number,
    taskIndex: number
  ) {
    if (!wedding) return;

    const plannerId = agents.find(
      (agent) => agent.displayName === planner
    )?._id;
    const task = wedding.checklist[checklistIndex].tasks[taskIndex];
    const updatedTask = {
      ...task,
      task: taskName,
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
        setHovering(false);
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
              value={taskName}
              className=' flex-1 text-sm px-1 w-full focus:outline-none focus:border-b focus:border-blue-600'
              onChange={(event) => {
                if (event.target instanceof HTMLInputElement)
                  setTaskName(event.target.value);
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
              <button
                onClick={() => {
                  updateChecklistTask(props.checklistIndex, props.taskIndex);
                  setEditingName(false);
                }}
                className='bg-success/80 px-2 py-1 rounded'
              >
                Save
              </button>
              <button
                onClick={() => {
                  props.deleteChecklistItem;
                }}
                className='bg-error/80 px-2 py-1 rounded'
              >
                Delete
              </button>
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
                class='w-4 h-4'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
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

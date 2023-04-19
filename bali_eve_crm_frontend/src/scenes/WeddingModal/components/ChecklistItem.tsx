import { useState, useContext, useEffect } from 'preact/hooks';
import { WeddingContext } from '../../../context/WeddingsContext';
import produce from 'immer';
import { saveWedding } from '../weddingModalUtils';
import { formatDateToShortForm } from '../../../common/utilities/utilityFunctions';

function ChecklistItems(props: any) {
  const [showTodos, setShowTodos] = useState(false);
  const [editingName, setEditingName] = useState(false);
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

    const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}/checklist/${wedding.checklist[checklistIndex]._id}/tasks/${props.tasks._id}`;

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

    const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}/checklist/${wedding.checklist[checklistIndex]._id}/tasks/${props.tasks._id}`;

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

  function handleShowTodos() {
    setShowTodos((prev) => !prev);
  }

  return (
    <div id={props.tasks._id} className='space-y-2 flex-1 ml-9'>
      <div className='flex space-x-4 text-sm'>
        <input
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
          </div>
        ) : (
          <label
            htmlFor={props.tasks.task}
            className='flex-1'
            onClick={() => setEditingName(true)}
          >
            {props.tasks.task}
          </label>
        )}
      </div>
    </div>
  );
}

export default ChecklistItems;

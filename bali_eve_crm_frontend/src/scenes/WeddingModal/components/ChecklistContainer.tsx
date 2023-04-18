import { useState, useContext, useEffect } from 'preact/hooks';
import { WeddingContext } from '../../../context/WeddingsContext';
import produce from 'immer';
import ProgressComponent from '../../../common/compinents/ProgressComponent';
import EditableField from './common/EditableField';
import ChecklistItems from './ChecklistItem';
import { saveWedding } from '../weddingModalUtils';

function ChecklistContainer(props: any) {
  const [hideComplete, setHideComplete] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const { refetchData } = useContext(WeddingContext);
  const { wedding, setWedding } = useContext(WeddingContext);

  useEffect(() => {
    const completedTasks = props.task.tasks.filter(
      (item: any) => item.completed
    ).length;
    const totalTasks = props.task.tasks.length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    setPercentage(parseFloat(percentage.toFixed(0)));
  }, [props.task]);

  // ----------------------------------------------------------------function to update the Vendor ----------------------------------------------------------------
  async function updateChecklistField(field: string, newValue: string) {
    if (!wedding) return;

    const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}/checklist/${props.task._id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [field]: newValue,
        }),
      });

      if (response.ok) {
        const updatedWedding = await response.json();
        console.log('Checklist container updated');
        setWedding(updatedWedding);
        refetchData();
      } else {
        console.log('Failed to update checklist container');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addChecklistItem(event: MouseEvent) {
    if (wedding) {
      const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}/checklist/${props.task._id}/tasks`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            createdAt: new Date(),
            completedAt: null,
            completed: false,
            task: 'Name of task',
            // agent: '',
            // deadline: '',
          }),
        });
        if (response.ok) {
          const updatedWedding = await response.json();
          console.log('checklist item added successfully');
          setWedding(updatedWedding);
          refetchData();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function deleteChecklistItem(taskIndex: number) {
    if (!wedding) return;

    const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}/checklist/${props.task._id}/tasks/${props.task.tasks[taskIndex]._id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Task Deleted');
        const updatedWedding = await response.json();
        setWedding(updatedWedding);
        refetchData();
      } else {
        console.log('Failed to delete task');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteChecklistContainer() {
    if (!wedding) return;

    const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}/checklist/${props.task._id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedWedding = await response.json();
        console.log('Checklist container deleted');
        setWedding(updatedWedding);
        refetchData();
      } else {
        console.log('Failed to delete checklist container');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id={props.task._id} className='space-y-2'>
      <div className='flex space-x-4 items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
          />
        </svg>

        <div className='flex justify-between w-full'>
          <div className='flex space-x-1'>
            <EditableField
              value={props.task.type}
              fieldType='text'
              fieldName='type'
              updateField={updateChecklistField}
              isBold={true}
            />
            :{' '}
            <EditableField
              value={props.task.vendor}
              fieldType='text'
              fieldName='vendor'
              updateField={updateChecklistField}
              forceFull={true}
            />
            {/* <span className='font-semibold'>{props.task.type}: </span>
            {props.task.vendor} */}
          </div>

          <div className='flex space-x-2 flex-shrink-0 flex-grow-0'>
            <button className='bg-base-300 px-2 py-1 rounded text-xs'>
              Hide Checked Items
            </button>
            <button
              onClick={deleteChecklistContainer}
              className='bg-error/80 text-neutral px-2 py-1 rounded text-xs'
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className='flex space-x-2 items-center'>
        <p id={props.task._id} className='text-xs'>
          {percentage}%
        </p>

        <ProgressComponent value={percentage} />
      </div>

      {props.task.tasks.map((tasks: any, index: number) => {
        return (
          <div className='flex justify-between gap-4'>
            <ChecklistItems
              refetchWedding={props.refetchWedding}
              key={tasks._id}
              tasks={tasks}
              checklistIndex={props.checklistIndex}
              taskIndex={index}
            />
            <button
              className=' text-error/80'
              onClick={() => deleteChecklistItem(index)}
            >
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
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </button>
          </div>
        );
      })}
      <div className='pt-4'>
        <button
          onClick={addChecklistItem}
          className='bg-success/80 text-base-100 text-xs px-2 py-1 rounded ml-9'
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default ChecklistContainer;

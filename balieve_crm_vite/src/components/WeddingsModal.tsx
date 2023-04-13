import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import {
  formatDate,
  formatIdFromName,
  formatDateToShortForm,
} from '../utilities/utilityFunctions';
import { IWedding } from '../utilities/weddingsContext';

//-----------------------------------------------Weddings Modal Component-----------------------------------------------
interface WeddingModalProps {
  wedding: IWedding | null;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  updateWeddingsField: (fieldName: keyof IWedding, newValue: string) => void;
  updateChecklistTask: (
    event: any,
    checklistIndex: number,
    taskIndex: number
  ) => void; // Define updateChecklistTask here
  updateWeddingChecklist: (checklistIndex: number, taskIndex: number) => void;
}

function WeddingsModal(props: WeddingModalProps) {
  const [editingName, setEditingName] = useState(false);
  const [editingDate, setEditingDate] = useState(false);

  function handleCloseModal(event: any) {
    if (event.target.id === 'background') props.setShowModal(!props.showModal);
  }

  return (
    <div>
      <div
        id='background'
        onClick={handleCloseModal}
        className='absolute w-full top-0 left-0  max-w-screen-2xl h-full bg-gray-500/50 flex justify-center items-center'
      >
        <div className=' z-10 h-[90%] bg-slate-100 w-[60%] rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-gray-200  shadow-lg flex '>
          <div className='h-full w-full p-6 overflow-y-scroll space-y-10 flex-1 scrollbar-none'>
            {/* Modal Details (Wedding name and date) */}
            <div className='flex space-x-4 justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='w-6 h-6 mt-1'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
                />
              </svg>

              <div>
                <h1>
                  {editingName ? (
                    <input
                      type='text'
                      value={props.wedding?.name}
                      onBlur={(
                        e: h.JSX.TargetedEvent<HTMLInputElement, Event>
                      ) => {
                        props.updateWeddingsField(
                          'name',
                          (e.target as HTMLInputElement).value
                        );
                        setEditingName(false);
                      }}
                      onKeyPress={async (
                        e: h.JSX.TargetedKeyboardEvent<HTMLInputElement>
                      ) => {
                        if (e.key === 'Enter') {
                          (e.currentTarget as HTMLInputElement).blur(); // Trigger onBlur event to save the changes
                        }
                      }}
                    />
                  ) : (
                    <span onClick={() => setEditingName(true)}>
                      {props.wedding?.name}
                    </span>
                  )}
                </h1>
                {editingDate && props.wedding ? (
                  <input
                    type='date'
                    value={formatDateToShortForm(props.wedding.date)}
                    onChange={(event) => {
                      props.updateWeddingsField(
                        'date',
                        (event.target as HTMLInputElement).value
                      );
                      setEditingDate(false);
                    }}
                  />
                ) : (
                  <h2 className='text-sm' onClick={() => setEditingDate(true)}>
                    {props.wedding && formatDate(props.wedding.date)}
                  </h2>
                )}
              </div>
            </div>

            {/* Notification section */}
            <div>
              <h2 className=' font-semibold text-sm'>Notifications:</h2>
            </div>

            {/* Description Section */}
            <div className='flex space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
              <div className='text-sm'>
                <div className='flex space-x-4'>
                  <h2 className=' font-semibold text-base'>Description</h2>
                  <button className='bg-gray-200 px-2 rounded-lg'>Edit</button>
                </div>
                {props.wedding && (
                  <div>
                    <h3>Date: {formatDate(props.wedding.date)}</h3>
                    <h3>Venue: {props.wedding.venue}</h3>
                    <h3>Pax: {props.wedding.guests}</h3>
                  </div>
                )}
              </div>
            </div>

            {/* Attachments Section */}
            <div className=' flex space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
                />
              </svg>

              <h1 className='font-semibold'>Attachments:</h1>
            </div>

            {props.wedding?.checklist.map((item: any, i: number) => {
              return (
                <div>
                  <ChecklistContainer
                    updateChecklistTask={props.updateChecklistTask}
                    task={item}
                    checklistIndex={i}
                    updateWeddingChecklist={props.updateWeddingChecklist}
                  />
                </div>
              );
            })}
          </div>

          <div className='w-[25%] p-6 space-y-4'>
            <div className='space-y-2'>
              <div className=' flex justify-between items-center text-sm font-semibold'>
                <h3>Suggested</h3>

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
                    d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
                  />
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>

              <button className='bg-slate-300 px-2 py-1 rounded-sm text-sm w-full text-left flex space-x-1 items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
                </svg>

                <p>Join</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//-----------------------------------------------Checklist Container-----------------------------------------------

function ChecklistContainer(props: any) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const completedTasks = props.task.tasks.filter(
      (item: any) => item.completed
    ).length;
    const totalTasks = props.task.tasks.length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    setPercentage(parseFloat(percentage.toFixed(0)));
  }, [props.task]);

  return (
    <div className=' space-y-2'>
      <div id={props.task.type} className='flex space-x-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
          />
        </svg>

        <div className='flex justify-between w-full'>
          <h1>
            <span className='font-semibold'>{props.task.type}: </span>
            {props.task.vendor}
          </h1>
          <div className='flex space-x-2'>
            <button className='bg-slate-300 px-2 py-1 rounded-sm text-sm'>
              Hide Checked Items
            </button>
            <button className='bg-slate-300 px-2 py-1 rounded-sm text-sm'>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className='flex space-x-3 items-center'>
        <p
          id={`${formatIdFromName(props.task.type.slice())}ProgressPercentage`}
          className='text-[10px]'
        >
          {percentage}%
        </p>
        <div className=' w-full h-2 bg-gray-300 rounded-full overflow-hidden'>
          <div
            id={`${formatIdFromName(props.task.type.slice())}ProgressBar`}
            style={{ width: `${percentage}%` }}
            className={`h-full z-10 bg-green-500 transition-all duration-700`}
          ></div>
        </div>
      </div>

      {props.task.tasks.map((todos: [], i: number) => {
        // console.log(todos);
        return (
          <ChecklistItems
            updateChecklistTask={props.updateChecklistTask}
            updateWeddingChecklist={props.updateWeddingChecklist}
            checklistIndex={props.checklistIndex}
            taskIndex={i}
            todos={todos}
          />
        );
      })}
    </div>
  );
}

//-----------------------------------------------Checklist Items Component-----------------------------------------------

function ChecklistItems(props: any) {
  const [showTodos, setShowTodos] = useState(false);
  const [editingName, setEditingName] = useState(false);

  function handleShowTodos() {
    setShowTodos((prev) => !prev);
  }

  return (
    <div className='space-y-2'>
      <div className='flex space-x-4 z-20'>
        <input
          type='checkbox'
          name={props.todos.task.replace(/\s/g, '').toLowerCase()}
          id={props.todos.task.replace(/\s/g, '').toLowerCase()}
          checked={props.todos.completed}
          onClick={(e) => {
            props.updateWeddingChecklist(
              props.checklistIndex,
              props.taskIndex,
              (e.target as HTMLInputElement).checked,
              props.todos.task
            );
          }}
        />
        {editingName ? (
          <input
            type='text'
            value={props.todos.task}
            className='flex-1'
            onBlur={(e) => {
              props.updateChecklistTask(
                e,
                props.checklistIndex,
                props.taskIndex
              );
              setEditingName(false);
            }}
            onKeyPress={(e: h.JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                (e.currentTarget as HTMLInputElement).blur(); // Trigger onBlur event to save the changes
              }
            }}
          />
        ) : (
          <label
            className='flex-1'
            htmlFor={props.todos.task.replace(/\s/g, '').toLowerCase()}
            onClick={() => setEditingName(true)}
          >
            {props.todos.task}
          </label>
        )}
        <div className='cursor-pointer' onClick={handleShowTodos}>
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
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            />
          </svg>
        </div>
      </div>
      {showTodos && (
        <div className='text-sm bg-white'>
          <div className=' bg-white grid grid-cols-5 px-2 gap-1 border-b border-gray-300'>
            <h1 className='col-span-3 border-r border-gray-300'>
              Arrange Appointment for venue with max and sally and 18 fishermen
              as we have to get the tails right
            </h1>
            <h2 className='col-span-1 border-r border-gray-300'>12/10/2023</h2>
            <h2 className='col-span-1'>16/08/2023</h2>
          </div>

          <div className=' bg-white grid grid-cols-5 px-2 gap-1 border-b border-gray-300'>
            <h1 className='col-span-3 border-r border-gray-300'>
              Arrange Appointment for venue
            </h1>
            <h2 className='col-span-1 border-r border-gray-300'>12/10/2023</h2>
            <h2 className='col-span-1'>16/08/2023</h2>
          </div>

          <div className=' bg-white grid grid-cols-5 px-2 gap-1 border-b border-gray-300'>
            <h1 className='col-span-3 border-r border-gray-300'>
              Arrange Appointment for venue
            </h1>
            <h2 className='col-span-1 border-r border-gray-300'>12/10/2023</h2>
            <h2 className='col-span-1'>16/08/2023</h2>
          </div>

          <div className='col-start-2'>
            <button className='w-1/2 bg-gray-300 h-full'>Add Todo</button>
          </div>
        </div>
      )}
    </div>
  );
}

function TodosComponent() {
  return (
    <div className='bg-white grid grid-cols-4 px-6 gap-1'>
      <h1 className='col-span-2 border-r border-gray-400'>example todo</h1>
      <h2 className='col-span-1 border-r border-gray-400'>Date Added</h2>
      <h2 className='col-span-1'>Deadline</h2>
    </div>
  );
}

export default WeddingsModal;

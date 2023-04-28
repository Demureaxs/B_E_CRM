import { useState, useContext, useEffect } from 'preact/hooks';
import {
  formatDate,
} from '../../common/utilities/utilityFunctions';
import { WeddingContext, IAgentTask } from '../../context/WeddingsContext';
import {
  HeaderFields,
  HeaderFieldsProps,
} from '../WeddingsDashboard/WeddingsDashboard';
import EditableField from '../WeddingModal/components/common/EditableField';
import API_URL from '../../env';
import { IComments, ITaskItem } from '../../context/WeddingsContext';

interface ITaskProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function Tasks({ searchTerm, setSearchTerm }: ITaskProps) {
  const { tasks, fetchTasks, user } = useContext(WeddingContext);
  const [sortBy, setSortBy] = useState('deadline');
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className='flex flex-col h-full'>
      <div className='grid grid-cols-4 text-sm font-bold border-b border-base-300 mb-4 p-6'>
        <HeaderFields
          sortBy={sortBy}
          setSortBy={setSortBy}
          asc={asc}
          setAsc={setAsc}
          fieldName='name'
          label='Wedding'
          iconSvg={
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
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          }
        />

        <HeaderFields
          sortBy={sortBy}
          setSortBy={setSortBy}
          asc={asc}
          setAsc={setAsc}
          fieldName='date'
          label='Date'
          iconSvg={
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
                d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
              />
            </svg>
          }
        />

        <HeaderFields
          sortBy={sortBy}
          setSortBy={setSortBy}
          asc={asc}
          setAsc={setAsc}
          fieldName='task'
          label='Todo'
          iconSvg={
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
          }
        />

        <HeaderFields
          sortBy={sortBy}
          setSortBy={setSortBy}
          asc={asc}
          setAsc={setAsc}
          fieldName='deadline'
          label='Deadline'
          iconSvg={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          }
        />
      </div>

      <div className='flex-1 overflow-y-scroll scrollbar-none'>
        {tasks &&
          sortTasks(tasks as any, sortBy, asc)
            .filter((task) => {
              return searchTerm
                ? task.weddingName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    task.task.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            })
            .map((task) => {
              return (
                <div key={task._id}>
                  <TaskComponent
                    weddingName={task.weddingName}
                    weddingDate={task.weddingDate}
                    task={task.task}
                    deadline={task.deadline}
                    weddingId={task.weddingId}
                    taskObject={task}
                  />
                  <hr className='my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-base-100 to-transparent opacity-25 dark:opacity-100' />
                </div>
              );
            })}
      </div>
    </section>
  );
}

function sortTasks(tasks: IAgentTask[], sortBy: string, asc: boolean) {
  return tasks.sort((a: IAgentTask, b: IAgentTask) => {
    switch (sortBy) {
      case 'name':
        return asc
          ? a.weddingName.localeCompare(b.weddingName)
          : b.weddingName.localeCompare(a.weddingName);
        break;
      case 'date':
        return asc
          ? new Date(a.weddingDate).getTime() -
              new Date(b.weddingDate).getTime()
          : new Date(b.weddingDate).getTime() -
              new Date(a.weddingDate).getTime();
        break;
      case 'task':
        return asc
          ? a.task.localeCompare(b.task)
          : b.task.localeCompare(a.task);
        break;
      case 'deadline':
        return asc
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
        break;
      default:
        return asc
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
        break;
    }
  });
}

function TaskComponent({
  weddingName,
  weddingDate,
  task,
  deadline,
  weddingId,
  taskObject,
}: any) {
  const [deadlineStyle, setDeadlineStyle] = useState('');
  const [message, setMessage] = useState('');

  const { fetchTasks, user, refetchData } = useContext(WeddingContext);

  // useEffect(() => {
  //   console.log(taskObject);
  // }, [taskObject]);

  useEffect(() => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(currentDate.getDate() + 7);

    if (deadlineDate < currentDate) {
      setDeadlineStyle('bg-error/70 text-neutral px-2');
    } else if (deadlineDate <= oneWeekFromNow) {
      setDeadlineStyle('bg-warning/70 text-neutral px-2');
    } else {
      setDeadlineStyle('');
    }
  }, [deadline]);

  async function updateTaskComplete() {
    if (!window.confirm('Mark as complete?')) return;
    try {
      const url = `${API_URL}/api/v1/weddings/${taskObject.weddingId}/checklist/${taskObject.checklistId}/tasks/${taskObject._id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !taskObject.completed,
          completedAt: task.completed ? null : new Date(),
        }),
      });
      if (response.ok) {
        const data = response.json();
        console.log(data);
        refetchData();
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addComment() {
    try {
      const url = `${API_URL}/api/v1/weddings/${taskObject.weddingId}/checklist/${taskObject.checklistId}/tasks/${taskObject._id}/comments`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: user?.displayName,
          createdAt: new Date(),
          text: message,
        }),
      });
      if (response.ok) {
        const data = response.json();
        setMessage('');
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`bg-base-100 p-6 rounded text-sm`}>
      <div className='grid grid-cols-4 font-semibold'>
        <h1>{weddingName}</h1>
        <h3>{formatDate(weddingDate)}</h3>
        <h3>{task}</h3>
        <div className={` ${deadlineStyle} rounded w-fit`}>
          <EditableField
            value={formatDate(deadline)}
            fieldName='deadline'
            fieldType='date'
            // updateField={updateTask}
          />
        </div>
        {/* <h3>{formatDate(deadline)}</h3> */}
      </div>
      <hr className='my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-base-300 to-transparent opacity-25 dark:opacity-100' />
      <div className='grid grid-cols-4 h-full mt-6 font-semibold'>
        <div className='col-span-3 flex flex-col' style={{ minHeight: '100%' }}>
          <h3>Comments: </h3>
          <div className='mr-6 mt-6'>
            <div className='w-full flex-1 p-3 rounded  bg-base-300'>
              <div className='h-full w-full space-y-1'>
                <div className='max-h-64 overflow-y-scroll'>
                  {taskObject &&
                    taskObject.comments.map((comment: any) => {
                      return (
                        <ChatBubble
                          _id={comment._id}
                          parentId={comment.parentId}
                          text={comment.text}
                          createdAt={comment.createdAt}
                          authorId={comment.authorId}
                          author={comment.author}
                          updatedAt={comment.updatedAt}
                          weddingId={taskObject.weddingId}
                          chatStart={
                            comment.author === user?.displayName ? false : true
                          }
                          taskObject={taskObject}
                        />
                      );
                    })}
                </div>
              </div>

              <div className='col-span-3 rounded overflow-hidden mt-6'>
                <div className='flex'>
                  <input
                    value={message}
                    onChange={(event) => {
                      if (event.target instanceof HTMLInputElement) {
                        setMessage(event.target.value);
                      }
                    }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        addComment();
                      }
                    }}
                    type='textArea'
                    placeholder='Message...'
                    className='w-full h-6 font-normal placeholder:text-neutral-content/50 focus:outline-none p-3 focus:border-b focus:border-info text-sm placeholder:text-xs'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-6 mb-6'>
          <h3>Mark As Complete: </h3>
          <button
            onClick={updateTaskComplete}
            className='bg-success/80 text-neutral text-xs px-2 py-1 rounded flex items-center'
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}

interface ChatBubbleProps {
  _id: string;
  parentId: string;
  text: string;
  authorId: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  chatStart: boolean;
  weddingId: string;
  taskObject: any;
}

function ChatBubble({
  author,
  text,
  createdAt,
  chatStart,
  authorId,
  updatedAt,
  taskObject,
  _id,
}: ChatBubbleProps) {
  const [editing, setEditing] = useState(false);
  const { fetchTasks, refetchData, user } = useContext(WeddingContext);

  async function deleteComment() {
    try {
      const url = `${API_URL}/api/v1/weddings/${taskObject.weddingId}/checklist/${taskObject.checklistId}/tasks/${taskObject._id}/comments/${_id}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Comment deleted successfully');
        fetchTasks();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex items-center'>
      <div
        id={_id}
        onClick={(event) => setEditing(!editing)}
        className={`chat ${
          chatStart ? 'chat-start' : 'chat-end'
        } items-center space-y-1 flex-1`}
      >
        <div className='chat-image avatar'>
          {/* <div className='w-10 rounded-full'> */}
          {/* <img src='/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
          {/* </div> */}
        </div>
        <div className='chat-header text-xs'>
          {author}
          <time className='text-xs opacity-50'>{}</time>
        </div>
        <div className='chat-bubble text-xs flex items-center'>{text}</div>
        <div className='chat-footer opacity-50 text-xs'>Seen</div>
      </div>
      {editing && (
        <button
          onClick={deleteComment}
          className='bg-error/80 text-neutral rounded px-2 py-1 text-xs'
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default Tasks;

import { useState, useContext } from 'preact/hooks';
import { WeddingContext } from '../../../context/WeddingsContext';
import produce from 'immer';

function ChecklistItems(props: any) {
  const [showTodos, setShowTodos] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const { wedding, setWedding, allWeddings, setAllWeddings } =
    useContext(WeddingContext);

  async function updateWeddingChecklist(
    checklistIndex: number,
    taskIndex: number
  ) {
    if (!wedding) return;

    setWedding(
      produce(wedding, (draft) => {
        draft.checklist[checklistIndex].tasks[taskIndex].completed =
          !draft.checklist[checklistIndex].tasks[taskIndex].completed;
      })
    );

    setAllWeddings(
      produce(allWeddings, (draft) => {
        const weddingIndex = draft.findIndex((w) => w._id === wedding._id);

        draft[weddingIndex].checklist[checklistIndex].tasks[
          taskIndex
        ].completed =
          !draft[weddingIndex].checklist[checklistIndex].tasks[taskIndex]
            .completed;
      })
    );
  }

  async function updateChecklistTask(
    event: any,
    checklistIndex: number,
    taskIndex: number
  ) {
    if (!wedding) return;

    setWedding(
      produce(wedding, (draft) => {
        if (draft.checklist[checklistIndex]?.tasks[taskIndex])
          draft.checklist[checklistIndex].tasks[taskIndex].task =
            event.target?.value;
      })
    );

    setAllWeddings(
      produce(allWeddings, (draft) => {
        const weddingIndex = draft.findIndex((w) => w._id === wedding._id);
        if (draft[weddingIndex]?.checklist[checklistIndex]?.tasks[taskIndex]) {
          draft[weddingIndex].checklist[checklistIndex].tasks[taskIndex].task =
            event.target.value;
        }
      })
    );
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
          <input
            type='text'
            value={props.tasks.task}
            className=' flex-1 w-full px-2 focus:outline-none focus:border-b focus:border-blue-600'
            onBlur={(event) => {
              updateChecklistTask(event, props.checklistIndex, props.taskIndex);
              setEditingName(false);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.currentTarget.blur();
              }
            }}
          />
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

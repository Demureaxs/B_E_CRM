import { useContext } from 'preact/hooks';
import { formatDate } from '../../common/utilities/utilityFunctions';
import { IWedding, WeddingContext } from '../../context/WeddingsContext';
import produce from 'immer';
import { lazy } from 'preact/compat';
import WeddingModal from '../WeddingModal/WeddingModal';

// const WeddingsModal = lazy(() => import("./WeddingsModal"));

function WeddingsDashboard({}) {
  const {
    allWeddings,
    setAllWeddings,
    wedding,
    setWedding,
    showModal,
    setShowModal,
  } = useContext(WeddingContext);

  function updateWeddingChecklist(checklistIndex: number, taskIndex: number) {
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

  function updateChecklistTask(
    event: any,
    checklistIndex: number,
    taskIndex: number
  ) {
    if (!wedding) return;
    setWedding(
      produce(wedding, (draft) => {
        draft.checklist[checklistIndex].tasks[taskIndex].task =
          event.target?.value;
      })
    );

    setAllWeddings(
      produce(allWeddings, (draft) => {
        const weddingIndex = draft.findIndex((w) => w._id === wedding._id);
        draft[weddingIndex].checklist[checklistIndex].tasks[taskIndex].task =
          event.target.value;
      })
    );
  }

  function updateWeddingsField(fieldName: keyof IWedding, newValue: string) {
    if (!wedding) return;
    setWedding(
      produce(wedding, (draft) => {
        (draft as any)[fieldName] = newValue as any;
      })
    );

    setAllWeddings(
      produce(allWeddings, (draft) => {
        const weddingIndex = draft.findIndex((w) => w._id === wedding._id);
        (draft as any)[weddingIndex][fieldName] = newValue as any;
      })
    );
  }

  async function displayModal(event: MouseEvent) {
    setShowModal(!showModal);
    const target = event.target;
    if (target instanceof Element) {
      const selectedId = target.closest('.weddingContainer')?.id;
      console.log(selectedId);
      
      const url = `http://192.168.18.7:8000/api/v1/weddings/${selectedId}`;
      const response = await fetch(url);
      const data = await response.json();
      setWedding(data);

      // if (selectedId) {
      //   const selectedWedding = allWeddings.find(
      //     (wedding) => wedding._id === selectedId
      //   );
      //   if (selectedWedding) {
      //     setWedding(selectedWedding);
      //   }
      // }
    }
  }

  return (
    <section>
      <div className='grid grid-cols-5 text-sm font-bold border-b border-base-300 mb-4 p-6'>
        <div className='flex items-center space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>

          <h2>Wedding</h2>
        </div>

        <div className='flex items-center space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z'
            />
          </svg>

          <h2>Email</h2>
        </div>

        <div className='flex items-center space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
            />
          </svg>

          <h2>Date</h2>
        </div>

        <div className='flex items-center space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25'
            />
          </svg>

          <h2>Planner</h2>
        </div>

        <div className='flex items-center space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
            />
          </svg>

          <h2>Progress</h2>
        </div>
      </div>
      {/* Render all weddings */}
      {allWeddings &&
        [...allWeddings]
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((wedding) => {
            return (
              <div>
                <div
                  onClick={displayModal}
                  id={wedding._id}
                  className='weddingContainer space-y-4 bg-base-100 rounded text-sm'
                >
                  <div className='grid grid-cols-5 p-6 '>
                    <h1>{wedding.name}</h1>
                    <h1>{wedding.email}</h1>
                    <h1>{formatDate(wedding.date)}</h1>
                    <h1>{wedding.agent}</h1>
                    <div className=' flex items-center space-x-4'>
                      <progress
                        class='progress progress-success w-56'
                        value={getWeddingProgress(wedding)}
                        max='100'
                      ></progress>
                      <p className='text-sm'>{`${getWeddingProgress(
                        wedding
                      )}%`}</p>
                    </div>
                  </div>
                </div>
                <hr className='my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-base-100 to-transparent opacity-25 dark:opacity-100' />
              </div>
            );
          })}

      {/* Wedding modal */}
      {showModal && (
        <WeddingModal
          updateChecklistTask={updateChecklistTask}
          updateWeddingChecklist={updateWeddingChecklist}
          updateWeddingsField={updateWeddingsField}
          setShowModal={setShowModal}
          showModal={showModal}
          wedding={wedding}
        />
      )}
    </section>
  );
}

export function getWeddingProgress(wedding: IWedding): number {
  const weddingTasks = wedding.checklist.map(
    (checklistItem) => checklistItem.tasks
  );

  let totalTasks: any = [];

  weddingTasks.forEach((tasks) => {
    tasks.forEach((task) => {
      totalTasks = [...totalTasks, task];
    });
  });

  const completedTasks = totalTasks.filter(
    (task: any) => task.completed
  ).length;

  return +((completedTasks / totalTasks.length) * 100).toFixed(0);
}

export default WeddingsDashboard;

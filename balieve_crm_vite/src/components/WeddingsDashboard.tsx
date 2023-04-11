import SubHeader from './OverviewComponents/SubHeader';
import { useContext } from 'preact/hooks';
import { formatDate } from '../utilities/utilityFunctions';
import { lazy } from 'preact/compat';
import { IWedding, WeddingContext } from '../utilities/weddingsContext';
import produce from 'immer';

const WeddingsModal = lazy(() => import('./WeddingsModal'));

function WeddingsDashboard(props: any) {
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
      produce(wedding, draft => {
        draft.checklist[checklistIndex].tasks[taskIndex].completed =
          !draft.checklist[checklistIndex].tasks[taskIndex].completed;
      })
    );

    setAllWeddings(
      produce(allWeddings, draft => {
        const weddingIndex = draft.findIndex(w => w._id === wedding._id);
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
      produce(wedding, draft => {
        draft.checklist[checklistIndex].tasks[taskIndex].task =
          event.target?.value;
      })
    );

    setAllWeddings(
      produce(allWeddings, draft => {
        const weddingIndex = draft.findIndex(w => w._id === wedding._id);
        draft[weddingIndex].checklist[checklistIndex].tasks[taskIndex].task =
          event.target.value;
      })
    );
  }

  function updateWeddingsField(fieldName: keyof IWedding, newValue: string) {
    if (!wedding) return;
    setWedding(
      produce(wedding, draft => {
        draft[fieldName] = newValue as any;
      })
    );

    setAllWeddings(
      produce(allWeddings, draft => {
        const weddingIndex = draft.findIndex(w => w._id === wedding._id);
        draft[weddingIndex][fieldName] = newValue as any;
      })
    );
  }

  function displayModal(event: MouseEvent) {
    setShowModal(!showModal);
    const target = event.target;
    if (target instanceof Element) {
      const selectedId = target.closest('.weddingContainer')?.id;
      console.log(selectedId);
      if (selectedId) {
        const selectedWedding = allWeddings.find(
          wedding => wedding._id === selectedId
        );
        if (selectedWedding) {
          setWedding(selectedWedding);
        }
      }
    }
  }

  return (
    <section className="space-y-4">
      <SubHeader name={props.navTarget} />

      {/* Render in the weddings */}
      {allWeddings &&
        [...allWeddings]
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map(wedding => {
            return (
              <div
                onClick={displayModal}
                id={wedding._id}
                className="weddingContainer bg-slate-200 p-6 last:mb-0 mb-4 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-gray-200  shadow-lg cursor-pointer"
              >
                <section className="space-y-2">
                  <h1>Planner: {wedding.agent}</h1>
                  <p>Wedding of: {wedding.name}</p>
                  <p>Email: {wedding.email}</p>
                  <p>Date: {formatDate(wedding.date)}</p>
                  <p>Decoration: {wedding.decoration}</p>
                  <p>photographer: {wedding.photographer}</p>
                  <p>Videographer: {wedding.videographer}</p>
                  <p>Vendor Progress: {wedding.vendorProgress}</p>
                </section>
              </div>
            );
          })}

      {/* Weddings Modal */}
      {showModal && (
        <WeddingsModal
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

export default WeddingsDashboard;

import { useState, useEffect, useContext } from 'preact/hooks';
import { formatDateToShortForm } from '../../common/utilities/utilityFunctions';
import { IWedding, WeddingContext } from '../../context/WeddingsContext';
import { saveWedding } from './weddingModalUtils';
import produce from 'immer';
import EditableField from './components/common/EditableField';
import ChecklistContainer from './components/ChecklistContainer';
import { formatDate } from '../../common/utilities/utilityFunctions';
import API_URL from '../../env';

interface WeddingModalProps {
  wedding: IWedding | null;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  refetchWedding: () => void;
}

function WeddingModal(props: WeddingModalProps) {
  const [editingAgent, setEditingAgent] = useState(false);
  const {
    allWeddings,
    setAllWeddings,
    wedding,
    setWedding,
    showModal,
    setShowModal,
    refetchData,
    agents,
  } = useContext(WeddingContext);
  const [planner, setPlanner] = useState(wedding?.agent);

  useEffect(() => {
    setAllWeddings(allWeddings);
  }, [allWeddings]);

  // function to update top level fields in state
  async function updateWeddingsField(
    fieldName: keyof IWedding,
    newValue: string
  ) {
    if (!wedding) return;

    const url = `${API_URL}/api/v1/weddings/${wedding._id}`;

    let requestBody: Partial<IWedding> = { [fieldName]: newValue };

    // makes sure to set the request body to edit both the id and agent name - need to optimize
    if (fieldName === 'agent') {
      const agentId = agents.find((agent) => agent.displayName === newValue);
      requestBody = {
        ...requestBody,
        agentId: agentId?._id,
      };
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const updatedWeddings = await response.json();
        console.log('Wedding Field Updated Successfully');
        console.log(updatedWeddings);
        setWedding(updatedWeddings);
        refetchData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addChecklistContainer() {
    if (!wedding) return;

    const url = `${API_URL}/api/v1/weddings/${wedding._id}/checklist`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'Type',
          vendor: 'Vendor',
        }),
      });

      if (response.ok) {
        const updatedWedding = await response.json();
        console.log('Checklist container added');
        setWedding(updatedWedding);
        refetchData();
      } else {
        console.log('Failed to add checklist container');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleCloseModal(event: any) {
    if (event?.target.id === 'background') {
      saveWedding(wedding);
      props.setShowModal(!showModal);
    }
  }

  async function handleDeleteWedding() {
    if (!window.confirm('Are you sure you want to delete?')) return;
    try {
      const url = `${API_URL}/api/v1/weddings/${wedding?._id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Wedding Successfull Deleted');
      refetchData();
      props.setShowModal(!showModal);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div
        id='background'
        onClick={handleCloseModal}
        className='absolute w-full top-0 left-0 h-full bg-gray-500/60 flex justify-center items-center'
      >
        <div className='h-[90%] w-[900px] bg-base-100 rounded shadow-lg flex'>
          <div className='h-full w-full p-6 overflow-y-scroll space-y-10 flex-1 scrollbar-none'>
            {/* Wedding Name and Date */}
            <div className='flex space-x-4 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='w-5 h-5 mt-1'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
                />
              </svg>

              <div className='w-full'>
                <EditableField
                  value={wedding?.name}
                  fieldName='name'
                  fieldType='text'
                  updateField={updateWeddingsField}
                  isBold={true}
                />

                <EditableField
                  value={wedding?.email}
                  fieldName='email'
                  fieldType='email'
                  updateField={updateWeddingsField}
                />

                <EditableField
                  value={wedding?.date ? formatDate(wedding.date) : ''}
                  fieldName='date'
                  fieldType='date'
                  updateField={updateWeddingsField}
                />
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className='font-semibold text-sm'>Notifications:</h2>
            </div>

            {/* Description */}
            <div className='flex space-x-4'>
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
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
              <div className='text-sm space-y-2 w-full'>
                <div className='flex space-x-4 w-full'>
                  <h2 className='font-semibold text-base'>Description:</h2>
                  {/* <button className='bg-base-300 px-2 rounded text-xs'>
                    Edit
                  </button> */}
                </div>
                <div className='space-y-2 w-full'>
                  <div className='flex space-x-2 w-full'>
                    <h2 className='font-semibold'>Budget: </h2>
                    <EditableField
                      value={wedding?.budget || 0}
                      fieldName='budget'
                      fieldType='number'
                      updateField={updateWeddingsField}
                      forceFull={true}
                    />
                  </div>
                  <div className='flex space-x-2 w-full'>
                    <h2 className='font-semibold'>Venue: </h2>
                    <EditableField
                      value={wedding?.venue}
                      fieldName='venue'
                      fieldType='text'
                      updateField={updateWeddingsField}
                      forceFull={true}
                    />
                  </div>
                  <div className='flex space-x-2 w-full'>
                    <h2 className='font-semibold'>Guests: </h2>
                    <EditableField
                      value={wedding?.guests}
                      fieldName='guests'
                      fieldType='number'
                      updateField={updateWeddingsField}
                      forceFull={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className='flex space-x-4'>
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
                  d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
                />
              </svg>
              <h1 className='font-semibold'>Attachments: </h1>
            </div>

            {/* Checklist Render */}

            {wedding?.checklist.map((checklistItem: any, index: number) => {
              return (
                <div key={checklistItem._id}>
                  <ChecklistContainer
                    refetchWedding={props.refetchWedding}
                    task={checklistItem}
                    checklistIndex={index}
                  />
                </div>
              );
            })}
            <button
              onClick={addChecklistContainer}
              className='text-xs bg-success/80 text-neutral px-2 py-1 rounded'
            >
              Add Checklist
            </button>
          </div>

          <div className='w-[25%] p-6 space-y-4'>
            <div className='space-y-4'>
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

              <button className='bg-base-300 px-2 py-1 rounded text-sm w-full text-left flex space-x-1 items-center'>
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
              <div className='text-sm space-y-2'>
                <h2 className='font-semibold'>Additional Info</h2>
                {wedding?.createdAt && (
                  <div>
                    <p className='font-semibold'>Created: </p>
                    <p>{formatDate(wedding.createdAt)}</p>
                  </div>
                )}
              </div>

              <div className='text-sm'>
                <h1 className='font-semibold'>Planner:</h1>
                {editingAgent ? (
                  <select
                    name='agent'
                    value={wedding?.agent}
                    onChange={(event) => {
                      if (event.target instanceof HTMLSelectElement) {
                        updateWeddingsField('agent', event.target.value);
                        // setPlanner(event.target.value);
                      }
                    }}
                    className='focus:outline-none text-sm w-full'
                  >
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent.displayName}>
                        {agent.displayName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p onClick={() => setEditingAgent(!editingAgent)}>
                    {wedding?.agent}
                  </p>
                )}
              </div>

              <button
                onClick={handleDeleteWedding}
                className='bg-error/80 text-neutral px-2 py-1 rounded text-xs'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------Checklist Containers ----------------------------------------------------------------

export default WeddingModal;

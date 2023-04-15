import { useState, useEffect } from 'preact/hooks';
import {
  formatDate,
  formatIdFromName,
  formatDateToShortForm,
} from '../../common/utilities/utilityFunctions';
import { IWedding, WeddingContext } from '../../context/WeddingsContext';
import EditWedding from '../Edit Wedding/EditWedding';
import { JSX } from 'preact/jsx-runtime';

interface WeddingModalProps {
  wedding: IWedding | null;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  updateWeddingsField: (fieldName: keyof IWedding, newValue: string) => void;
  updateChecklistTask: (
    event: any,
    checklistIndex: number,
    taskIndex: number
  ) => void;
  updateWeddingChecklist: (checklistIndex: number, taskIndex: number) => void;
}

function WeddingModal(props: WeddingModalProps) {
  const [editingName, setEditingName] = useState(false);
  const [editingDate, setEditingDate] = useState(false);

  useEffect(() => {
    console.log(props.wedding);
  }, []);

  async function saveWedding(wedding: any) {
    if (!wedding) return;

    const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wedding),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Wedding updated successfully');
    } catch (error) {
      console.error('Error updating wedding:', error);
    }
  }

  function handleCloseModal(event: any) {
    if (event?.target.id === 'background') {
      saveWedding(props.wedding);
      props.setShowModal(!props.showModal);
    }
  }

  return (
    <div>
      <div
        id='background'
        onClick={handleCloseModal}
        className='absolute w-full top-0 left-0 h-full bg-gray-500/60 flex justify-center items-center'
      >
        <div className='h-[90%] w-[900px] bg-base-100 rounded'>
          <div>
            <EditableField
              value={props.wedding?.name}
              updateWeddingsField={props.updateWeddingsField}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditableField(props: any) {
  const [editing, setEditing] = useState(false);

  function handleBlur(event: any) {
    props.updateWeddingsField('name', event.target.value);
    setEditing(false);
  }

  return editing ? (
    <input
      type={props.fieldType}
      value={props.value}
      onBlur={handleBlur}
      onKeyPress={async (event) => {
        if (event.key === 'Enter') {
          event.currentTarget.blur();
        }
      }}
    />
  ) : (
    <span onClick={() => setEditing(true)}>{props.value}</span>
  );
}

export default WeddingModal;

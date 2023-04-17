import { useState } from 'preact/hooks';

function EditableField(props: any) {
  const [editing, setEditing] = useState(false);

  function handleBlur(event: any) {
    if (event.target.value !== '') {
      props.updateField(props.fieldName, event.target.value);
    }
    setEditing(false);
  }

  // const inputWidth = `${Math.max(props.value.length * 0.75, 4)}rem`;

  return editing ? (
    <div className={`${props.forceFull ? 'w-full' : ''}`}>
      <input
        className='w-full flex-1 focus:outline-none focus:border-b focus:border-blue-600'
        size={40}
        type={props.fieldType}
        value={props.value}
        onBlur={handleBlur}
        onKeyPress={async (event) => {
          if (event.key === 'Enter') {
            event.currentTarget.blur();
          }
        }}
      />
    </div>
  ) : (
    <div className={props.forceFull ? 'w-full' : ''}>
      <p
        onClick={() => setEditing(true)}
        className={`${
          props.isBold ? 'font-semibold' : ''
        } w-full whitespace-nowrap`}
      >
        {props.value}
      </p>
    </div>
  );
}

export default EditableField;

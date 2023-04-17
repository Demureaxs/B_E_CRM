function ProgressComponent(props: any) {
  return (
    <div className='w-full bg-base-300 rounded-full h-2 overflow-hidden'>
      <div
        className={`${
          props.value === 100 ? 'bg-green-400' : 'bg-blue-400'
        } h-full transition-all duration-700`}
        style={{ width: `${props.value}%` }}
      ></div>
    </div>
  );
}

export default ProgressComponent;

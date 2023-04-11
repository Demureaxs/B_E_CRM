function SubHeader(props: any) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        <h2 className="text-xl font-bold">{props.name}</h2>
      </div>

      <div className="flex justify-between items-center -space-x-3">
        <div className="h-10 w-10 bg-gray-500 rounded-full border-2 flex items-center justify-center"></div>
        <div className="h-10 w-10 bg-gray-500 rounded-full border-2 flex items-center justify-center"></div>
        <div className="h-10 w-10 bg-gray-500 rounded-full border-2 flex items-center justify-center"></div>
        <div className="h-10 w-10 bg-gray-500 rounded-full border-2 flex items-center justify-center"></div>
        <div className="h-10 w-10 bg-gray-500 rounded-full border-2 flex items-center justify-center text-sm text-gray-200">
          +6
        </div>
      </div>
    </header>
  );
}

export default SubHeader;

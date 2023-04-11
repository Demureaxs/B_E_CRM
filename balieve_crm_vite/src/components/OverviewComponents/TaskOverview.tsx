import { h } from 'preact';
import { useState } from 'preact/hooks';

function TaskOverview(props: any) {
  const [totalTasks, setTotalTasks] = useState(props.totalTasks);

  return (
    <section className="flex gap-4 h-[280px]">
      <div className="h-full flex-1 grid grid-rows-2 grid-cols-2 gap-4">
        <TaskItem
          label="Total Tasks"
          count={props.totalTasks}
          newThisWeek="+7 this week"
          textColor="text-slate-200"
          colorFrom="from-green-900"
          colorTo="to-green-800"
        />

        <TaskItem
          label="Completed"
          count={props.completedTasks}
          newThisWeek="+1 this week"
          textColor="text-gray-700"
          colorFrom="from-slate-100"
          colorTo="to-slate-200"
        />

        <TaskItem
          label="Overdue"
          count={props.overdueTasks}
          newThisWeek="+1 this week"
          textColor="text-gray-700"
          colorFrom="from-slate-100"
          colorTo="to-slate-200"
        />

        <TaskItem
          label="Invoices"
          count={props.todoTasks}
          newThisWeek="+4 this week"
          textColor="text-gray-700"
          colorFrom="from-slate-200"
          colorTo="to-slate-300"
        />
      </div>

      {/* Get Premium plus  */}
      <div className="h-full w-[300px] 2xl:w-[400px] text-4xl font-bold flex justify-between flex-col p-6 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-gray-200  shadow-lg">
        <p>
          Get <span className="text-green-800">Premium+</span> to manage more
          than 100 projects
        </p>
        <aside className="text-base">Learn More &rarr;</aside>
      </div>

      {/* Overall Progress */}
      <div className="bg-slate-200 h-full w-[250px] flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-gray-200  shadow-lg">
        <div className=" h-48 w-48 rounded-full border-[12px] border-green-700 flex items-center justify-center">
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold">52%</p>
            <p className="text-xs font-semibold">Overall Progress</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskItem(props: any) {
  return (
    <div
      className={`${props.textColor} rounded-lg flex justify-between items-center p-6 bg-gradient-to-br ${props.colorFrom} ${props.colorTo} border border-gray-200  shadow-lg`}
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{props.count}</h1>
        <p className="text-sm font-semibold">{props.label}</p>
        <p className="text-sm font-semibold">{props.newThisWeek}</p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 self-start"
      >
        <path
          fill-rule="evenodd"
          d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  );
}

export default TaskOverview;

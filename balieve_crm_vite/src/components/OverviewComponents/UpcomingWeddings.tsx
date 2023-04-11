import { formatDate } from '../../utilities/utilityFunctions';
import WeddingTodos from './WeddingTodos';
import { IWedding } from '../../utilities/weddingsContext';

interface UpcomingWeddingsProps {
  allWeddings: IWedding[];
}

function UpcomingWeddings(props: UpcomingWeddingsProps) {
  return (
    <section>
      <h2 className="text-xl font-bold pb-4">Upcoming Weddings</h2>
      <section className="grid grid-cols-3 gap-4 h-[250px]">
        {props.allWeddings &&
          props.allWeddings
            .slice()
            .sort((a: any, b: any) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            })
            .slice(0, 3)
            .map(wedding => {
              return (
                <div className=" rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border border-gray-200  shadow-lg p-6 flex items-start">
                  <div className=" space-y-2 flex-1">
                    <h2>
                      <span className="font-bold">Wedding: </span>
                      {wedding.name}
                    </h2>

                    <p>
                      <span className="font-bold">Date: </span>
                      {formatDate(wedding.date)}
                    </p>

                    <p>
                      <span className="font-bold">Venue: </span>
                      {wedding.venue}
                    </p>

                    <h2 className="font-bold pt-4">Upcoming Tasks: </h2>

                    <div className=" space-y-2">
                      {wedding.todos &&
                        wedding.todos
                          .slice()
                          .sort((a: any, b: any) => a.deadline - b.deadline)
                          .slice(0, 2)
                          .map(todo => {
                            return (
                              <WeddingTodos
                                task={todo.task}
                                deadline={todo.deadline}
                              />
                            );
                          })}
                    </div>
                  </div>
                </div>
              );
            })}
      </section>
    </section>
  );
}

export default UpcomingWeddings;

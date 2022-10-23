import { useGetTodosQuery } from "./todosApiSlice";
import Todo from "./Todo";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const TodosList = () => {
  useTitle("techTodos: Todos List");

  const { username, isManager, isAdmin } = useAuth();

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery("todosList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = todos;

    let filteredIds;
    // if (isManager || isAdmin) {
    //   filteredIds = [...ids];
    // } else {
    //   filteredIds = ids.filter(
    //     (todoId) => entities[todoId].username === username
    //   );
    // }
    filteredIds = [...ids];

    const tableContent =
      ids?.length &&
      filteredIds.map((todoId) => <Todo key={todoId} todoId={todoId} />);

    content = (
      <table className="table table--todos">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th todo__status">
              Todo Status
            </th>
            <th scope="col" className="table__th todo__created">
              Created
            </th>
            <th scope="col" className="table__th todo__updated">
              Updated
            </th>
            <th scope="col" className="table__th todo__title">
              Title
            </th>
            <th scope="col" className="table__th todo__username">
              Created By
            </th>
            <th scope="col" className="table__th todo__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default TodosList;

import { useParams } from "react-router-dom";
import EditTodoForm from "./EditTodoForm";
import { useGetTodosQuery } from "./todosApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditTodo = () => {
  useTitle("techTodos: Edit Todo");

  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { todo } = useGetTodosQuery("todosList", {
    selectFromResult: ({ data }) => ({
      todo: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!todo || !users?.length) return <PulseLoader color={"#FFF"} />;

  // if (!isManager && !isAdmin) {
  //   if (todo.username !== username) {
  //     return <p className="errmsg">No access</p>;
  //   }
  // }

  const content = <EditTodoForm todo={todo} users={users} />;

  return content;
};
export default EditTodo;

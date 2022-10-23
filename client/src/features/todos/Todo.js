import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetTodosQuery } from "./todosApiSlice";
import { memo } from "react";

const Todo = ({ todoId }) => {
  const { todo } = useGetTodosQuery("todosList", {
    selectFromResult: ({ data }) => ({
      todo: data?.entities[todoId],
    }),
  });

  const navigate = useNavigate();

  if (todo) {
    const created = new Date(todo.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(todo.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/todos/${todoId}`);

    return (
      <tr className="table__row">
        <td className="table__cell todo__status">
          {todo.completed ? (
            <span className="todo__status--completed">Completed</span>
          ) : (
            <span className="todo__status--open">Open</span>
          )}
        </td>
        <td className="table__cell todo__created">{created}</td>
        <td className="table__cell todo__updated">{updated}</td>
        <td className="table__cell todo__title">{todo.title}</td>
        <td className="table__cell todo__username">{todo.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedTodo = memo(Todo);

export default memoizedTodo;

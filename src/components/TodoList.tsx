import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { api } from "~/utils/api";
import TodoItem from "./TodoItem";
import { useTodoFiltersState } from "~/store/todoFilters.state";

const TodoList = () => {
  const searchText = useTodoFiltersState((state) => state.searchText);

  const { data: todos } = api.todo.getAll.useQuery(
    {
      searchText,
    },
    {
      initialData: [],
    }
  );
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

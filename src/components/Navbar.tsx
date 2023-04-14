import { openContextModal } from "@mantine/modals";
import React from "react";
import Login from "./Login";
import { useTodoFiltersState } from "~/store/todoFilters.state";

const Navbar = () => {
  const openCreateTodoModal = () => {
    openContextModal({
      title: "Создать задачу",
      modal: "createTodo",
      innerProps: {},
    });
  };

  const searchText = useTodoFiltersState((state) => state.searchText);
  const setSearchText = useTodoFiltersState((state) => state.setSearchText);

  return (
    <div className="mb-6 flex justify-between ">
      <h2 className="text-2xl font-normal">Todo List</h2>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-44 rounded-md border border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <button
        className="rounded-md bg-violet-500 p-2 text-sm text-white transition hover:bg-violet-600"
        onClick={openCreateTodoModal}
      >
        Добавить
      </button>
      <Login />
    </div>
  );
};

export default Navbar;

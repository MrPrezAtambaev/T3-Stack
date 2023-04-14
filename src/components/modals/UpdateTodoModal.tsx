import { ContextModalProps } from "@mantine/modals";
import React from "react";
import { api } from "~/utils/api";
import TodoForm, { TodoFormValues } from "../TodoForm";
import { Text } from "@mantine/core";

type Props = ContextModalProps<{
  todoId: string;
}>;

const UpdateTodoModal = ({ context, id, innerProps }: Props) => {
  const utils = api.useContext();

  const updateTodoMutation = api.todo.updateTodo.useMutation({
    onSettled() {
      utils.todo.invalidate();
    },
  });
  const {
    data: todo,
    isLoading,
    error,
  } = api.todo.getById.useQuery({ id: innerProps.todoId });

  const handleSubmit = (values: TodoFormValues) => {
    updateTodoMutation.mutate({ id: innerProps.todoId, data: values });
    context.closeModal(id);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red">{error.message}</Text>;
  }

  if (!todo) return <Text color="red">Not Found!!</Text>;

  return (
    <TodoForm
      onSubmit={handleSubmit}
      defaultValues={{
        title: todo.title,
        completed: todo.completed,
      }}
    />
  );
};

export default UpdateTodoModal;

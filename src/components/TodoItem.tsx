import { ActionIcon, Avatar, Group, Text, Tooltip } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { Todo, User } from "@prisma/client";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React from "react";
import { api } from "~/utils/api";

type Props = {
  todo: Todo & { author: User };
};

const TodoItem = ({ todo }: Props) => {
  const utils = api.useContext();

  const deleteTodoMutation = api.todo.deleteById.useMutation({
    onSettled() {
      utils.todo.getAll.invalidate();
    },
  });

  const openCreateTodoModal = () => {
    openContextModal({
      title: "Изменить задачу",
      modal: "updateTodo",
      innerProps: {
        todoId: todo.id,
      },
    });
  };

  return (
    <Group align="center" className="mt-5">
      <Text
        style={{
          textDecoration: todo.completed ? "line-through" : "auto",
        }}
      >
        {todo.title}
      </Text>
      <Group align="center" spacing={5} ml="auto">
        <Tooltip label={todo.author.email ?? "No Name Author"}>
          <Avatar
            src={
              todo.author.image
                ? todo.author.image
                : todo.author.email
                ? `https://gravatar.com/avatar/${todo.author.email}?s=400&d=robohash&r=x`
                : undefined
            }
            size="sm"
            radius="xl"
          />
        </Tooltip>
        <ActionIcon
          onClick={() => {
            deleteTodoMutation.mutate({ id: todo.id });
          }}
          size="xs"
          variant="outline"
          color="red"
        >
          <IconTrash />
        </ActionIcon>
        <ActionIcon
          onClick={openCreateTodoModal}
          size="xs"
          variant="outline"
          color="green"
        >
          <IconPencil />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default TodoItem;

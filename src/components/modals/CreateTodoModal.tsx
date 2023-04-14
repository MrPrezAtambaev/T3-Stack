import { ContextModalProps } from "@mantine/modals";
import TodoForm, { TodoFormValues } from "../TodoForm";
import { api } from "~/utils/api";

type Props = ContextModalProps<{}>;

const CreateTodoModal = ({ context, id, innerProps }: Props) => {
  const utils = api.useContext();

  const createTodoMutation = api.todo.createOne.useMutation({
    onSettled() {
      utils.todo.invalidate();
    },
  });

  const handleSubmit = (values: TodoFormValues) => {
    createTodoMutation.mutate(values);
    context.closeModal(id);
  };

  return <TodoForm onSubmit={handleSubmit} />;
};

export default CreateTodoModal;

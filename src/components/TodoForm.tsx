import { useForm, zodResolver } from "@mantine/form";
import React from "react";
import { z } from "zod";

const todoFormSchema = z.object({
  title: z.string().nonempty(),
  completed: z.boolean(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

type Props = {
  onSubmit(values: TodoFormValues): void;
  defaultValues?: Partial<TodoFormValues>;
};

const TodoForm = ({ onSubmit, defaultValues }: Props) => {
  const form = useForm<TodoFormValues>({
    initialValues: {
      title: "",
      completed: false,
      ...defaultValues,
    },
    validate: zodResolver(todoFormSchema),
  });

  const handleSubmit = (values: TodoFormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex justify-around"
    >
      <input
        type="text"
        {...form.getInputProps("title")}
        className="w-48 rounded-md border border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <label className="flex items-center">Status</label>
      <input
        type="checkbox"
        {...form.getInputProps("completed", { type: "checkbox" })}
        className="~  .control_indicator mr-2 checked:bg-purple-800"
      />
      <button
        type="submit"
        className="ml-4 rounded-md bg-violet-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;

import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

const todoSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  completed: z.boolean().default(false),
});

export const todoRouter = createTRPCRouter({
  //! Create todo
  createOne: protectedProcedure
    .input(todoSchema.omit({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
      });
    }),

  //! Get all Todo
  getAll: publicProcedure
    .input(
      z
        .object({
          searchText: z.string().optional(),
        })
        .default({})
    )
    .query(({ ctx, input }) => {
      const filters: Prisma.TodoWhereInput[] = [];

      if (input.searchText) {
        filters.push({
          title: {
            contains: input.searchText,
          },
        });
      }

      return ctx.prisma.todo.findMany({
        where: {
          AND: filters.length > 0 ? filters : undefined,
        },
        include: {
          author: true,
        },
      });
    }),

  //! Update Todo
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: todoSchema.omit({ id: true }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  //! Get by Id
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.todo.findUnique({ where: { id: input.id } });
    }),

  //! delete todo
  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.delete({ where: { id: input.id } });
    }),
});

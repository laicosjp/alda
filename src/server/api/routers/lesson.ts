import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const lessonRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.lesson.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.lesson.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
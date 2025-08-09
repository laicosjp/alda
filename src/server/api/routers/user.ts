import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
	getCurrent: protectedProcedure.query(async ({ ctx }) => {
		const user = await ctx.db.user.findUnique({
			where: { id: ctx.session.user.id },
		});
		return user;
	}),

	update: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1).max(100).optional(),
				email: z.string().email().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const updatedUser = await ctx.db.user.update({
				where: { id: ctx.session.user.id },
				data: {
					...(input.name !== undefined && { name: input.name }),
					...(input.email !== undefined && { email: input.email }),
				},
			});
			return updatedUser;
		}),
});
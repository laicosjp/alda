import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getVideoInfo, searchVideos, getChannelVideos } from "~/server/services/youtube";

export const youtubeRouter = createTRPCRouter({
	getVideoInfo: publicProcedure
		.input(z.object({ videoId: z.string() }))
		.query(async ({ input }) => {
			const videoInfo = await getVideoInfo(input.videoId);
			if (!videoInfo) {
				throw new Error("Video not found");
			}
			return videoInfo;
		}),

	searchVideos: publicProcedure
		.input(z.object({ 
			query: z.string(),
			maxResults: z.number().min(1).max(50).optional().default(10)
		}))
		.query(async ({ input }) => {
			return await searchVideos(input.query, input.maxResults);
		}),

	getChannelVideos: publicProcedure
		.input(z.object({ 
			channelId: z.string(),
			maxResults: z.number().min(1).max(50).optional().default(10)
		}))
		.query(async ({ input }) => {
			return await getChannelVideos(input.channelId, input.maxResults);
		}),
});
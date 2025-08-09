import { google } from "googleapis";
import { env } from "~/env";

const youtube = google.youtube({
	version: "v3",
	auth: env.YOUTUBE_API_KEY,
});

export interface VideoInfo {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	channelTitle: string;
	publishedAt: string;
	duration: string;
	viewCount: string;
	likeCount: string;
	commentCount: string;
}

export async function getVideoInfo(videoId: string): Promise<VideoInfo | null> {
	try {
		const response = await youtube.videos.list({
			part: ["snippet", "contentDetails", "statistics"],
			id: [videoId],
		});

		const video = response.data.items?.[0];
		if (!video) {
			return null;
		}

		return {
			id: video.id!,
			title: video.snippet?.title ?? "",
			description: video.snippet?.description ?? "",
			thumbnailUrl: video.snippet?.thumbnails?.high?.url ?? "",
			channelTitle: video.snippet?.channelTitle ?? "",
			publishedAt: video.snippet?.publishedAt ?? "",
			duration: video.contentDetails?.duration ?? "",
			viewCount: video.statistics?.viewCount ?? "0",
			likeCount: video.statistics?.likeCount ?? "0",
			commentCount: video.statistics?.commentCount ?? "0",
		};
	} catch (error) {
		console.error("Error fetching video info:", error);
		throw new Error("Failed to fetch video information");
	}
}

export async function searchVideos(query: string, maxResults = 10) {
	try {
		const response = await youtube.search.list({
			part: ["snippet"],
			q: query,
			type: ["video"],
			maxResults,
		});

		return response.data.items?.map((item) => ({
			id: item.id?.videoId ?? "",
			title: item.snippet?.title ?? "",
			description: item.snippet?.description ?? "",
			thumbnailUrl: item.snippet?.thumbnails?.high?.url ?? "",
			channelTitle: item.snippet?.channelTitle ?? "",
			publishedAt: item.snippet?.publishedAt ?? "",
		})) ?? [];
	} catch (error) {
		console.error("Error searching videos:", error);
		throw new Error("Failed to search videos");
	}
}

export async function getChannelVideos(channelId: string, maxResults = 10) {
	try {
		const response = await youtube.search.list({
			part: ["snippet"],
			channelId,
			type: ["video"],
			order: "date",
			maxResults,
		});

		return response.data.items?.map((item) => ({
			id: item.id?.videoId ?? "",
			title: item.snippet?.title ?? "",
			description: item.snippet?.description ?? "",
			thumbnailUrl: item.snippet?.thumbnails?.high?.url ?? "",
			channelTitle: item.snippet?.channelTitle ?? "",
			publishedAt: item.snippet?.publishedAt ?? "",
		})) ?? [];
	} catch (error) {
		console.error("Error fetching channel videos:", error);
		throw new Error("Failed to fetch channel videos");
	}
}
"use client";

import { api } from "~/trpc/react";

const LessonVideo = ({ lessonId }: { lessonId: string }) => {
	const { data: lesson, isLoading } = api.lesson.getById.useQuery({
		id: lessonId,
	});

	return (
		<div className="bg-primary-content">
			<div className="container mx-auto max-w-7xl p-4">
				<div className="flex gap-4">
					<div className="flex flex-col gap-4 w-4/7">
						<div className="aspect-video">
							{lesson && (
								<iframe
									className="h-full w-full"
									src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
									title={lesson.title}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							)}
						</div>
						<div className="bg-base-100 p-6 flex flex-col gap-4 rounded">
							<p className="mx-auto">
								This is a local train bound for Motomachi-chukagai.
							</p>
							<p className="mx-auto">この電車は元町中華街行きの普通電車です</p>
						</div>
					</div>
					<div className="w-3/7 bg-base-100 rounded overflow-y-scroll">
						<div className="border-b border-neutral-content p-3">字幕</div>
						<div className="flex flex-col divide-y divide-base-300">
							<div className="p-4">
								<p className="">
									this is a local train bound for motomachi-chukagai
								</p>
								<p className="">この電車は元町中華街行きの普通電車です</p>
							</div>
							<div className="p-4">
								<p className="">
									this is a local train bound for motomachi-chukagai
								</p>
								<p className="">この電車は元町中華街行きの普通電車です</p>
							</div>
							<div className="p-4">
								<p className="">
									this is a local train bound for motomachi-chukagai
								</p>
								<p className="">この電車は元町中華街行きの普通電車です</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonVideo;

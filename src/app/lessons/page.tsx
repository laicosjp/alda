"use client";

import { api } from "~/trpc/react";

export default function LessonsPage() {
  const { data: lessons, isLoading } = api.lesson.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">レッスン一覧</h1>
      
      {!lessons || lessons.length === 0 ? (
        <p className="text-gray-500">レッスンがありません</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold mb-2">{lesson.title}</h2>
              
              {lesson.youtubeId && (
                <div className="aspect-video mb-2">
                  <iframe
                    className="w-full h-full rounded"
                    src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              <p className="text-sm text-gray-500">
                作成日: {new Date(lesson.createdAt).toLocaleDateString('ja-JP')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
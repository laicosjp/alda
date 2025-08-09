"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: lesson, isLoading, error } = api.lesson.getById.useQuery({ id });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">レッスンが見つかりません</p>
          <button
            onClick={() => router.push("/lessons")}
            className="text-blue-500 hover:underline"
          >
            レッスン一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <button
        onClick={() => router.push("/lessons")}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← レッスン一覧に戻る
      </button>

      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

      {lesson.youtubeId && (
        <div className="aspect-video mb-6">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">レッスン情報</h2>
        <dl className="space-y-2">
          <div className="flex">
            <dt className="font-medium text-gray-600 w-24">ID:</dt>
            <dd className="text-gray-900">{lesson.id}</dd>
          </div>
          <div className="flex">
            <dt className="font-medium text-gray-600 w-24">作成日:</dt>
            <dd className="text-gray-900">
              {new Date(lesson.createdAt).toLocaleDateString('ja-JP')}
            </dd>
          </div>
          <div className="flex">
            <dt className="font-medium text-gray-600 w-24">更新日:</dt>
            <dd className="text-gray-900">
              {new Date(lesson.updatedAt).toLocaleDateString('ja-JP')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
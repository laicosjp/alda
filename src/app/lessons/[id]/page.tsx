'use client'

import { useParams, useRouter } from "next/navigation";
import Header from "~/app/_components/core/Header";
import LessonVideo from "~/app/_components/lesson/LessonVideo";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;


  return (
    <div>
      <Header />
      <LessonVideo lessonId={id} />
    </div>
  )

}

import { PrismaClient } from "@prisma/client";
import { getVideoInfo } from "../src/server/services/youtube";

const prisma = new PrismaClient();

async function main() {
  const youtubeIds = [
    "nKRDbxVWJ6U",
    "510yqkL6uyQ",
    "2K82JBTvPCg",
    "hGFgzu71aco",
    "umSVYiHcJcQ",
    "AkLU7W-BqcU",
    "7iXAyM_OGoA",
  ];

  for (const youtubeId of youtubeIds) {
    try {
      const videoInfo = await getVideoInfo(youtubeId);
      const title = videoInfo ? videoInfo.title : `Lesson ${youtubeId}`;
      
      await prisma.lesson.create({
        data: {
          title: title,
          youtubeId: youtubeId,
        },
      });
      
      console.log(`Created lesson: ${title}`);
    } catch (error) {
      console.error(`Error fetching video ${youtubeId}:`, error);
      // Fallback to generic title if API fails
      await prisma.lesson.create({
        data: {
          title: `Lesson ${youtubeId}`,
          youtubeId: youtubeId,
        },
      });
    }
  }

  console.log(`Created ${youtubeIds.length} lessons`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

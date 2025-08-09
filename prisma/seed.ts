import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const youtubeIds = [
    "nKRDbxVWJ6U",
    "510yqkL6uyQ",
    "2K82JBTvPCg",
    "hGFgzu71aco",
    "umSVYiHcJc",
    "AkLU7W-BqcU",
    "7iXAyM_OGoA",
  ];

  for (const youtubeId of youtubeIds) {
    await prisma.lesson.create({
      data: {
        title: `Lesson ${youtubeId}`,
        youtubeId: youtubeId,
      },
    });
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
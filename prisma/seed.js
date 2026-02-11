const { PrismaClient, PostStatus } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.blogPost.create({
    data: {
      title: "Welcome to the Blog (JS seed)",
      slug: "welcome-to-the-blog-js-seed",
      excerpt: "This is an example seeded blog post (JS).",
      content: "<p>This is the first seeded post created by the JS seed.</p>",
      coverImage: null,
      seoTitle: "Welcome to the Blog",
      seoDescription: "An example blog post created by the seed script.",
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  console.log("Seeded blog post id:", post.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create some sample data
  const website = await prisma.website.create({
    data: {
      baseUrl: "https://example.com",
      title: "Example Website",
      logo: "https://example.com/logo.png",
      except: "Some exception text",
      isDeleted: false,
      isAdultOnly: false,
      Error: {
        create: [
          {
            httpCode: 404,
            message: "Not Found",
            stack: "Error stack trace",
            userIp: "127.0.0.1",
          },
        ],
      },
      Category: {
        create: [
          {
            Category: {
              create: {
                name: "Category 1",
                order: 1,
              },
            },
          },
        ],
      },
      Tag: {
        create: [
          {
            Tag: {
              create: {
                name: "Tag 1",
                order: 1,
              },
            },
          },
        ],
      },
    },
  });

  const image = await prisma.image.create({
    data: {
      caption: "Sample Image",
      fileName: "image.png",
      Category: {
        create: [
          {
            name: "Image Category",
            order: 1,
          },
        ],
      },
    },
  });

  const fakeMeta = await prisma.fakeMeta.create({
    data: {
      title: "Fake Meta Title",
      description: "Fake Meta Description",
      ogImageUrl: "https://example.com/og-image.png",
      redirectUrl: "https://example.com/redirect",
    },
  });

  const visitor = await prisma.visitor.create({
    data: {
      uid: "unique-visitor-id",
      nickname: "Visitor Nickname",
      userIp: "127.0.0.1",
      userAgent: "Mozilla/5.0",
      VisitLog: {
        create: [
          {
            trackCode: "track-code",
            fullUrl: "https://example.com/full-url",
            userIp: "127.0.0.1",
            userAgent: "Mozilla/5.0",
            screenResolution: "1920x1080",
            latitude: 37.7749,
            longitude: -122.4194,
            accuracy: 10.0,
          },
        ],
      },
    },
  });

  console.log({ website, image, fakeMeta, visitor });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

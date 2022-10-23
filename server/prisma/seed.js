const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    username: "Alice",
    password: "Alice",
    todos: {
      create: [
        {
          title: "Join the Prisma Slack",
          text: "https://slack.prisma.io",
          completed: true,
        },
      ],
    },
  },
  {
    username: "Nilu",
    password: "Nilu",
    todos: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          text: "https://www.twitter.com/prisma",
          completed: true,
        },
      ],
    },
  },
  {
    username: "Mahmoud",
    password: "Mahmoud",
    todos: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          text: "https://www.github.com/prisma/prisma/discussions",
          completed: true,
        },
        {
          title: "Prisma on YouTube",
          text: "https://pris.ly/youtube",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

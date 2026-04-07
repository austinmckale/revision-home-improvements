import { prisma } from "./src/lib/prisma";

async function main() {
  const [latest, today, orgs] = await Promise.all([
    prisma.lead.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orgId: true,
        contactName: true,
        source: true,
        stage: true,
        createdAt: true,
        externalRef: true,
        serviceType: true,
      },
    }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        stage: "NEW",
      },
    }),
    prisma.organization.findMany({
      select: { id: true, name: true },
      take: 10,
      orderBy: { createdAt: "asc" },
    }),
  ]);

  console.log(JSON.stringify({ today, orgs, latest }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

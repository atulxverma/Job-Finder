import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Started...");

  // Step 1: Clear old data
  await prisma.application.deleteMany({});
  await prisma.openings.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});

  // Step 2: Create 5 Users (owners)
  const owners = await Promise.all(
    [
      "owner1@test.com",
      "owner2@test.com",
      "owner3@test.com",
      "owner4@test.com",
      "owner5@test.com",
    ].map((email) =>
      prisma.user.create({
        data: {
          email,
          password: "123456",
          role: "company",
        },
      })
    )
  );

  console.log("👤 5 Owners Created");

  // Step 3: Create 5 Companies
  const companiesData = [
    { title: "TechNova Solutions", description: "AI SaaS tools" },
    { title: "PixelForge Studios", description: "Design & Animation" },
    { title: "CloudNest Technologies", description: "Cloud & Infra" },
    { title: "FinVerse Digital", description: "Fintech Products" },
    { title: "EcoBuild Engineering", description: "Green Engineering" },
  ];

  const companies = await Promise.all(
    companiesData.map((company, i) =>
      prisma.company.create({
        data: {
          title: company.title,
          description: company.description,
          ownerId: owners[i].id, // required relation
        },
      })
    )
  );

  console.log("🏢 5 Companies Created");

  // Step 4: Create 50 Openings
  const titles = [
    "Frontend Developer",
    "Backend Engineer",
    "UI/UX Designer",
    "Cloud DevOps Engineer",
    "Mobile App Developer",
    "AI Engineer",
    "Data Analyst",
    "QA Tester",
    "Product Manager",
  ];

  const locations = ["Bangalore", "Mumbai", "Hyderabad", "Pune", "Delhi", "Remote"];
  const types = ["fulltime", "parttime", "internship"];

  const openings = [];

  for (let i = 0; i < 50; i++) {
    const company = companies[i % companies.length];

    openings.push({
      title: titles[i % titles.length],
      description: `Job description ${i + 1}`,
      location: locations[i % locations.length],
      salary: 30000 + i * 500,
      employment_type: types[i % types.length],
      job_type: "on-site",
      company_id: company.id,
    });
  }

  await prisma.openings.createMany({
    data: openings,
  });

  console.log("💼 50 Job Openings Created");
  console.log("🌱 Seeding Complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());

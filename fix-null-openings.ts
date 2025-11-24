import prisma from "./src/services/prisma.js";

async function main() {
  const deleted = await prisma.openings.deleteMany({
    where: {
      OR: [
        { title: null },
        { description: null },
        { location: null },
        { employment_type: null },
        { job_type: null }
      ]
    }
  });

  console.log("Deleted rows:", deleted);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      {
        fname: "ahoora",
        lname: "amini",
        phone: "11111",
        password: "12345",
        birthday: new Date("2001-09-15"),
      },
      {
        fname: "sobhan",
        lname: "amini",
        phone: "22222",
        password: "12345",
        birthday: new Date("1993-07-23"),
      },
      {
        fname: "behnia",
        lname: "farahbod",
        phone: "33333",
        password: "12345",
        birthday: new Date("2000-07-25"),
      },
      {
        fname: "shayan",
        lname: "mobaraki",
        phone: "55555",
        password: "12345",
        birthday: new Date("1999-04-03"),
      },
    ],
  });

  const tickets = await prisma.ticket.createMany({
    data: [
      {
        from_location: "Tehran",
        to_location: "Mashhad",
        departure_date: new Date("2023-04-12"),
        arrival_date: new Date("2023-04-13"),
        unit_price: 100,
        stock: 4,
      },
      {
        from_location: "Esfahan",
        to_location: "Yazd",
        departure_date: new Date("2023-04-15"),
        arrival_date: new Date("2023-04-15"),
        unit_price: 90,
        stock: 8,
      },
      {
        from_location: "Tabriz",
        to_location: "Urumie",
        departure_date: new Date("2023-04-10"),
        arrival_date: new Date("2023-04-10"),
        unit_price: 50,
        stock: 10,
      },
    ],
  });
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
